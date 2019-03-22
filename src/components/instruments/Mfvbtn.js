import React from "react";
import Tone from "tone";
// import { Col } from "../Grid";


var MIDI_NUM_NAMES = ["C_1", "C#_1", "D_1", "D#_1", "E_1", "F_1", "F#_1", "G_1", "G#_1", "A_1", "A#_1", "B_1","C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0","C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1","C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2","C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3","C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4","C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5","C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6","C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7","C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8","C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9"];


var mfv = {
    name:'My Funny Valentine',
    ref: 60,
    bpm: 100,
    part1:[
      {note: 0, duration: 2, time: 0, velocity: .5},
      {note: 2, duration: 1, time: "0:2", velocity: .5},
      {note: 3, duration: 1, time: "0:3", velocity: .5},
      {note: 2, duration: 1.5, time: "1:0", velocity: .5},
      {note: 3, duration: .5, time: "1:2:2", velocity: .5},
      {note: 2, duration: 2, time: "1:3", velocity: .5},
      {note: 0, duration: 2, time: "2:0", velocity: .5},
      {note: 2, duration: 1, time: "2:2", velocity: .5},
      {note: 3, duration: 1, time: "2:3", velocity: .5},
      {note: 2, duration: 1.5, time: "3:0", velocity: .5},
      {note: 3, duration: .5, time: "3:2:2", velocity: .5},
      {note: 2, duration: 2, time: "3:3", velocity: .5},
      {note: 0, duration: 2, time: "4:0", velocity: .5},
      {note: 2, duration: 1, time: "4:2", velocity: .5},
      {note: 3, duration: 1, time: "4:3", velocity: .5},
      {note: 10, duration: 2, time: "5:0", velocity: .5},
      {note: 8, duration: 1, time: "5:2", velocity: .5},
      {note: 7, duration: 1, time: "5:3", velocity: .5},
      {note: 5, duration: 4, time: "6:0", velocity: .5},
      // {note: "C4", duration: "2n", time: 0},
      // {note: "D4", duration: "4n", time: "0:2"},
      // {note: "D#4", duration: "4n", time: "0:3"},
      // {note: "D4", duration: "4n + 8n", time: "1:0"},
      // {note: "D#4", duration: "8n", time: "1:2:2"},
      // {note: "D4", duration: "2n", time: "1:3"},
      // {note: "C4", duration: "2n", time: "2:0"},
      // {note: "D4", duration: "4n", time: "2:2"},
      // {note: "D#4", duration: "4n", time: "2:3"},
      // {note: "D4", duration: "4n + 8n", time: "3:0"},
      // {note: "D#4", duration: "8n", time: "3:2:2"},
      // {note: "D4", duration: "2n", time: "3:3"},
      // {note: "C4", duration: "2n", time: "4:0"},
      // {note: "D4", duration: "4n", time: "4:2"},
      // {note: "D#4", duration: "4n", time: "4:3"},
      // {note: "A#4", duration: "2n", time: "5:0"},
      // {note: "G#4", duration: "4n", time: "5:2"},
      // {note: "G4", duration: "4n", time: "5:3"},
      // {note: "F4", duration: "1n", time: "6:0"},
      //   {note:0,duration:'2n',timing:0},
      //   {note:2,duration:'4n',timing:'0:2'},
      //   {note:3,duration:'4n',timing:'0:3'},
      //   {note:2,duration:'4n + 8n',timing:'1:0'},
      //   {note:3,duration:'8n',timing:'1:2:2'},
      //   {note:2,duration:'2n',timing:'1:3'},
      //   {note:0,duration:'2n',timing:'2:0'},
      //   {note:2,duration:'4n',timing:'2:2'},
      //   {note:3,duration:'4n',timing:'2:3'},
      //   {note:2,duration:'4n + 8n',timing:'3:0'},
      //   {note:3,duration:'8n',timing:'3:2:2'},
      //   {note:2,duration:'2n',timing:'3:3'},
      //   {note:0,duration:'2n',timing:'4:0'},
      //   {note:2,duration:'4n',timing:'4:2'},
      //   {note:3,duration:'4n',timing:'4:3'},
      //   {note:10,duration:'2n',timing:'5:0'},
      //   {note:8,duration:'4n',timing:'5:2'},
      //   {note:7,duration:'4n',timing:'5:3'},
      //   {note:5,duration:'1n',timing:'6:0'},
    ],
    part2:[
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
  ]
}
//-----------------------------------------------------*/

var musicBox = null;

function stopIt(){
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
      if(musicBox) {
          musicBox.dispose();
          musicBox = null;
      }
   }

function myFunnyValetine(){
      // resets audiocontext
      stopIt();
      // resets instrument settings
      musicBox = null;
      // resets part data
      var melodyPart = null;
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

      melodyPart = new Tone.Part(function(time,value){
            musicBox.triggerAttackRelease((MIDI_NUM_NAMES[value.note + mfv.ref]), value.duration, time, .75)
      }, mfv.part1).start(0);
      var tempo = mfv.bpm;
      Tone.Transport.bpm.value = tempo   
      Tone.Transport.start('+0.5');
      console.log(melodyPart)
       return melodyPart
}

const Mfvbtn = () => {
    return (
          <div 
                className='synth-beep' 
                onClick = {()=> myFunnyValetine()}>
          </div>
    );
  }
export default Mfvbtn;