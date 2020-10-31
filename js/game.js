// variables
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

// pattern for the computer
function nextSequence() {

  userClickedPattern = []

  var randomNumber = Math.random() * 4;

  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

// replaying pattern if there is more then one value
  if (gamePattern.length > 0) {
    gamePattern.forEach((color, i) => {
      setTimeout(function(){

        $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);

        animatePress(color);

        playSound(color);
      }, i * 500);
    });
  } else {
      $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

      animatePress(randomChosenColor)

      playSound(randomChosenColor);
  }

// Showing the user his level
  $("h1").text("Level " + level);

// increasing the level for next time
  level++;

};

// checking if the user clicked a button
$(".btn").click(function(event) {
  if (!started) {
    nextSequence()
    started = true;
  } else {
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
});

// playing sound
function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
};

// playing animation
function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  },100);
};


// starting the game
$(document).keydown(function (){
  if(!started){
    // $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// checking the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document).keydown(startOver());
  }
};

// restarting the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
