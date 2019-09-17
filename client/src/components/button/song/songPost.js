import React from "react";
import API from '../../../utils/API'

const songBank = require('../../../js/songBank/bank')

//-----------------------------------------------------*/
// eslint-disable-next-line
var postObj = songBank[1];
// eslint-disable-next-line
function createSong(songObj){
      API.createSong(songObj)
};


const SongPost = () => {
    return (
          <div 
                className='synth-beep' 
                onClick = {()=> createSong(postObj)}>
          </div>
    );
  }
export default SongPost;