var myChart;
$(window).load(function(){
  var path = window.location.pathname.split('/');

  //if we are comparing historical sites
  if(path[2] === "compare"){
    var sitename = path[path.length - 1].replace(/%20/g, " ");
    populateDropdown("canvas1", sitename, 0);
    populateDropdown("canvas2", sitename);
  }
  //if this is the generic site details page
  else {
    var site = path[path.length - 1].replace(/%20/g, " ");
    populateDropdown(decodeURIComponent(site), site);
    formatRecommendations();
  }


  //truncate numbers to 2 dp
  var tds = $('#principletable td:last-of-type');
  tds.map(function(){
    try{
      $(this).html(+parseFloat($(this).html()).toFixed(2));
    }catch(e){ console.log(e); }
  });

  //truncate total facility weight in profile table
  var weighttd = $($('#profiletable td:last-of-type')[3]);
  weighttd.html(+parseFloat(weighttd.html()).toFixed(2));
});

//format recommendations
function formatRecommendations(){
  $('.recommendationpriority').each(function(){
    var elem = $(this);
    var priority = elem.html();
    switch(priority){
      case "High":
        elem.parent().addClass("priorityhigh");
        elem.html("");
        break;
      case "Medium":
        elem.parent().addClass("prioritymedium");
        elem.html("");
        break;
      case "Low":
        elem.parent().addClass("prioritylow");
        elem.html("");
        break;
      default:
        elem.html("");
    }
  });

  $('.recommendationcategory').each(function(){
    var elem = $(this);
    var category = elem.html();
    switch(category){
      case "Electrical":
        elem.html("<img class='recommendationimage' src='/img/categories/electrical.png'></img>");
        break;
      case "Cooling System":
        elem.html("<img class='recommendationimage' src='/img/categories/cooling.png'></img>");
        break;
      case "Facility":
        elem.html("<img class='recommendationimage' src='/img/categories/location.png'></img>");
        break;
      case "Fire Suppression and Monitoring":
        elem.html("<img class='recommendationimage' src='/img/categories/fire.png'></img>");
        break;
      case "Security and Monitoring":
        elem.html("<img class='recommendationimage' src='/img/categories/security.png'></img>");
        break;
      case "Communication":
        elem.html("<img class='recommendationimage' src='/img/categories/communication.png'></img>");
        break;
    }
  });
}

function populateDropdown(canvasname, sitename, index){
  var canvas = document.getElementById(canvasname);

  $.get('/api/site/ratings/'+sitename, function(sites){

    //if index is not specified, get the latest site ratings
    if(index === null || index === undefined){
      index = sites.length - 1;
    }
    var site = sites[index];

    if(site === null){
      document.getElementById(canvasname).parentNode.innerHTML = "<p>No uptime rating data available</p>";
    } else {
      //create dropdown
      var select = $(document.getElementById(canvasname).parentNode.querySelector("div select"));
      select.html("");
      for(var i=0; i<sites.length; i++){
        if(i == index){
          select.append("<option value='"+i+"' selected>"+sites[i].date+"</option>");
        }else{
          select.append("<option value='"+i+"'>"+sites[i].date+"</option>");
        }
      }
      $('select').material_select();


      select.change(function(){
        drawChart(canvas, sites[select.val()]);
        populateMinRating(sites[select.val()]);
      });

    drawChart(canvas, sites[index]);
    populateMinRating(sites[index]);
    }
  });
}

function populateMinRating(site){
  $("#minrating").html(site.tierrating.minimum);
}

//get rating data and draw chart
function drawChart(canvas, site){
  //different min (red line on chart) depending if datacenter or computer room
  var min = 2;
  if (site.category === "datacenter"){ min = 3; }

    myChart = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ["Location & Structure", "Communications", "Cooling Systems", "Electrical", "Fire Safety", "Security"],
        datasets: [
          {
              label: site.name,
              backgroundColor: "rgba(76,175,80, 0.6)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [site.tierrating.location, site.tierrating.comms, site.tierrating.cooling, site.tierrating.electrical, site.tierrating.fire, site.tierrating.security]
          },
          {
              label: "Minimum",
              backgroundColor: "rgba(255,99,132,0)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 6,
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [min, min, min, min, min, min]
          }
        ]
      },
        options: {
          scale: {
              ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                  max: 4
              }
          }
        }
    });
}
