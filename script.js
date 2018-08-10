var notes = {
    c: "sounds/523-C.mp3",
    cSharp: "sounds/545-C-sharp.mp3",
    d: "sounds/587-D.mp3",
    dSharp: "sounds/622-D-sharp.mp3",
    e: "sounds/659-E.mp3",
    f: "sounds/698-F.mp3",
    fSharp: "sounds/698-F-sharp.mp3",
    g: "sounds/783-G.mp3",
    gSharp: "sounds/830-G-sharp.mp3",
    a: "sounds/880-A.mp3",
    aSharp: "sounds/932-A-sharp.mp3",
    b: "sounds/987-B.mp3",
    c: "sounds/1046-C.mp3"
};

(function(playPiano) {
    var button = $("button");
    var piano = $(".piano");

    piano.click(function(e) {
        e.stopPropagation();
        var clickedNote = [];
        var audio = new Audio();
        audio.src = notes[e.target.id];
        if (notes[e.target.id]) {
            clickedNote.push(notes[e.target.id]);
            audio.play(clickedNote);
        }
        console.log(clickedNote);
    });
})();

// var audio = new Audio();
// audio.src = "file_name.mp3";
// audio.play();
