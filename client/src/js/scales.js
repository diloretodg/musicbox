var MIDI_NUM_NAMES = ["C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0","C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1","C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2","C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3","C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4","C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5","C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6","C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7","C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8","C9"];

var MAJOR_SCALE = [0,2,4,5,7,9,11,12];
var CHROMATIC_SCALE = [0,1,2,3,4,5,6,7,8,9,10,11,12];
var DORIAN = [0,2,3,5,7,9,10,12];
var PHRGIAN = [0,1,3,5,7,8,10,12];
var LYDIAN = [0,2,4,6,7,9,11,12];
var MIXOLYDIAN = [0,2,4,5,7,9,10,12];
var AEOLIAN = [0,2,3,5,7,8,10,12];
var LOCRIAN = [0,1,3,5,6,8,10,12];
var PENTATONIC = [0,2,4,7,9,12];
var HARMONIC_MINOR = [0,2,3,5,7,9,11,12];
var MELODIC_MINOR = [0,2,3,5,7,9,11,12,10,8,7,5,3,2,0];


module.exports = {
    MIDI_NUM_NAMES,
    MAJOR_SCALE,
    CHROMATIC_SCALE,
    DORIAN,
    PHRGIAN,
    LYDIAN,
    MIXOLYDIAN,
    AEOLIAN,
    LOCRIAN,
    PENTATONIC,
    HARMONIC_MINOR,
    MELODIC_MINOR
}

