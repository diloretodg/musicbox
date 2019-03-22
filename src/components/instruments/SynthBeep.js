import React from "react";
import Tone from "tone";


const SynthBeep = (props) => {
  const synth = new Tone.Synth().toMaster()
  return (
    <div {...props} className={props.className}onClick = {()=>synth.triggerAttackRelease(props.note || "C4", '8n')}>
      
    </div>
  );
}
export default SynthBeep;