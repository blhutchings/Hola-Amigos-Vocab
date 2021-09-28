const cardFront = document.getElementById("card-face-front-text");
const cardBack = document.getElementById("card-face-back-text");

const nextButton = document.getElementById("next");
const backButton = document.getElementById("beck");
const listenButton = document.getElementById("listen");

const vocabList = [flash_card_det0, flash_card_det1, flash_card_det2, flash_card_det3, flash_card_det4, flash_card_det5, flash_card_det6,
                   flash_card_det7, flash_card_det8, flash_card_det9, flash_card_det10, flash_card_det11, flash_card_det12];


const VOCAB_LIST_AMOUNT = vocabList.length; //Amount of vocabulary lists


var selected = [];      //What lists are currently selected
var vocabQueue = [];    //A queue of all vocbaulary from the selected list

var currentIndex = 0; //What word are we on in the queue

var languageMode = "spanish";
    
var audio = new Audio();

//Adds and removes selected lists
function selectVocabList (vocabListIndex, checkboxValue) {
    if (checkboxValue == true) { //If being selected
        selected.push(vocabList[vocabListIndex]);

        //Add vocab list to queue
        addSelectListToQueue(vocabList[vocabListIndex]);
    } else { //If being unselected
        
        //Remove list from selected array
        const index = selected.indexOf(vocabList[vocabListIndex]);
        if (index > -1) {
            selected.splice(index, 1);
        }

        //Make new queue
        vocabQueue = generateVocabList() 
    }
    gotoFirstWord();
}


function addSelectListToQueue(selectedList) {
    for (var vocabIndex = 0; vocabIndex < selectedList.length; vocabIndex++) {
        vocabQueue.push(selectedList[vocabIndex]);
    }
    shuffleArray(vocabQueue);
}


function generateVocabList() {
    var newVocabQueue = [];
    for (var selectedIndex = 0; selectedIndex < selected.length; selectedIndex++) {
        for (var vocabIndex = 0; vocabIndex < selected[selectedIndex].length; vocabIndex++) {
            newVocabQueue.push(selected[selectedIndex][vocabIndex]);
        }
    }
    shuffleArray(newVocabQueue);
    return newVocabQueue;
}

function gotoFirstWord() {
    currentIndex = 0;
    update();
}

//Displays the next word from queue
function nextWord() {
    if (currentIndex < vocabQueue.length) {
        currentIndex++;
        update();
    } else {
        //Disable next
        console.log("At last card, can not go forward")
    }
}

//Displays the previous word from queue
function previousWord() {
    if (currentIndex > 0) {
        currentIndex--;
        update();
    } else {
        //Disable back
        console.log("At first card, can not go back")
    }
}




//Display text to card
function displayWord (frontText, backText) {
    cardFront.innerHTML = frontText;

    cardBack.innerHTML = "";
    setTimeout(() => {cardBack.innerHTML = backText;}, 300); //0.3ms, same as card flip
}

function setLanguageMode(languageMode) {
    this.languageMode = languageMode;
}


function listen() {
    audio.play();
}

function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function update() {
    //If audio is playing, stop
    if (!audio.paused && audio.duration > 0) {
        audio.pause();
    }

    //If card is flipped when updated, flip it back to front
    if (card.classList.contains("is-flipped")) {
        card.classList.toggle('is-flipped');
    }

    if (vocabQueue.length > 0) { //If vocabulary is in queue
        const entry = vocabQueue[currentIndex];
        const term = entry.term;
        const definition = entry.definition;

        switch (languageMode) {
            case "spanish":
                displayWord(term, definition); //Spanish front card
                break;
            case "english":
                displayWord(definition, term); //English front card
                break;
            case "random":
                (Math.random() >= 0.5) ? displayWord(term,definition) : displayWord(definition,term);
                break;
            default:
                displayWord(entry.term, entry.definition); //Spanish front card
                break;
        }

        //Preload audio or set it to null
        if (entry.term_audio != "") {
            audio = new Audio (entry.term_audio);
        } else {
            audio = new Audio();
        }

        //If no audio
        if (!audio.duration > 0) {
            
        }

        
        
        updateWordProgress(currentIndex+1,vocabQueue.length);
        
    } else { //If vocabulary queue is empty
        displayWord("","");
        updateWordProgress(0,0); 
        audio = new Audio();
    }

}


function updateWordProgress(index, total) {
    const wordCount = document.getElementById("word-count");
    wordCount.innerHTML = index + " / " + total
}
