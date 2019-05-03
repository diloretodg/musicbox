import React, {Component} from "react";
import Tone from "tone";
import API from '../../../utils/API';

const scale = require('../../../js/scales')
const MIDI_NUM_NAMES = scale.MIDI_NUM_NAMES

var musicBox = null;
var bassBox = null;

class DBPlay extends Component {
    state = {
        songBook: [],
        song: 
    }

    componentDidMount(){
        this.loadSongBook()
    }

    loadSongBook(){
        API.getAllSongs()
        .then(res => this.setState({
            songBook: res.data
        }))
        .catch(err => console.log(err));
    }


    stopIt(){
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
   }

    songPlay(song){
        // resets audiocontext
        this.stopIt();
        Tone.Transport.bpm.value = 60
         
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
                musicBox.triggerAttackRelease((MIDI_NUM_NAMES[value.pitch + 60]), value.duration, time, .75)
          }, song.parts[0].notes).start(0);
            if(song.parts[1]){bassPart = new Tone.Part(function(time,value){
                bassBox.triggerAttackRelease((MIDI_NUM_NAMES[value.pitch + 60 - 12]), value.duration, time, .7)
          }, song.parts[0].notes).start(0);}
          Tone.Transport.bpm.value = this.state.songBook[0].bpm; 
          Tone.Transport.start("+0.1");
    }
    

    render(props){
        return (
            <div 
            className='synth-beep'
            onClick={() => this.songPlay(this.state.song)}
            />
        )
    }
}

export default DBPlay
