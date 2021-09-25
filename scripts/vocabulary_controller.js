const cardFront = document.getElementById("card-face-front-text");
const cardBack = document.getElementById("card-face-back-text");

const vocabList = [flash_card_det0, flash_card_det1, flash_card_det2, flash_card_det3, flash_card_det4, flash_card_det5, flash_card_det6,
                   flash_card_det7, flash_card_det8, flash_card_det9, flash_card_det10, flash_card_det11, flash_card_det12];


const VOCAB_LIST_AMOUNT = vocabList.length; //Amount of vocabulary lists


var selected = [];      //What lists are currently selected
var vocabQueue = [];    //A queue of all vocbaulary from the selected list

var currentIndex = 0; //What word are we on in the queue
    


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
    updateVisuals();
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
    updateVisuals();
}

//Displays the next word from queue
function nextWord() {
    if (currentIndex < vocabQueue.length) {
        currentIndex++;
        updateVisuals();
    } else {
        //Disable next
        console.log("At last card, can not go forward")
    }
}

//Displays the previous word from queue
function previousWord() {
    if (currentIndex > 0) {
        currentIndex--;
        updateVisuals();
    } else {
        //Disable back
        console.log("At first card, can not go back")
    }
}

//Display text to card
function displayWord (frontText, backText) {
    cardFront.innerHTML = frontText;
    cardBack.innerHTML = backText;
}

function listen() {
    new Audio(vocabQueue[currentIndex].term_audio).play();
}

function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function updateVisuals() {
    if (vocabQueue.length > 0) {
        const entry = vocabQueue[currentIndex];
        displayWord(entry.term, entry.definition);
        updateWordProgress(currentIndex+1,vocabQueue.length);
    } else {
        displayWord("","");
        updateWordProgress(0,0); 
    }

}

function updateWordProgress(index, total) {
    const wordCount = document.getElementById("word-count");
    wordCount.innerHTML = index + " / " + total
}
