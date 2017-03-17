var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function(req, res){
  return res.render('index');
});

function getOrigin(req){
  return "http://" + req.get('host');
}

router.get('/library', function(req, res) {
  res.render('library', {  js: '' });
});

router.get('/site/:sitename', function(req, res) {
  var sitename = encodeURIComponent(req.params.sitename);
  var origin = getOrigin(req);
    console.log(origin);
  request(origin+'/api/site/profile/'+sitename, function (error, response, profile) {
    request(origin+'/api/site/ratings/'+sitename, function (error, response, ratings) {
      request(origin+'/api/site/recommendations/'+sitename, function (error, response, recommendations) {
          res.render('site', {
                  profile: JSON.parse(profile),
                  ratings: JSON.parse(ratings),
                  recommendations: JSON.parse(recommendations),
                  js: '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js"></script><script src="/js/site.js"></script>'
          });
      });
    });
  });
});

router.get('/site/edit/:sitename', function(req, res) {
  var sitename = encodeURIComponent(req.params.sitename);
  var origin = getOrigin(req);
  request(origin+'/api/site/profile/'+sitename, function (error, response, profile) {
    request(origin+'/api/site/ratings/'+sitename, function (error, response, ratings) {
          res.render('editsite', {
                  profile: JSON.parse(profile),
                  ratings: JSON.parse(ratings),
                  js: '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js"></script><script src="/js/site.js"></script><script src="/js/editsite.js"></script>'
          });
    });
  });
});

router.get('/site/compare/:sitename', function(req, res) {
  var sitename = encodeURIComponent(req.params.sitename);
  var origin = getOrigin(req);
    request(origin+'/api/site/profile/'+sitename, function (error, response, profile) {
          res.render('comparesite', {
                  profile: JSON.parse(profile),
                  js: '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js"></script><script src="/js/site.js"></script>'
          });
    });
});

module.exports = router;
