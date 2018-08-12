const button = $(".buttonHolder");
const piano = $(".piano");
const notesKeys = [];
let audio = new Audio();
let randomNote;
let clickedNote;
let noteAudioSrc;

//////////////////////
/////PLAY BUTTON/////
/////////////////////
for (var noteName in notes) {
    notesKeys.push(noteName);
}
button.click(function() {
    let randomNumber = getRandomNumber(0, notesKeys.length);
    randomNote = notesKeys[randomNumber];

    for (var key in notes) {
        if (randomNote === key) {
            noteAudioSrc = notes[key];
            audio.src = noteAudioSrc;
        }
    }
    audio.play(noteAudioSrc);
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
        console.log(clickedNote);
    }
    rightOrWrongNote();
});

//////////////////////
///////WINNER////////
/////////////////////

function rightOrWrongNote() {
    switch (clickedNote) {
        case randomNote:
            console.log("right note");
    }
}

// if (randomNote === clickedNote) {
//     $(".result-win").addClass("show");
//     $(".result-win").removeClass("hide");
// } else {
//     $(".result-lose").addClass("show");
//     $(".result-lose").removeClass("hide");
// }
