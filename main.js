var height;
var width;
var timerInterval;
var canvas;
var ctx;
var startIntervalTimer;
var currExercise = "";
var exerciseFrame = 0;
var exerciseNum = 0;
var exercisesDone = 0;
var startDate = new Date();
var currentDate = new Date();
var MINUTE = 60000;

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function Achievement(message) {
  this.message = message;
  this.on = true;
  this.display = function() {
    if (this.on) {
      alert(message);
    }
  }
}
firstExercise = new Achievement("You've completed your first exercise! 😄 #1 😄");
exercises5 = new Achievement("5 exercises! WOW! What persistence! Keep going! 😮😉😮")
exercises10 = new Achievement("10 exercises! You're blowing me away! 🎉👍🎉")
exercises25 = new Achievement("25 exercises! Oh... so many in ONE DAY! WOWOWOWOWOWOW! YOU ARE AMAZING! 😃😂😃")
exercises50 = new Achievement("50 exercises... You've blown me away. I CAN'T BELIEVE IT! 🎉😮😃😂😃😮🎉")
exercises100 = new Achievement("100 exercises... I've fainted from shock! (No emojis can express how impressed I am)")
firstMinute = new Achievement("One minute of exercises - Great Job! 🕕 😊");
minutes5 = new Achievement("5 minutes... What Persistence! 🕕 🎉👍🎉");
minutes10 = new Achievement("10 minutes... So much practice! AMAZING WORK! 🕕🎉😮😃😂😃😮🎉");
firstHour = new Achievement("An hour of eye practice... *faints* 🕕🕕🕕 😮")



function checkAchievements() {
  var currentDate = new Date();
  var timeDone = currentDate - startDate;
  if (exercisesDone === 1) {
    firstExercise.display();
    firstExercise.on = false;
  } else if (exercisesDone === 5) {
    exercises5.display();
    exercises5.on = false;
  } else if (exercisesDone === 10) {
    exercises10.display();
    exercises10.on = false;
  } else if (exercisesDone === 25) {
    exercises25.display();
    exercises25.on = false;
  } else if (exercisesDone === 50) {
    exercises50.display();
    exercises50.on = false;
  } else if (exercisesDone === 100) {
    exercises100.display();
    exercises100.on = false;
  } else if (timeDone>MINUTE-1 && firstMinute.on){
    firstMinute.display();
    firstMinute.on = false;
  } else if (timeDone>(MINUTE*5)-1 && minutes5.on){
    minutes5.display();
    minutes5.on = false;
  } else if (timeDone>(MINUTE*10)-1 && minutes10.on){
    minutes10.display();
    minutes10.on = false;
  } else if (timeDone>(MINUTE*60)-1 && firstHour.on){
    firstHour.display();
    firstHour.on = false;
  }
}
var achievementChecker = setInterval(checkAchievements, 10)


function basicLoop() {
  document.getElementById("eyeCise").setAttribute("width", window.innerWidth - 20);
  height = document.getElementById("eyeCise").height;
  width = document.getElementById("eyeCise").width;
}

function openAboutModal() {
  document.getElementById("aboutModal").style.display = 'block';
}

function openProModal() {
  document.getElementById("proModal").style.display = 'block';
}
var basicInterval = setInterval(basicLoop, 1)
var firstWait = setTimeout(function() {
  document.getElementById('introModal').style.display = 'block';
}, 500);
var exerEyes = [];

function addEx(name, codename) {
  document.getElementById("routineBar").innerHTML += name;
  exerEyes.push(codename);
}

function deleteRoutine() {
  document.getElementById("routineBar").innerHTML = "Current Routine: ";
  exerEyes = [];
}

function decodeExereye(str) {
  switch (str) {
    case "sacLR":
      return "Saccades Left-Right";
    case "sacUD":
      return "Saccades Up-Down";
    case "sacD":
      return "Saccades Diagonals";
    case "traLR":
      return "Tracking Left-Right";
    case "traUD":
      return "Tracking Up-Down";
    case "traD":
      return "Tracking Diagonals";
    case "conV":
      return "Convergence";
    default:
      return "None";

  }
}

