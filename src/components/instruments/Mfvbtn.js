import React from "react";
import Tone from "tone";
// import { Col } from "../Grid";


var MIDI_NUM_NAMES = ["C_1", "C#_1", "D_1", "D#_1", "E_1", "F_1", "F#_1", "G_1", "G#_1", "A_1", "A#_1", "B_1","C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0","C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1","C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2","C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3","C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4","C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5","C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6","C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7","C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8","C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9"];


var mfv = {
    name:'My Funny Valentine',
    ref: 60,
    bpm: 150,
    bass:[
      [0,4,0],
      [-1,4,4],
      [-2,4,8],
      [-3,4,12],
      [-4,4,16],
      [-7,4,20],
      [-10,4,24],
      [-5,4,28],
      //
      [0,4,32],
      [-1,4,36],
      [-2,4,40],
      [-3,4,44],
      [-4,4,48],
      [-7,4,52],
      [-7,4,56],
      [-2,4,60],
      //
      [3,2,64],
      [5,2,66],
      [7,2,68],
      [5,2,70],
      [3,2,72],
      [5,2,74],
      [7,2,76],
      [5,2,78],
      //
      [3,2,80],
      [7,2,82],
      [0,2,84],
      [-2,1,86],
      [-3,1,87],
      [-4,4,88],
      [2,2,92],
      [-5,2,94],
      //
      [0,4,96],
      [-1,4,100],
      [-2,4,104],
      [-3,4,108],
      [-4,4,112],
      [2,2,116],
      [-5,2,118],
      [0,4,120],
      [-2,2,124],
      [-3,2,126],
      [-4,4,128],
      [-7,2,132],
      [-2,2,134],
      [-9,4,136],
],
    part1:[
      [0,2,0],
      [2,1,2],
      [3,1,3],
      [2,1.5,4],
      [3,.5,5.5],
      [2,2,6],
      [0,2,8],
      [2,1,10],
      [3,1,11],
      [2,1.5,12],
      [3,.5,13.5],
      [2,2,14],
      [0,2,16],
      [2,1,18],
      [3,1,19],
      [10,2,20],
      [8,1,22],
      [7,1,23],
      [5,8,24],
      [3,2,32],
      [5,1,34],
      [7,1,35],
      [5,1.5,36],
      [7,.5,37.5],
      [5,2,38],
      [3,2,40],
      [5,1,42],
      [7,1,43],
      [5,1.5,44],
      [7,.5,45.5],
      [5,2,46],
      [3,2,48],
      [5,1,50],
      [7,1,51],
      [14,1.5,52],
      [12,.5,53.5],
      [10,1.5,54],
      [9,.5,55.5],
      [8,6,56],
      [7,1,62],
      [5,1,63],
      [10,1.5,64],
      [3,.5,65.5],
      [3,1,66],
      [2,1,67],
      [3,2,68],
      [3,1,70],
      [2,1,71],
      [12,1.5,72],
      [3,.5,73.5],
      [3,1,74],
      [2,1,75],
      [3,2,76],
      [3,1,78],
      [2,1,79],
      [14,1.5,80],
      [3,.5,81.5],
      [3,1,82],
      [2,1,83],
      [3,2,84],
      [5,1,86],
      [7,1,87],
      [12,6,88],
      [3,1,94],
      [2,1,95],
      [0,2,96],
      [2,1,98],
      [3,1,99],
      [2,1.5,100],
      [3,.5,101.5],
      [2,2,102],
      [3,2,104],
      [5,1,106],
      [7,1,107],
      [5,1.5,108],
      [7,.5,109.5],
      [5,2,110],
      [12,2,112],
      [14,1,114],
      [15,1,115],
      [17,1.5,116],
      [15,.5,117.5],
      [14,2,118],
      [15,8,120],
      [3,2,128],
      [5,1,130],
      [7,1,131],
      [5,1.5,132],
      [7,.5,133.5],
      [5,2,134],
      [3,4,136]
  ]
}
//-----------------------------------------------------*/

var musicBox = null;
var bassBox = null;
var song = [];
var bass = [];

function songBuild(songArr){
      song = [];
      for(var i = 0; i < songArr.length; i ++){
            var oneNote = {};
            Object.defineProperties(oneNote, {
                  note: {value: songArr[i][0]},
                  duration: {value: songArr[i][1]},
                  time: {value: songArr[i][2]}           
            });
            song.push(oneNote);
      }
      console.log(song)
      return song
}
function bassBuild(songArr){
      bass = [];
      for(var i = 0; i < songArr.length; i ++){
            var oneNote = {};
            Object.defineProperties(oneNote, {
                  note: {value: songArr[i][0]},
                  duration: {value: songArr[i][1]},
                  time: {value: songArr[i][2]}           
            });
            bass.push(oneNote);
      }
      console.log(bass)
      return bass
}

function stopIt(){
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
   }

function myFunnyValetine(){
      // resets audiocontext
      stopIt();
      Tone.Transport.bpm.value = 60
      // resets instrument settings
      musicBox = null;
      bassBox = null;
      // resets part data
      var melodyPart = null;
      var bassPart = null;
      // can edit instrument sound inside here
      if(!musicBox){
            musicBox = new Tone.Synth({
            //   envelope,oscillator,delay,
            envelope: {
                  "attack": .015,
                  "decay": 2,
                  "sustain": 0.01,
                  "release": 1
              }  
            }).toMaster()
            musicBox.volume.value = -5
      };
      if(!bassBox){
            bassBox = new Tone.Synth({
            //   envelope,oscillator,delay,
            envelope: {
                  "attack": .02,
                  "decay": 2.75,
                  "sustain": 0.1,
                  "release": 1
              }  
            }).toMaster()
            bassBox.volume.value = -5
      };

      melodyPart = new Tone.Part(function(time,value){
            musicBox.triggerAttackRelease((MIDI_NUM_NAMES[value.note + mfv.ref]), value.duration, time, .75)
      }, song).start(0);
      bassPart = new Tone.Part(function(time,value){
            bassBox.triggerAttackRelease((MIDI_NUM_NAMES[value.note + mfv.ref - 12]), value.duration, time, .7)
      }, bass).start(0);
      
      Tone.Transport.bpm.value = mfv.bpm 
      Tone.Transport.start("+0.1");
}

songBuild(mfv.part1);
bassBuild(mfv.bass);

const Mfvbtn = () => {
    return (
          <div 
                className='synth-beep' 
                onClick = {()=> myFunnyValetine()}>
          </div>
    );
  }
export default Mfvbtn;