/// <reference path= "D:\Files\jQuery\typings\index.d.ts"/>

const buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false

$(document).keypress(function() {
    if (!started) {
        $("#level-title").html("Level " + level)
        nextSequence()
        started = true
    }
})

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
});

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed")

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("Success")

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong")
        playSound("wrong")

        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200)

        $("#level-title").html("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function nextSequence() {

    userClickedPattern = []

    level++;
    $("#level-title").html("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour) 
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}