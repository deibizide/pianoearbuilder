const randomButton = $(".random-note-button");
const piano = $(".piano");
const repeatButton = $(".repeat-note");
const notesKeys = [];
let audio = new Audio();
let randomNote;
let clickedNote;
let noteAudioSrc;
let indexNote;

//////////////////////
/////PLAY BUTTON/////
/////////////////////
for (var noteName in notes) {
    notesKeys.push(noteName);
}
randomButton.click(function() {
    let randomNumber = getRandomNumber(0, notesKeys.length);
    randomNote = notesKeys[randomNumber];

    for (var key in notes) {
        if (randomNote === key) {
            noteAudioSrc = notes[key];
            audio.src = noteAudioSrc;
            audio.play(noteAudioSrc);
        }
    }
    repeatButton.click(function() {
        audio.src = noteAudioSrc;
        audio.play(noteAudioSrc);
    });
    console.log("this is the Arry notes", notesKeys);
    console.log("this is the random note", randomNote);
    console.log(notesKeys.indexOf(randomNote));
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//////////////////////
///////PIANO/////////
/////////////////////

piano.click(function(e) {
    e.stopPropagation(e);
    audio.src = notes[e.target.id];
    if (notes[e.target.id]) {
        clickedNote = e.target.id;
        audio.play(clickedNote);
    }
    // console.log(randomNote.indexOf(clickedNote));

    rightOrWrongNote();
});

//////////////////////
///////WINNER////////
/////////////////////

function rightOrWrongNote() {
    console.log(randomNote, clickedNote);
    if (randomNote === clickedNote) {
        $(".result-win").addClass("show");
        $(".result-win").removeClass("hide");
    } else {
        $(".result-lose").addClass("show");
        $(".result-lose").removeClass("hide");
    }
}

//  a.indeof("s")clickenoted
// index of right answer index hat they tzype
//
// math.abd negative