function start() {
  document.getElementById("goButton").blur();
  currExercise = "";
  exerciseFrame = 0;
  exerciseNum = 0;
  if (startIntervalTimer) {
    clearInterval(startIntervalTimer);
  }
  if (exerEyes.length === 0) {
    alert("You can't do a routine with zero exercies. That would be to easy 😏.")
    return;
  }
  clearInterval(basicInterval)
  basicLoop();
  canvas = document.getElementById("eyeCise");
  ctx = canvas.getContext("2d");
  var frame = 0;

  function renderText(num) {
    ctx.textAlign = "center";
    ctx.font = "40px Courier";
    ctx.fillStyle = "Black";
    ctx.fillText("3" - num, width / 2, height / 2)
  }
  startIntervalTimer = setInterval(function() {
    basicLoop();
    ctx.clearRect(0, 0, width, height)
    if (frame < 100) {
      ctx.textAlign = "center";
      ctx.font = "20px Courier";
      ctx.fillStyle = "Black";
      ctx.fillText("Exercises Starting In...", width / 2, height / 2);
    } else if (frame >= 100 && frame < 200) {
      renderText(0);
    } else if (frame >= 200 && frame < 300) {
      renderText(1);
    } else if (frame >= 300 && frame < 400) {
      renderText(2);
    } else if (frame >= 400 && frame < 600) {
      ctx.textAlign = "center";
      ctx.font = "20px Courier";
      ctx.fillStyle = "Black";
      ctx.fillText("First Exereye Up: " + decodeExereye(exerEyes[0]), width / 2, height / 2)
    } else {
      if (exerciseFrame === 0) {
        if (exerciseNum === exerEyes.length) {
          ctx.textAlign = "center";
          ctx.font = "20px Courier";
          ctx.fillStyle = "Black";
          ctx.fillText("😏 EXERCISES COMPLETE! 🎉", width / 2, height / 2)
        } else {
          currExercise = decodeExereye(exerEyes[exerciseNum])
          exerciseFrame++;
        }
      } else if (exerciseFrame > 0 && exerciseFrame < 3000) {
        if (currExercise === "Tracking Left-Right") {
          ctx.clearRect(0, 0, width, height);
          ctx.font = "20px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Don't move your head!", width / 2, 30)
          var widthToGo = 0;
          if (exerciseFrame % 1000 < 500) {
            widthToGo = exerciseFrame % 500;
          } else {
            widthToGo = 500 - exerciseFrame % 500;
          }
          ctx.textAlign = "center";
          ctx.font = "40px Courier";
          ctx.fillText("😎", width * (0.002 * widthToGo), height / 2);
          exerciseFrame++;
        } else if (currExercise === "Tracking Up-Down") {
          ctx.clearRect(0, 0, width, height);
          ctx.font = "20px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Don't move your head!", width / 2, 30)
          var heightToGo = 0;
          if (exerciseFrame % 1000 < 500) {
            heightToGo = exerciseFrame % 500;
          } else {
            heightToGo = 500 - exerciseFrame % 500;
          }
          ctx.textAlign = "center";
          ctx.font = "40px Courier";
          ctx.fillText("😎", width / 2, height * (0.002 * heightToGo));
          exerciseFrame++;
        } else if (currExercise === "Tracking Diagonals") {
          ctx.clearRect(0, 0, width, height);
          ctx.font = "20px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Don't move your head!", width / 2, 30)
          var widthToGo = 0;
          var heightToGo = 0;
          if (exerciseFrame % 1000 < 500) {
            widthToGo = exerciseFrame % 500;
            heightToGo = exerciseFrame % 500;
          } else {
            widthToGo = 500 - exerciseFrame % 500;
            heightToGo = 500 - exerciseFrame % 500;
          }
          ctx.textAlign = "center";
          ctx.font = "40px Courier";
          ctx.fillText("😎", width * (0.002 * widthToGo), height * (0.002 * heightToGo));
          exerciseFrame++;
        } else if (currExercise === "Convergence") {
          ctx.clearRect(0, 0, width, height);
          ctx.font = "10px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Don't let the emoji split in two!", width / 2, 30)
          var emojiSize = 10;
          if (exerciseFrame % 1000 < 500) {
            emojiSize = ((exerciseFrame % 500) / 2);
          } else {
            emojiSize = 250 - ((exerciseFrame % 500) / 2);
          }
          emojiSize = Math.floor(emojiSize);
          console.log(emojiSize);
          ctx.textAlign = "center";
          ctx.font = emojiSize + "px Courier";
          ctx.fillText("😎", width / 2, height / 2 + emojiSize / 2);
          exerciseFrame++;
        } else if (currExercise === "Saccades Left-Right") {
          ctx.clearRect(0, 0, width, height)
          ctx.font = "10px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Jump your eyes between the switching dots!", width / 2, 30)
          if (exerciseFrame % 200 < 100) {
            ctx.fillStyle = "Black"
            drawCircle(width * (1 / 3), height / 2, 10)
            ctx.textAlign = "center";
            ctx.font = "40px Courier";
            ctx.fillText("😎", width * (2 / 3), height / 2 + 15);
          } else {
            ctx.textAlign = "center";
            ctx.font = "40px Courier";
            ctx.fillText("😎", width * (1 / 3), height / 2 + 15);
            ctx.fillStyle = "Black";
            drawCircle(width * (2 / 3), height / 2, 10)
          }
          exerciseFrame++;
        } else if (currExercise === "Saccades Up-Down") {
          ctx.clearRect(0, 0, width, height)
          ctx.font = "10px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Jump your eyes between the switching dots!", width / 2, 30)
          if (exerciseFrame % 200 < 100) {
            ctx.fillStyle = "Black"
            drawCircle(width / 2, height * (1 / 3), 10)
            ctx.textAlign = "center";
            ctx.font = "40px Courier";
            ctx.fillText("😎", width / 2, height * (2 / 3));
          } else {
            ctx.textAlign = "center";
            ctx.font = "40px Courier";
            ctx.fillText("😎", width / 2, height * (1 / 3));
            ctx.fillStyle = "Black";
            drawCircle(width / 2, height * (2 / 3), 10)
          }
          exerciseFrame++;
        } else if (currExercise === "Saccades Diagonals") {
          ctx.clearRect(0, 0, width, height)
          ctx.font = "10px Courier";
          ctx.textAlign = "center";
          ctx.fillText("Focus on that Emoji! Jump your eyes between the switching dots!", width / 2, 30)
          if (exerciseFrame % 200 < 100) {
            ctx.fillStyle = "Black"
            drawCircle(width * (2 / 3), height * (1 / 3), 10)
            ctx.textAlign = "center";
            ctx.font = "40px Courier";
            ctx.fillText("😎", width * (1 / 3), height * (2 / 3));
          } else {
            ctx.textAlign = "center";
            ctx.font = "40px Courier";
            ctx.fillText("😎", width * (2 / 3), height * (1 / 3));
            ctx.fillStyle = "Black";
            drawCircle(width * (1 / 3), height * (2 / 3), 10)
          }
          exerciseFrame++;
        }

      } else if (exerciseFrame === 3000) {
        exerciseNum++;
        exerciseFrame++;
      } else if (exerciseFrame > 3000 && exerciseFrame < 3201) {
        if (exerciseNum !== exerEyes.length) {
          ctx.textAlign = "center";
          ctx.font = "20px Courier";
          ctx.fillStyle = "Black";
          ctx.fillText("Next Exereye: " + decodeExereye(exerEyes[exerciseNum]), width / 2, height / 2)
          exerciseFrame++;
        } else {
          exercisesDone++;
          exerciseFrame = 0;
        }
      } else {
        exercisesDone++;
        exerciseFrame = 0;
      }
    }

    frame += 1;
  }, 10)
}

function addStarterExercises() {
  deleteRoutine();
  addEx('-Tracking Left-Right- ', 'traLR');
  addEx('-Tracking Left-Right- ', 'traLR');
  addEx('-Tracking Up-Down- ', 'traUD');
  addEx('-Tracking Up-Down- ', 'traUD');
  addEx('-Saccades Left-Right- ', 'sacLR');
}

function addMediumExercises() {
  deleteRoutine();
  addEx('-Tracking Left-Right- ', 'traLR');
  addEx('-Tracking Diagonals- ', 'traD');
  addEx('-Tracking Up-Down- ', 'traUD');
  addEx('-Saccades Left-Right- ', 'sacLR');
  addEx('-Saccades Up-Down- ', 'sacUD');
}

function addAdvancedExercises() {
  deleteRoutine();
  addEx('-Tracking Diagonals- ', 'traD');
  addEx('-Saccades Left-Right- ', 'sacLR')
  addEx('-Saccades Up-Down- ', 'sacUD');
  addEx('-Saccades Diagonals- ', 'sacD');
  addEx('-Convergence- ', 'conV');
}
