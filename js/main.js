// This loads createform.html within the scrollable window to create
// a new project fork
var scrollable = document.getElementById("scrollable-content");
var forkdata;
$(document).ready( function() {
  (function() {
    $.getJSON( "https://api.myjson.com/bins/d40uu", {format: "json"})
      .done(function( data ) {
        forkdata = data;
      });
  })();
});

function load_create_page() {
  document.getElementById('thumbpage').style.display = "none";
  document.getElementById('createform').style.display = "block";
  document.getElementById('fork-back-button').style.display = "block";
}
function load_home_page(component) {
  var componentData = forkdata.components[component];
  var compForkData = componentData.forks;
  document.getElementById('createform').style.display = "none";
  document.getElementById('fork-back-button').style.display = "none";
  console.log(forkdata.components[component]);
  document.getElementById('thumbpage').innerHTML = "<div class='row'>"
  for(var i = 0; i < compForkData.length; i++){
    document.getElementById('thumbpage').innerHTML += "<div class = 'col-xs-4'><img class = 'img-responsive' src = " + compForkData[i].url + "></img>" +
    " <p> " + compForkData[i].forkname + " </p> </div>"
  }
  document.getElementById('thumbpage').innerHTML += "</div>"
}
function back_to_thumb_page(){
  document.getElementById('thumbpage').style.display = "block";
  document.getElementById('createform').style.display = "none";
}
