import React from "react";
import API from '../../../utils/API'

const songBank = require('../../../js/songBank/bank')

//-----------------------------------------------------*/
// eslint-disable-next-line
var postObj = songBank[0];
// eslint-disable-next-line
function createSong(songObj){
      API.createSong(songObj)
};


const SongPost = () => {
    return (
          <div 
                className='synth-beep' 
                onClick = {()=> console.log("songbank already imported -DGD")}>
          </div>
    );
  }
export default SongPost;