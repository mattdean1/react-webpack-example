var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.load();

var mongo = require('mongodb');
var ObjectId = mongo.ObjectID;
var monk = require('monk');

//set up mongo connection
var user = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD;
var host = process.env.MONGODB_SERVICE_HOST;
var port = process.env.MONGODB_SERVICE_PORT;
var database = process.env.MONGODB_DATABASE;
var connectionstring = user + ":" + password + "@" + host + ":" + port + "/" + database;
db = monk(connectionstring);

router.get('/sites/profile/all', function(req,res){
    db.get('profile').find({}, function(err, docs){
      if(err){
        res.send(err);
      }
      res.send(docs);
    });
});

router.get('/sites/profile', function(req, res, next) {
    console.log(req.query);
    var typequery = [];
    if(req.query.dc)
      typequery.push({"category": "datacenter"});
    if(req.query.pharma)
      typequery.push({"category": "pharma"});
    if(req.query.elanco)
      typequery.push({"category": "elanco"});
    if(req.query.other)
      typequery.push({"category": "other"});

    var zonequery = [];
    if(req.query.z1)
      zonequery.push({$or: [{"profile.zone": "1"}, {"profile.zone": 1}] });
    if(req.query.z2)
      zonequery.push({$or: [{"profile.zone": "2"}, {"profile.zone": 2}] });
    if(req.query.z3)
      zonequery.push({$or: [{"profile.zone": "3"}, {"profile.zone": 3}] });


    db.get('profile').find({ $and: [{$or: typequery}, {$or: zonequery}] }, {sort: {"profile.name": 1}}, function(err, docs) {
      if(err){
        res.send(err);
      }
      res.send(docs);
    });
});

router.get('/site/profile/:sitename', function(req, res) {
  db.get('profile').findOne({"profile.name": req.params.sitename}, {}, function(err, docs) {
    if(err){
      res.send(err);
    }
    res.json(docs);
  });
});


router.get('/site/ratings/:sitename', function(req, res) {
  db.get('ratings').find({"name": req.params.sitename}, {}, function(err, docs) {
    if(err){
      res.send(err);
    }
    res.json(docs);
  });
});

router.get('/site/recommendations/:sitename', function(req, res) {
  db.get('recommendations').find({"facilityname": req.params.sitename}, {}, function(err, docs) {
    if(err){
      res.send(err);
    }
    //sort docs by priority
    function convertToInt(string){
      if(string==="Low"){ return 0; }
      if(string==="Medium"){ return 1; }
      if(string==="High"){ return 2; }
      return -1;
    }
    var sorted = docs.sort(function(a,b){
      return convertToInt(b.priority) - convertToInt(a.priority);
    });

    res.json(sorted);
  });
});


//post collection, site _id, field, value
router.post('/site/update', function(req, res) {
  var obj = {};
  obj[req.body.field] = req.body.value;
  var collection = req.body.collection;
  console.log(collection);
  var siteid = req.body.siteid;
  var mongoid = new ObjectId(siteid);

  db.get(collection).update({_id: mongoid}, {$set: obj },
                      function(e){
                        if(e){
                          res.send(e);
                        }
                        if (collection === "profile") {
                          recalculatePrinciple(siteid);
                        }
                        if(collection === "ratings") {
                          recalculateRatings(siteid);
                        }
                        res.send("update success");
                      }
  );
});

function recalculatePrinciple(siteid) {
  db.get("profile").findOne({_id: siteid}, {}, function(err, result){
    var old = result.principle;
    var newtotal = old.outagehistory*0.1 + old.physicalsecurity*0.08 + old.geographicalrisk*0.03;
    newtotal += old["alignment-dra"]*0.05 + old.capacity*0.15 + old["alignment-business"]*0.15 + old["support-expectations"]*0.04;
    newtotal += old.flexibility*0.05 + old["alignment-latency"]*0.1 + old.environmental*0.15 + old["support-services"]*0.05 + old.financials*0.05;

    db.get("profile").update({_id: siteid}, {$set: {"principle.total": newtotal}}, function(e){
      if(e){
        console.log(e);
      }
    });
  });
}

function recalculateRatings(siteid) {
  db.get("ratings").findOne({_id: siteid}, {}, function(err, result){
    var old = result.tierrating;
    var newmin = Math.min(old.location, old.comms, old.cooling, old.electrical, old.fire, old.security);

    db.get("ratings").update({_id: siteid}, {$set: {"tierrating.minimum": newmin}}, function(e){
      if(e){
        console.log(e);
      }
    });
  });
}

module.exports = router;
