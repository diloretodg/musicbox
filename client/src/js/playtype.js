// handles on click note plays acts like a loop should be in other file to turn on off.
$(document).on("click", ".music-note", function(){
    var note = $(this).attr("data-note");
    play(note);
    console.log("playing "+ note);   
    noteIntervals.push(setInterval(function() {play(note) }, 2000))});


// clear all playing notes
$("#reset").on("click", function() {
    for (var i = 0; i < noteIntervals.length; i++) {
        clearInterval(noteIntervals[i]);
    }
    console.log("timer reset");
})

var noteIntervals = [];
var currentNotes

// currently set to 60 bpm
var tempo = 1000;
var time = tempo;
var wholeNote =  tempo * 4;
var halfNote = tempo * 2;
var quarterNote = tempo;
var eigthNote = tempo / 2;
var sixteenthNote = tempo / 4;

var testSongArr = [
    {note: "c4Audio", timing: sixteenthNote, sequence: 1},
    {note: "b3Audio", timing: sixteenthNote, sequence: 2},
    {note: "a3Audio", timing: sixteenthNote, sequence: 3},
    {note: "g3Audio", timing: sixteenthNote, sequence: 4},
    {note: "f3Audio", timing: sixteenthNote, sequence: 5},
    {note: "e3Audio", timing: sixteenthNote, sequence: 6},
    {note: "d3Audio", timing: sixteenthNote, sequence: 7},
    {note: "c3Audio", timing: sixteenthNote, sequence: 8},
    {note: "cs3Audio", timing: sixteenthNote, sequence: 9},
    {note: "eb3Audio", timing: sixteenthNote, sequence: 10},
    {note: "fs3Audio", timing: sixteenthNote, sequence: 11},
    {note: "ab3Audio", timing: sixteenthNote, sequence: 12},
    {note: "bb3Audio", timing: sixteenthNote, sequence: 13},
    {note: "c4Audio", timing: sixteenthNote, sequence: 14},
    {note: "g3Audio", timing: sixteenthNote, sequence: 15},
    {note: "c3Audio", timing: sixteenthNote, sequence: 16},
]

function playSong(s){
    for (var i = 0; i < s.length; i ++) {
        var timing = s[i].timing;
        time = time + timing;
        setTimeout(function(index) {
            play(s[index].note)
        }.bind(null, index), (time))
    }
}

function playSong(s){
    for (var i = 0; i < s.length; i ++) {
        setTimeout(function(index) {
            play(s[index].note)
        }.bind(null, i), (i+1) * tempo)
    }
}