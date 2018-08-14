const randomButton = $(".random-note-button");
const piano = $(".piano");
const repeatButton = $(".repeat-note");
const greenProgressBar = $(".progress-bar");
let audio = new Audio();
let randomNote;
let dataInfoObject;
let counter = 0;
let rightClickedNote = 0;
let wrongClickednote = 0;

///////////////////////////
/////RANDOM NOTE BUTTON/////
///////////////////////////

randomButton.on("click.randomClick", randomClick);
function randomClick() {
    autoRandomNote();
}

///////////////////////////
/////REPEAT BUTTON////////
///////////////////////////
repeatButton.on("click.repeatClick", repeatClick);
function repeatClick() {
    audio.src = randomNote.audio;
    audio.play(randomNote.audio);
}

$(".result").html(``);
function autoRandomNote() {
    console.log("this is random note: ");
    let randomNumber = getRandomNumber(0, notes.length);
    randomNote = notes[randomNumber];
    audio.src = randomNote.audio;
    audio.play(randomNote.audio);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//////////////////////
///////PIANO/////////
/////////////////////
piano.on("click.pianoClick", pianoClick);
function pianoClick(e) {
    e.stopPropagation();
    counter++;
    dataInfoObject = notes.find(function(item) {
        return item.id === e.target.id;
    });
    audio.src = dataInfoObject.audio;
    if (dataInfoObject.audio) {
        audio.play(dataInfoObject.audio);
    }
    // console.log(counter);
    rightOrWrongNote(dataInfoObject, randomNote);
}

//////////////////////
///////WINNER////////
/////////////////////

function rightOrWrongNote(clickedNote, actualNote) {
    var clickedNoteIndex = notes.findIndex(item => item.id == clickedNote.id);
    var actualNoteIndex = notes.findIndex(item => item.id == actualNote.id);
    var gap = 2;
    var farGap = 5;
    //////IF USER CLICKS THE RIGHT NOTE THAT HAPPENS////////
    if (actualNoteIndex === clickedNoteIndex) {
        rightClickedNote++;
        countdownStart();
        console.log("rightClickedNote ", rightClickedNote);
        $(".result").html(
            `<div class="win">
                <i class="fas fa-check-circle"></i>
                <h1>Well done, keep on going! Get ready for the next note!</h1>
            </div>`
        );
        // progressionBar();
        counter = 0;
        $(".piano").off("click.pianoClick");
        $(".random-note-button").off("click.randomClick");
        $(".repeat-note").off("click.repeatClick");
        setTimeout(function() {
            $(".piano").on("click.pianoClick", pianoClick);
            $(".random-note-button").on("click.randomClick", randomClick);
            $(".repeat-note").on("click.repeatClick", repeatClick);
        }, 3000);
        ///////IF USER CLICKS THE WRONG, STILL HAS 2 MORE CHANCES, THIS HAPPENS////////
    } else if (
        actualNoteIndex - farGap > clickedNoteIndex ||
        actualNoteIndex + farGap < clickedNoteIndex
    ) {
        $(".result").html(
            `<div class="lose">
                <i class="fas fa-times-circle"></i>
                <h1>Oh no, that's too far!</h1>
            </div>`
        );
    } else if (
        actualNoteIndex - gap > clickedNoteIndex ||
        actualNoteIndex + gap < clickedNoteIndex
    ) {
        $(".result").html(
            `<div class="lose">
                <i class="fas fa-times-circle"></i>
                <h1>Nice! Almost there...</h1>
            </div>`
        );
    } else {
        $(".result").html(
            `<div class="lose">
                <i class="fas fa-times-circle"></i>
                <h1>Veeery close!</h1>
            </div>`
        );
    }
    ///////////IF USERS USES THE THIRD CHANCE THAT HAPPENS////////
    if (counter > 2) {
        console.log("wrongClickednote ", wrongClickednote);
        countdownStart();
        wrongClickednote++;
        $(".result").html(
            `<div class="lose">
                <h1> You have reached the limit, new note is coming!</h1>
            </div>`
        );

        counter = 0;
        $(".piano").off("click.pianoClick");
        $(".random-note-button").off("click.randomClick");
        $(".repeat-note").off("click.repeatClick");

        setTimeout(function() {
            $(".piano").on("click.pianoClick", pianoClick);
            $(".random-note-button").on("click.randomClick", randomClick);
            $(".repeat-note").on("click.repeatClick", repeatClick);
        }, 3000);
    }
}

//////////////////////
///PROGRESSION-BAR////
/////////////////////

function progressionBar() {
    console.log("progressionBar", rightClickedNote);
    if (rightClickedNote === 1) {
        $(".progress-bar").addClass("green");
    } else {
        $(".progress-bar").addClass("red");
    }
}

//////////////////////
///////COUNTDOWN/////
/////////////////////

function startTimer(duration, display) {
    var seconds = 5;
    var timer = setInterval(function() {
        $("#time").html(seconds);
        if (--seconds < 1) {
            clearInterval(timer);
            autoRandomNote();
            $(".result").html(``);
        }
    }, 1000);
}

function countdownStart() {
    display = $("#time");
    startTimer(display);
}
