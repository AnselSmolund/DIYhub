// This loads createform.html within the scrollable window to create
// a new project fork
var scrollable = document.getElementById("scrollable-content");
var forkdata;
var currentComponent = 0;
// Get json data from server
$(document).ready( function() {
  (function() {
    $.getJSON( "https://api.myjson.com/bins/fj1km", {format: "json"})
      .done(function( data ) {
        forkdata = data;
      });
  })();
});

function load_instructions_page(forkComponent){
  document.getElementById('thumbpage').style.display = "none";
  document.getElementById('createform').style.display = "none";
  document.getElementById('forkInstructions').style.display = "block";
  document.getElementById('fork-back-button').style.display = "block";
  var steps = forkdata.components[currentComponent].forks[forkComponent].steps;
  document.getElementById('forkInstructions').innerHTML = "<div class='row'>"
  for(var i = 0; i < steps.length; i++){
    document.getElementById('forkInstructions').innerHTML +=
    "<div class = 'col-m-8'> <h3> Step " + (i + 1) + " </h3> " + steps[i] + " </p> </div></div><div class = 'row'>"
  }

}

function removeFork(forkComponent){
  forkdata.components[currentComponent].forks.splice(forkComponent,1);
  var updatedData = JSON.stringify(forkdata);
  $.ajax({
    url: "https://api.myjson.com/bins/fj1km",
    type: "PUT",
    data: updatedData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
        console.log("hi");
    }
  });
  load_home_page(currentComponent);
}

$('#new_fork_form').submit(function(e){
  e.preventDefault();
  console.log(forkdata);

  var fieldValuePairs = $('#new_fork_form').serializeArray();
  console.log(fieldValuePairs);
  var newObj = {
              "forkname":fieldValuePairs[0].value,
              "url": fieldValuePairs[4].value,
              "steps":[
                fieldValuePairs[1].value,
                fieldValuePairs[2].value,
                fieldValuePairs[3].value
              ]
            }
  $('#new_fork_form').trigger("reset");
  console.log(newObj);
  forkdata.components[currentComponent].forks.push(newObj);

  var updatedData = JSON.stringify(forkdata);
  $.ajax({
    url: "https://api.myjson.com/bins/fj1km",
    type: "PUT",
    data: updatedData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
        load_home_page(currentComponent);
    }
  });
});
// Load the create new fork page

function load_create_page() {
  document.getElementById('thumbpage').style.display = "none";
  document.getElementById('createform').style.display = "block";
  document.getElementById('fork-back-button').style.display = "block";
  document.getElementById('forkInstructions').style.display = "none";
}

// Load home page with the right component data

function load_home_page(component) {
  $(document).ready(function(){
    $('#scrollable-content').scrollTop(0);
  });
  var componentData = forkdata.components[component];
  var compForkData = componentData.forks;
  currentComponent = component;
  document.getElementById('createform').style.display = "none";
  document.getElementById('fork-back-button').style.display = "none";
  document.getElementById('forkInstructions').style.display = "none";
  document.getElementById('thumbpage').style.display = "block";
  console.log(forkdata.components[component]);
  document.getElementById('thumbpage').innerHTML = "<div class='row'>"
  for(var i = 0; i < compForkData.length; i++){
    console.log(compForkData[i].url);
    var deleteBtn = "<button onclick = 'removeFork(" + i + ")' id = 'deleteForkBtn' type='button' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"
    $('#thumbpage').append("<div id = 'fork-" + i + "'  class = 'col-xs-4'><img onclick = 'load_instructions_page(" + i + ")' class = 'img-responsive' src = " + compForkData[i].url + "></img>" +
    " <p> " + compForkData[i].forkname + " </p> " + deleteBtn + "</div>");

  }
  document.getElementById('thumbpage').innerHTML += "</div>"
}

// This functions serves the back button

function back_to_thumb_page(){
  $(document).ready(function(){
    $('#scrollable-content').scrollTop(0);
  });
  document.getElementById('thumbpage').style.display = "block";
  document.getElementById('createform').style.display = "none";
  document.getElementById('forkInstructions').style.display = "none";
  document.getElementById('fork-back-button').style.display = "none";
}
