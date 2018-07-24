const deck = document.querySelector(".deck");
const cards = document.getElementsByClassName("card");
const cards1 = document.querySelectorAll(".card");
const matchedCards = document.getElementsByClassName("match");
const startBtn = document.getElementById("gameStart");
let timer;
let timeInSeconds = 0;
let Dlevel = 0;

 const movesWrap = document.getElementById("movesWrap");
let moveCount = 0;
let stars = document.querySelectorAll(".stars li");
// Converting To Array

let cleanCards = Array.from(cards);

var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

// Display Card Function
function displayCard(){
    
    this.classList.add("flip", "animated", "open");
    this.classList.add("show");
    this.classList.add("disabled");

}

// Shuffle Function Given by Udacity

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Using Shuffle Function

const shuffledCards = shuffle(cleanCards);

console.log(deck);


// Appending The Random card to the board or deck

for(let i = 0; i < shuffledCards.length; i++){
    
    deck.appendChild(shuffledCards[i]);

}

//deck.appendChild(tempCardsHolder);


// Adding Event Listeners

cleanCards.forEach(card => {
    card.classList.remove("open", "show", "match");
    card.addEventListener("click", displayCard);
     card.addEventListener("click", MatchCards);
     card.addEventListener("click", Congrats);
});


// Matching Cards

let OpenedCards = [];

function MatchCards(){
    
    OpenedCards.push(this);
/*    this.classList.add("show", "animated");*/
    
    if(OpenedCards.length > 1){
        movesCounter();
        if(OpenedCards[0].dataset.name === OpenedCards[1].dataset.name){
            console.log("Matched");
            matched();
        }else{    
          unmatched();
            console.log("Un-Matched");
            
        }
        
        
    }
    
}


// Run this Function when cards Matched

function matched(){
 
    for(let i = 0; i < OpenedCards.length; i++){
        OpenedCards[i].classList.remove("show", "open", "flip");
        OpenedCards[i].classList.add("match", "disabled", "animated", "bounce");
    }
    
    OpenedCards.length = 0;
}

function unmatched(){
    
     cleanCards.forEach(card => {
     card.classList.add('disabled');
         
        OpenedCards.forEach(card => {
            setTimeout(function(){
    card.classList.remove("flip");
     card.classList.add("show", "open","unmatched","shake");
            },800);
        });
         
             setTimeout(function(){
               card.classList.remove("show", "open", "unmatched", "disabled", "flip", "shake");
                     for(var i = 0; i < matchedCards.length; i++){
                matchedCards[i].classList.add("disabled");
        }
    }, 1600);
         
        });
    
    
       OpenedCards.length = 0;
    
}

let moves = "moves";

function movesCounter(){
    
    moveCount++;
    
    console.log(moveCount);
    
    movesWrap.innerHTML = "";
    
    moves = moveCount < 2 ? " move": " moves";
    
    console.log(moveCount);
    
    movesWrap.innerHTML = moveCount + moves;
}



function restart(){
        moveCount = 0;
        movesWrap.innerHTML = moveCount + moves;
}

$("#gameStart").on("click", openNav);
$("#easy").on("click", function(){ closeNav() ;startTimer(300); timeInSeconds = 300; Dlevel = 0});
$("#medium").on("click", function(){closeNav(); startTimer(180); timeInSeconds = 180; Dlevel = 1});
$("#hard").on("click", function(){ closeNav(); startTimer(120); timeInSeconds = 120; Dlevel = 2});


//function startGame(){
//    
//    startTimer(300);
//    
//}


$("#restart").on("click", restart);

var showClock = document.querySelector(".timer");

function startTimer(seconds){
   clearInterval(timer);
    let now = Date.now();
    let choice = seconds * 1000;
    let totalTime = now + choice;
    showTimer(seconds);
    //console.log(totalTime);
    
   timer = setInterval(function(){
        
          var remainTime = Math.round((totalTime - Date.now()) / 1000);   
        
        if(remainTime < 0){
            console.log("Time Up");
            clearInterval(timer);
        }else{
            showTimer(remainTime);
        }
        
    }, 1000);
  
    
}
let mins = ""; 
let secs = "";

function showTimer(seconds){
   mins = Math.floor(seconds/60);
 secs = seconds % 60;  
    showClock.innerHTML = `${mins}:${secs < 10? "0" +secs: secs}`;
    //console.log(mins +":" + secs);
}

function openNav() {
    document.getElementById("gameLevels").style.width = "100%";
}

function closeNav() {
    document.getElementById("gameLevels").style.width = "0%";
}
let totalTime;



$(".close").on("click", function() {
    $("#Result").slideDown(1000);
}) 

$("#Result").on("click", function(){
    
        $(this).hide(1000);
})


// Ratings

if(moveCount >= 8 && moveCount <= 10){
    for(let i = 0; i < moveCount; i++){
        console.log(stars);
    }
}

function Congrats(){
    
    
    if(matchedCards.length === 16){
        console.log("Congratulations");
        clearInterval(timer);
        console.log(startTimer)
        totalTime = timeInSeconds - (mins * 60 + secs);
        $("#tookTime").html("<strong>" + totalTime + " Seconds</strong>" );
        $("#showMoves").html("<strong>" + moveCount + moves + "</strong>");
        console.log("You Took " + totalTime + " Seconds");
             Dlevel = (Dlevel === 0 )? "<strong>Easy</strong> <br\> You have not won any medal Or badge Try Medium Level Now" : (Dlevel === 1) ? "<strong>Medium</strong> \n You have Won a Medal This means You have a very sharp memory. Keep it up and Try The Hard one." : "<strong>Hard</strong> \n You are a Genious and have Very Good Brain. Now you have passed our hardest level you will get badge and the medal. Keep Breaking Your own Records";
                console.log(Dlevel);
        $("#showDiffLevel").html(Dlevel);
        
         $("#Result").fadeIn();
 
        
        
       }
    
}