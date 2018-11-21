var scrollable = document.getElementById("scrollable-content");
var forkdata;
var currentComponent = 0;
var numSteps = 1;
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
        load_home_page(currentComponent);
    }
  });
}

// This function is called when the create new form is submitted
// Parses the form data
// Creates a step array with each instruction
// Creates a new object with the information and pushs is it with the old JSON
// invokes an AJAX call to put the updated JSON on the server
// On sucess the user is directed back to thumbnail page

$('#new_fork_form').submit(function(e){
  e.preventDefault();
  // Set number of steps back to 1 and repair html
  var fieldValuePairs = $('#new_fork_form').serializeArray();
  var stepArr = [];
  var stepIndex = 0;
  for(var i = 1; i < fieldValuePairs.length-1; i++){
    stepArr[stepIndex] = fieldValuePairs[i].value;
    stepIndex++;
  }
  var newObj = {
              "forkname":fieldValuePairs[0].value,
              "url": fieldValuePairs[fieldValuePairs.length-1].value,
              "steps": stepArr
            }
  $('#new_fork_form').trigger("reset");
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
  document.getElementById('thumbpage').innerHTML = "<div class='row'>"
  for(var i = 0; i < compForkData.length; i++){
    var deleteBtn = "<button onclick = 'removeFork(" + i + ")' id = 'deleteForkBtn' type='button' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>"
    $('#thumbpage').append("<div id = 'fork-" + i + "'  class = 'col-xs-4'><img onclick = 'load_instructions_page(" + i + ")' class = 'img-responsive' src = " + compForkData[i].url + "></img>" +
    " <p> " + compForkData[i].forkname + " </p> " + deleteBtn + "</div>");

  }
  document.getElementById('thumbpage').innerHTML += "</div>"
}
function new_step(){
  numSteps++;
  $('#table-body').append('<tr><td><h3>Step ' + numSteps + ': </h3><textarea rows = "5" cols = "80" name = "step-' + numSteps + '   placeholder= "Type Here"> </textarea></td><td><button class = "btn btn-primary"> Upload Media </td></tr>')
}
function repair_steps(){
  numSteps = 1;
  $('#table-body').html('<tr id = "step-1"><td><h3>Step 1: </h3>' +
    '<textarea rows = "5" cols = "80" name = "step-1" placeholder= "Type Here"> </textarea></td>' +
    '<td><button class = "btn btn-primary"> Upload Media </td> </tr>'
  )
}
// This functions serves the back button

function back_to_thumb_page(){
  $(document).ready(function(){
    $('#scrollable-content').scrollTop(0);
  });
  repair_steps();
  document.getElementById('thumbpage').style.display = "block";
  document.getElementById('createform').style.display = "none";
  document.getElementById('forkInstructions').style.display = "none";
  document.getElementById('fork-back-button').style.display = "none";
}
