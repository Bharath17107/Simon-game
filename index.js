var buttoncolours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function()
{
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function()
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentlevel)
{
        if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
        {
            console.log("success");
            if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function()
                {
                   nextSequence();
                },1000);
            }
        }
        else
        {
           
            console.log("wrong");
            playsound("wrong");
            $("body").addClass("game-over");           
            setTimeout(function()
            {
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game over Press any key to Restart");
           startover();
            
        }
}

function nextSequence()
{   
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolours[randomnumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour); 
}




function playsound(name)
{
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolour)
{
    $("#" + currentcolour).addClass("pressed");

    setTimeout(function()
    { $("#" + currentcolour).removeClass("pressed");},100);
}

function startover()
{
   level = 0;
   gamePattern = [];
   started = false;
}