function basicLoop(){
  document.getElementById("eyeCise").setAttribute("width", screen.width-20);
}
function openAboutModal(){
  document.getElementById("aboutModal").style.display = 'block';
}
function openProModal(){
  document.getElementById("proModal").style.display = 'block';
}
var basicInterval = setInterval(basicLoop, 1)
var firstWait = setTimeout(function(){document.getElementById('introModal').style.display='block';}, 500);
var exerEyes = [];
function addEx(name, codename){
  document.getElementById("routineBar").innerHTML+=name;
  exerEyes.push(codename);
}
function deleteRoutine(){
  document.getElementById("routineBar").innerHTML="Current Routine: ";
  exerEyes = [];
}
