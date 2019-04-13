import React from "react";
import Tone from "tone";
const scale = require('../../../js/scales')
// import { Col } from "../Grid";


const MIDI_NUM_NAMES = scale.MIDI_NUM_NAMES
const mfv = require('../../../js/songBank/mfv')


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
      // eslint-disable-next-line
      var melodyPart = null;
      // eslint-disable-next-line
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