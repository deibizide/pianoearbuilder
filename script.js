const randomButton = $(".random-note-button");
const piano = $(".piano");
const repeatButton = $(".repeat-note");
let audio = new Audio();
let randomNote;
let dataInfoObject;
let counter = 0;
let rightClickedNote = 0;

///////////////////////////
/////RANDOM NOTE BUTTON/////
///////////////////////////

randomNote.on("click.randomClick", randomClick);
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

    if (actualNoteIndex === clickedNoteIndex) {
        rightClickedNote++;
        console.log(rightClickedNote);
        $(".result").html(
            `<div class="win">
                <i class="fas fa-check-circle"></i>
                <h1>Well done, keep on going! Get ready for the next note!</h1>
                <div>Next Note in... <span id="time">6</span> seconds!</div>
            </div>`
        );
        counter = 0;
        $(".piano").off("click.pianoClick");
        setTimeout(function() {
            $(".piano").on("click.pianoClick", pianoClick);

            autoRandomNote();
        }, 6000);
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
    if (counter > 2) {
        $(".result").html(
            `<div class="lose">
                <h1> You have reached the limit, new note is coming!</h1>
                <div>Next Note in... <span id="time">6</span> seconds!</div>
            </div>`
        );
        counter = 0;
        $(".piano").off("click.pianoClick");
        $(".piano").off("click.pianoClick");

        $(".piano").off("click.pianoClick");

        setTimeout(function() {
            $(".piano").on("click.pianoClick", pianoClick);

            autoRandomNote();
        }, 6000);
    }
}

//////////////////////
///FINAL-COUNTDOWN/////
/////////////////////

// function startTimer(duration, display) {
//     var timer = duration,
//         seconds;
//     setInterval(function() {
//         seconds = parseInt(timer % 7, 10);
//
//         seconds = seconds < 7 ? seconds : seconds;
//
//         display.textContent = seconds;
//
//         if (--timer < 1) {
//             timer = duration;
//         }
//     }, 1000);
// }
//
// window.onload = function() {
//     var sixSeconds = 2000,
//         display = document.querySelector("#time");
//     startTimer(sixSeconds, display);
// };
