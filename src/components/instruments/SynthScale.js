import React from "react";
import Tone from "tone";
// import { Col } from "../Grid";




const SynthScale = (props) => {
  const synth = new Tone.Synth().toMaster()
  return (
        <div className='synth-scale' >
            {props.scale.map((note,index)=>{
                var key = note.split('')
                return(
                    <div 
                        className= {key[1] === 'b' ? (key[0] + ' flat synth-beep') : (key[0] + ' synth-beep')}
                        key= {index}
                        note= {note} {...props} onClick = {()=>synth.triggerAttackRelease(note || "C4", props.subdevision||'8n')}>
                    </div>
                )
            })}
        </div>
  );
}
export default SynthScale;