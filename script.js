const randomButton = $(".random-note-button");
const piano = $(".piano");
const repeatButton = $(".repeat-note");
const notesKeys = [];
let audio = new Audio();
let randomNote;
let noteAudioSrc;
let indexNote;
let dataInfoObject;

///////////////////////////
/////RANDOM NOTE BUTTON/////
///////////////////////////
randomButton.click(function() {
    let randomNumber = getRandomNumber(0, notes.length);
    randomNote = notes[randomNumber];

    audio.src = randomNote.audio;
    audio.play(randomNote.audio);

    /////REPEAT BUTTON/////
    repeatButton.click(function() {
        audio.src = randomNote.audio;
        audio.play(randomNote.audio);
    });
    console.log(randomNote.audio);
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//////////////////////
///////PIANO/////////
/////////////////////
piano.click(function(e) {
    dataInfoObject = notes.find(function(item) {
        return item.id === e.target.id;
    });
    e.stopPropagation(e);
    audio.src = dataInfoObject.audio;
    if (dataInfoObject.audio) {
        audio.play(dataInfoObject.audio);
    }
    console.log(dataInfoObject.audio);
    rightOrWrongNote(dataInfoObject, randomNote);
});

//////////////////////
///////WINNER////////
/////////////////////

function rightOrWrongNote(clickedNote, actualNote) {
    if (clickedNote.id === actualNote.id) {
        $(".result-win").addClass("show");
        $(".result-win").removeClass("hide");
    } else {
        var clickedNoteIndex = notes.findIndex(
            item => item.id == clickedNote.id
        );
        var actualNoteIndex = notes.findIndex(item => item.id == actualNote.id);
        console.log(clickedNoteIndex, actualNoteIndex);

        $(".result-lose").addClass("show");
        $(".result-lose").removeClass("hide");
    }
}
