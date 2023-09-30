
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var answer = false;

$(document).keydown(function(){
    if(started == false){
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    $("h1").text("Level " + level);
    playSound(randomChosenColor);
    /* The number inside fadeOut means milliseconds for the animation */
    $("#"+randomChosenColor).fadeOut(10).fadeIn();
    gamePattern.push(randomChosenColor);
    level++;
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    answer = checkAnswer(userClickedPattern, gamePattern);
    if(!answer){
        $("body").addClass("game-over");
        let over = new Audio("./sounds/wrong.mp3");
        over.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        started = false;
        level = 0;
        gamePattern = [];
        $("h1").text("Game over. Press Any Key to Restart");
    }
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if (userClickedPattern.length == gamePattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
});


function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(click, game){
    for (let i = 0; i < click.length; i++) {
        if(click[i] != game[i]){
            return false;
        }
    };
    return true;
}