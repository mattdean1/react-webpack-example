$(window).load(function(){
  var path = window.location.pathname.split('/');
  var sitename = path[path.length - 1].replace(/%20/g, " ");

  $.get("/api/site/profile/"+sitename, function(profile){
      populateTable('#principletable', "profile", profile);
      populateTable('#profiletable', "profile", profile);

      $.get("/api/site/ratings/"+sitename, function(ratings){
          populateTable('#profiletable', "ratings", ratings);

          //end editing on esc/enter - submit if enter
          $('input').on('keydown', function (e) {
                if(e.which === 13){
                  updatewrapper($(this).parent());
                  endediting(this, e);
                }
                if(e.which === 27) {
                  endediting(this, e);
                }
                e.stopPropagation();
          });

          //end editing when input loses focus
          //TODO this currently breaks saving when clicking tick
          // $('input').on('blur', function (e) {
          //         endediting(this, e);
          //         e.stopPropagation();
          // });

      });
  });

});

function populateTable(tableid, collectionname, collection){
  table = $(tableid);
  tds = table.find("td:last-of-type");
  jQuery.each(tds, function(){
    var td = $(this);
    var field = td.attr("field");
    var collectionpage = field.split(".")[0];
    if(collectionpage === collectionname){
      //remove the first field i.e. (asdf).asdf.adsf
      field = field.replace(/.*?\./, "");
      var splitfield = field.split(".");
      var value = "";
      try { value = collection[splitfield[0]][splitfield[1]]; }catch(e){}
      td.append('<p style="width:80%; display:inline-block">' + value + '</p>');
      td.append('<input type="text" class="hide" style="width:80%; margin-bottom:0" placeholder="'+value+'">');
      td.append('<i class="material-icons tiny editicon">mode_edit</i>');
      td.append('<i class="material-icons tiny doneicon hide">done</i>');

      td.on("click", function(){ startediting(td); });
      td.children(".doneicon").on("click", function(event){
        updatewrapper(td);
        endediting(this, event);
      });

    }
  });
}

function postupdate(collection, siteid, field, value){
  $.post("/api/site/update", {collection: collection, siteid: siteid, field: field, value: value}, function(result){ console.log(result); });
}

function updatewrapper(td){
  //get values from page
  td = $(td);
  //get collection
    var field = td.attr("field");
    var collection = field.split(".")[0];
  //get id
    var siteid = $('#'+collection+'id').html();

  //get field
    field = field.replace(/.*?\./, "");
  //get value
    var input = td.children("input");
    var value = input.val();

  //if the user inputted nothing
  if(value !== ""){
    //reset page
    input.val('');
    input.attr("placeholder", value);
    td.children("p").html(value);

    //send update
    postupdate(collection, siteid, field, value);
  }
}

function startediting(td){
  td = $(td);
  td.children("p").addClass("hide");
  td.children("i.doneicon").removeClass("hide");
  var input = td.children("input");
  td.parent().addClass("focused");
  input.removeClass("hide");
  input.focus();
}
function endediting(tdchild, event){
  event.stopPropagation();
  var td = $(tdchild).parent();
  td.children("p").removeClass("hide");
  td.children("i.doneicon").addClass("hide");
  var input = td.children("input");
  td.parent().removeClass("focused");
  input.addClass("hide");
  input.val("");
}
