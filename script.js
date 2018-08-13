const randomButton = $(".random-note-button");
const piano = $(".piano");
const repeatButton = $(".repeat-note");
let audio = new Audio();
let randomNote;
let dataInfoObject;
let counter = 0;

///////////////////////////
/////RANDOM NOTE BUTTON/////
///////////////////////////
randomButton.click(function() {
    autoRandomNote();
});

/////REPEAT BUTTON/////
repeatButton.click(function() {
    audio.src = randomNote.audio;
    audio.play(randomNote.audio);
});

function autoRandomNote() {
    $(".result").html(``);
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
piano.click(function(e) {
    e.stopPropagation();
    counter++;
    dataInfoObject = notes.find(function(item) {
        return item.id === e.target.id;
    });
    audio.src = dataInfoObject.audio;
    if (dataInfoObject.audio) {
        audio.play(dataInfoObject.audio);
    }
    console.log(counter);
    rightOrWrongNote(dataInfoObject, randomNote);
});

//////////////////////
///////WINNER////////
/////////////////////

function rightOrWrongNote(clickedNote, actualNote) {
    var clickedNoteIndex = notes.findIndex(item => item.id == clickedNote.id);
    var actualNoteIndex = notes.findIndex(item => item.id == actualNote.id);
    var gap = 2;
    var farGap = 5;

    console.log(clickedNoteIndex, actualNoteIndex);
    if (actualNoteIndex === clickedNoteIndex) {
        $(".result").html(
            `<div class="win">
                <i class="fas fa-check-circle">Well done, keep on going! Get ready for the next note!</i>
            </div>`
        );
        counter = 0;
        setTimeout(function() {
            autoRandomNote();
        }, 6000);
    } else if (
        actualNoteIndex - farGap > clickedNoteIndex ||
        actualNoteIndex + farGap < clickedNoteIndex
    ) {
        $(".result").html(
            `<div class="lose">
                <i class="fas fa-times-circle">Oh no, that's too far!</i>
            </div>`
        );
    } else if (
        actualNoteIndex - gap > clickedNoteIndex ||
        actualNoteIndex + gap < clickedNoteIndex
    ) {
        $(".result").html(
            `<div class="lose">
                <i class="fas fa-times-circle">Nice! Almost there...</i>
            </div>`
        );
    } else {
        $(".result").html(
            `<div class="lose">
                <i class="fas fa-times-circle">Veeery close!</i>
            </div>`
        );
    }
    if (counter > 2) {
        $(".result").html(
            `<div class="lose">
                <h1> You have reached the limit, new note is coming!</h1>
            </div>`
        );
    }
}
