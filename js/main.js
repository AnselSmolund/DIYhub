// This loads createform.html within the scrollable window to create
// a new project fork
var scrollable = document.getElementById("scrollable-content");
var forkdata;
var currentComponent = 0;
// Get json data from server
$(document).ready( function() {
  (function() {
    $.getJSON( "https://api.myjson.com/bins/118xpy", {format: "json"})
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
    "<div class = 'col-m-8'> <h3> Step " + i + " </h3> " + steps[i] + " </p> </div></div><div class = 'row'>"
  }

}

// function create_new_fork(){
//   var queryString = $('#new_fork_form').serialize();
//   alert(queryString);
//   return false;
//
// }

$('#new_fork_form').submit(function(e){
  e.preventDefault();
  console.log(forkdata);

  var fieldValuePairs = $('#new_fork_form').serializeArray();
  var newObj = {
              "forkname":fieldValuePairs[0].value,
              "url":"https://makinglemonadeblog.com/wp-content/uploads/2014/05/DIY-pipe-curtain-rod-west-elm-knockoff-685x1024.jpg",
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
    url: "https://api.myjson.com/bins/118xpy",
    type: "PUT",
    data: updatedData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
        console.log("hi");
    }
  });
  load_home_page(currentComponent);
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
    document.getElementById('thumbpage').innerHTML += "<div onclick = 'load_instructions_page(" + i + ")' id = 'fork-" + i + "'  class = 'col-xs-4'><img class = 'img-responsive' src = " + compForkData[i].url + "></img>" +
    " <p> " + compForkData[i].forkname + " </p> </div>"
  }
  document.getElementById('thumbpage').innerHTML += "</div>"
}

// This functions serves the back button

function back_to_thumb_page(){
  document.getElementById('thumbpage').style.display = "block";
  document.getElementById('createform').style.display = "none";
  document.getElementById('forkInstructions').style.display = "none";
}
