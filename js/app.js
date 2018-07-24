// Declaring Important Variables

const deck = document.querySelector(".deck");
const cards = document.getElementsByClassName("card");
const cards1 = document.querySelectorAll(".card");
const matchedCards = document.getElementsByClassName("match");
const startBtn = document.getElementById("gameStart");
let timer;
let timeInSeconds = 0;
let dLevel = 0;
const countDownClock = document.getElementById("CountDownWrap");
const movesWrap = document.getElementById("movesWrap");
let moveCount = 0;
let stars = document.querySelectorAll(".stars li");
let userName = "";
let mins = "";
let secs = "";



// Converting To Array CountDownClock

let cleanCards = Array.from(cards);

// Display Card Function
function displayCard() {

    this.classList.add("flip", "animated", "open");
    this.classList.add("show");
    this.classList.add("disabled");

}

// Shuffle Function Given by Udacity

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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

for (let i = 0; i < shuffledCards.length; i++) {

    deck.appendChild(shuffledCards[i]);

}


// Adding Event Listeners

cleanCards.forEach(card => {
    card.classList.remove("open", "show", "match");
    card.addEventListener("click", displayCard);
    card.addEventListener("click", MatchCards);
    card.addEventListener("click", Congrats);
});


// Matching Cards

let OpenedCards = [];

function MatchCards() {

    OpenedCards.push(this);
    /*    this.classList.add("show", "animated");*/

    if (OpenedCards.length > 1) {
        movesCounter();
        if (OpenedCards[0].dataset.name === OpenedCards[1].dataset.name) {
            console.log("Matched");
            matched();
        } else {
            unmatched();
            console.log("Un-Matched");

        }


    }

}


// Run this Function when cards Matched

function matched() {

    for (let i = 0; i < OpenedCards.length; i++) {
        OpenedCards[i].classList.remove("show", "open", "flip");
        OpenedCards[i].classList.add("match", "disabled", "animated", "bounce");
    }

    OpenedCards.length = 0;
}

function unmatched() {

    cleanCards.forEach(card => {
        card.classList.add('disabled');

        OpenedCards.forEach(card => {
            setTimeout(function () {
                card.classList.remove("flip");
                card.classList.add("show", "open", "unmatched", "shake");
            }, 800);
        });

        setTimeout(function () {
            card.classList.remove("show", "open", "unmatched", "disabled", "flip", "shake");
            for (var i = 0; i < matchedCards.length; i++) {
                matchedCards[i].classList.add("disabled");
            }
        }, 1600);

    });


    OpenedCards.length = 0;

}

let moves = "moves";

function movesCounter() {

    moveCount++;

    console.log(moveCount);

    movesWrap.innerHTML = "";

    moves = moveCount < 2 ? " move" : " moves";

    movesWrap.innerHTML = moveCount + moves;

    // Ratings
    if (moveCount >= 8 && moveCount <= 12) {
        
           for (let i = 0; i < 3; i++) {
            if (i === 2) {
              $(".stars li").eq(i).remove();
            }
        }

        
    } else if (moveCount > 13 && moveCount <= 18) {
        for (let i = 0; i < 2; i++) {
            if (i === 1) {
              $(".stars li").eq(i).remove();
            }
        }
    }


}


function restart() {
    moveCount = 0;
    movesWrap.innerHTML = moveCount + moves;
    clearInterval(timer);
    startTimer(timeInSeconds);
    shuffle(cleanCards);
    for (let i = 0; i < shuffledCards.length; i++) {

        deck.appendChild(shuffledCards[i]);
        shuffledCards[i].classList.remove("open", "show", "match", "bounce","disabled");

    }

}

$("#gameStart").on("click", function (e) {
    e.preventDefault();
    $(".mainHead").slideUp();
    if ($(".inputBox").val()) {
        userName = $(".inputBox").val();
    }
    console.log(userName);
    $("#userName").html(userName);

});
$("#gameStart").on("click", openNav);
$("#easy").on("click", function () {
    animateLayout();
    closeNav();
    startTimer(300);
    timeInSeconds = 300;
    dLevel = 0
});
$("#medium").on("click", function () {
    animateLayout();
    closeNav();
    startTimer(180);
    timeInSeconds = 180;
    dLevel = 1
});
$("#hard").on("click", function () {
    animateLayout();
    closeNav();
    startTimer(120);
    timeInSeconds = 120;
    dLevel = 2
});


function animateLayout() {
    $("#CountDownWrap").animate({
        top: "130px"
    }, "slow", "linear");
    $("#navMenu ul").animate({
        textAlign: "center"
    }, "slow", "linear");
}

$(".clock").one("click", function () {
    $(this).css("animation-iteration-count", "1");
});


$("#restart").on("click", restart);

var showClock = document.querySelector(".timer");

function startTimer(seconds) {
    clearInterval(timer);
    let now = Date.now();
    let choice = seconds * 1000;
    let totalTime = now + choice;
    showTimer(seconds);
    //console.log(totalTime);

    timer = setInterval(function () {

        var remainTime = Math.round((totalTime - Date.now()) / 1000);

        if (remainTime < 0) {
            console.log("Time Up");
            clearInterval(timer);
        } else {
            showTimer(remainTime);
        }

    }, 1000);


}


function showTimer(seconds) {
    mins = Math.floor(seconds / 60);
    secs = seconds % 60;
    showClock.innerHTML = `${mins}:${secs < 10? "0" +secs: secs}`;
    //console.log(mins +":" + secs);
}

function openNav() {
    document.getElementById("gameLevels").style.width = "100%";
}

function openModal() {
    document.getElementById("howToPlay").style.width = "100%";
}

function closeNav() {
    document.getElementById("gameLevels").style.width = "0%";
}

function closeModal() {
    document.getElementById("howToPlay").style.width = "0%";
}
let totalTime;



$(".close").on("click", function () {
    $("#Result").slideDown(1000);
})

$("#Result").on("click", function () {

    $(this).hide(1000);
})

function Congrats() {


    if (matchedCards.length === 16) {
        console.log("Congratulations");
        clearInterval(timer);
        console.log(startTimer)
        totalTime = timeInSeconds - (mins * 60 + secs);
        $("#tookTime").html("<strong>" + totalTime + " Seconds</strong>");
        $("#showMoves").html("<strong>" + moveCount + moves + "</strong>");
        console.log("You Took " + totalTime + " Seconds");
        dLevel = (dLevel === 0) ? "<strong>Easy</strong> <br\> You have won Bronze Medal Try Medium Level Now to get Silver. <br/> Here is your <strong>Bronze Medal</strong> <i class='fas fa-medal bronze'></i>" : (dLevel === 1) ? "<strong>Medium</strong>. \n You have Won a Medal This means You have a very sharp memory. Keep it up and Try The Hard one. <br/> Here is your <strong>Silver Medal</strong> <i class='fas fa-medal silver'></i>" : "<strong>Hard</strong> \n You are a Genious and have Very Good Brain. Now you have passed our hardest level you will get badge and the medal. Keep Breaking Your own Records <br/> Here is your <strong>Gold Medal</strong> <i class='fas fa-medal gold'></i>";
        console.log(dLevel);
        $("#showDiffLevel").html(dLevel);
        let ratingsResult = $(".stars").html();

        $("#showRatings").append(ratingsResult);

        console.log(ratingsResult);

        $("#userNameHere").html(userName);

        $("#Result").fadeIn();



    }

}