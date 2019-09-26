/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa fa-anchor', 'fa fa-anchor', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-diamond', 'fa fa-diamond', 'fa fa-plane', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-plane', 'fa fa-cube'];
const allCards = document.querySelectorAll('.card');
let deck = document.querySelectorAll('.deck');
let allstars = document.querySelectorAll('.stars');
let openCards = 0;
let nbofclicks = 0;
let currenttime = document.querySelector('.shownTime');
let gameInterval;
// Define winning text
let wintext = document.createElement('section');
wintext.textContent = 'Great job! Play again?';

// shuffles the cards in the console 
shuffle(cardsArray);
for (let i = 0; i < 16; i++) {
    // console.log(cardsArray[i]);
    // console.log(document.getElementsByClassName("card")[i]);
    // console.log(document.getElementsByClassName("card")[i].firstElementChild.classList);
    document.getElementsByClassName("card")[i].firstElementChild.className = cardsArray[i];
    // Set all cards black
    allCards.forEach(function (card) {
        // wieso hier nicht die match Klasse????
        card.classList.remove('open', 'show', 'none', 'match');
        // deck.classList.remove ('none');
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Timer Function
function timer() {
    let minutes = 0;
    let seconds = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        currenttime.innerHTML = minutes + ":" + seconds;
        console.log(minutes, seconds);
    }, 1000);
}



//   Restart function
function restart(){
    //Reset stars to grey 
    document.getElementsByClassName('fa fa-star')[2].style.color='gold';
    document.getElementsByClassName('fa fa-star')[1].style.color='gold'; 
    document.getElementsByClassName('fa fa-star')[0].style.color='gold'; 

    // Mover and number of clicks
    nbofclicks = 0;
    document.getElementById("moves").textContent = nbofclicks;

    //Set Time to Zero
    clearInterval(gameInterval);
    currenttime.innerHTML = '00:00';

    // turn cards black
    for (let c of allCards) {
        c.classList.remove('match', 'show', 'open', 'none');
    }
    
    //Shuffle
    shuffle(cardsArray);
    for (let i = 0; i < 16; i++) {
        document.getElementsByClassName("card")[i].firstElementChild.className = cardsArray[i];
        // Set all cards black
        // allCards.forEach(function (card) {
        //     card.classList.remove('open', 'show', 'none');
        // });
    }  
}


 /* ShowScore function*/
function showScore() {
    // document.getElementsByClassName('score-panel').classList.add('win'); 
    document.getElementsByClassName('score-panel')[0].appendChild(wintext);
    // addding CSS von class win
    document.getElementsByClassName('score-panel')[0].classList.add('win');
    // removing deck with class none 
    document.getElementsByClassName('deck')[0].classList.add('none');


    // when clicking on restart, play again???
    document.querySelector('.restart').addEventListener('click', function () {
        console.log('restart click');
        shuffle(cardsArray);
        document.getElementsByClassName('score-panel')[0].classList.remove('win');
        // removing deck with class none 
        document.getElementsByClassName('deck')[0].classList.remove('none');
        document.getElementsByClassName('score-panel')[0].removeChild(wintext);
        
    })
}


//restartgame at beginning
restart();

// Function for Restart BUtton
document.querySelector('.restart').addEventListener('click', function () {
    restart();
    // console.log('restart click');
});
/*
 * Logic of game 
 */
allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
        // wenn zwei oder mehr Karten offen sind und man klickt nochmal dann startet if...
        // if nimmt alle Karten und wenn die Karte nicht die Klasse match hat, dann wird shown, open auch entfernt --> werden wieder schwarz
        if (openCards >= 2) {
            for (let c of allCards) {
                if (!c.classList.contains('match')) { // for all cards that are not green (not match)
                    c.classList.remove('show', 'open'); // close the cards in the game
                }
            } // OpenCards = 0, otherwise I cannot continue the game and cannot open a card 
            openCards = 0;
            return;
        } else {
            //  
            if (card.classList.contains('open')) {
                return;
            }
            // One card is open (comparison) 
            if (openCards == 1) {
                let c = document.getElementsByClassName('open')[0]; // save name of open card in variable c (first card)
                if (card.firstElementChild.className == c.firstElementChild.className) { // compare if first card and second card are equal
                    //cards are correct
                    card.classList.remove('open'); // second card
                    card.classList.add('match'); // second card
                    c.classList.remove('open'); // first card which is saved
                    c.classList.add('match'); // first card which is saved
                    openCards = 0; // OpenCards = 0, otherwise I cannot continue the game and cannot open other cards after I have found a match
                    // after every match I want to check if it was the last match, number of matched cards == number of cards in the game 
                    if (document.getElementsByClassName('match').length == allCards.length) { // 
                        clearInterval(gameInterval);
                        showScore();
                    }
                    return;
                }
            }
            // Increase counter for open cards, cards will open, show
            openCards++;
            card.classList.add('open', 'show');
        }
        // console.log('openCards', openCards);



        // Start timer by first click
        nbofclicks = nbofclicks + 1;
        if (nbofclicks == 1) {
            timer();
        }
        // Based on number of clicks - change color of stars
        if (nbofclicks == 26) {
            document.getElementsByClassName('fa fa-star')[2].style.color='grey'; 
        }
        if (nbofclicks == 36) {
            document.getElementsByClassName('fa fa-star')[1].style.color='grey'; 
        }
        if (nbofclicks == 42) {
            document.getElementsByClassName('fa fa-star')[0].style.color='grey'; 
        }
        // Moves
        console.log(document.getElementById("moves").textContent);
        document.getElementById("moves").textContent = nbofclicks;
        console.log('nbofclicks', nbofclicks);
    });
});
