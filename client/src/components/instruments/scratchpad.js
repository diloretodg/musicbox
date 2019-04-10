import React from "react";
import Tone from "tone";




var delayTime = 0;
var synth = null;
function playDelay(){
    var melody = ["C4","D4","E4","F4","G4","A4","B4","C5"];
    var timeMenu = document.getElementById("delay");
    delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value)/1000;
    if(!synth) {
        synth = new Tone.Synth().toMaster();
    }
    var pattern = new Tone.Pattern(function(time, note){
    //the order of the notes passed in depends on the pattern
    synth.triggerAttackRelease(note, "4n", time);
    }, melody, "alternateDown").start(0);    

    var synth2 = new Tone.Synth().toMaster();
    var pattern2 = new Tone.Pattern(function(time, note){
    //the order of the notes passed in depends on the pattern
    synth2.triggerAttackRelease(note, "4n", time);
    }, melody, "alternateDown").start(delayTime);    
    
	var tempo = 120;
    Tone.Transport.bpm.value = tempo   
    Tone.Transport.start("+0.1");
}

function updateDelayTime() {
    stopIt();
    var timeMenu = document.getElementById("delay");
    delayTime = Number(timeMenu.options[timeMenu.selectedIndex].value)/1000;
    playDelay();
}

function stopIt(){
   Tone.Transport.stop();
   Tone.Transport.cancel(0);
   if(synth) {
       synth.dispose();
       synth = null;
   }
   if(piano) {
       piano.dispose();
       piano = null;
   }
   if(kick) {
       kick.dispose();
       kick = null;
   }
   if(snare) {
       snare.dispose();
       snare = null;
   }
   if(conga) {
       conga.dispose();
       conga = null;
   }
}

function updateTempo()  {
	var tempo = document.myForm.tempo.value;
	Tone.Transport.bpm.value = tempo   
}


function updateVolume()  {
	kick.volume.value = document.myForm.volumeKick.value;
	snare.volume.value = document.myForm.volumeSnare.value;
	conga.volume.value = document.myForm.volumeConga.value;
	closedHiHat.volume.value = document.myForm.volumeHiHat.value;
}

function updateMute()  {
	var muteKickBoolean = document.myForm.muteKick.checked;
	var muteSnareBoolean = document.myForm.muteSnare.checked;
	var muteCongaBoolean = document.myForm.muteConga.checked;
	var muteHiHatBoolean = document.myForm.muteHiHat.checked;

	kickPart.mute = muteKickBoolean ? true: false;
	snarePart.mute = muteSnareBoolean ? true: false;
    congaPart.mute = muteCongaBoolean? true: false;
    hiHatPart.mute = muteHiHatBoolean? true: false;
}

/*-----------------------------------------------
//	PIANO
	var piano = new Tone.PolySynth(4, Tone.Synth, {
		"volume" : -5,
		"oscillator" : {
			"partials" : [1, 2, 5],
		},
		"portamento" : 0.006
	}).toMaster()

    function processDurationNotation(duration_array) {
        var isRest = false;
        var nextIsRest = false;
        var restValue = '';
        var t = Tone.Time("0");
        var t_array = [];
        t_array.push(t.toNotation());
        var accum = "";  // holds the accumulated time for associated note's start time (notes and durations are parallel array)  
        var rest_accum = Tone.Time("0");  // holds the current rest's accumlated time (i.e. 2 or more rests in a row)

        // the first element is the duration of the first note, but that note starts at time zero which as
        // already been added to t_array so the value of duration_array[0]
        // is the start time of notes[1] (if there aren't any rest to consider).
        // in other words duration_array[i] is setting the start time for NEXT note (i+1 of the parallel notes array)
        // this is tricky.
        for(let i=0; i<duration_array.length; i++) {

            // if the next element in the array is a rest
            if(i<(duration_array.length-2) && duration_array[i+1].includes("r") ) {
                nextIsRest = true;
            } else {
                nextIsRest = false;  
            }

            // if current loop isn't rest
            if(duration_array[i].includes("r") === false) {
                isRest = false;
                // if there is rest accumulation prior to this note the add it to accum
//                if(rest_accum.toNotation != "0") {
//                    accum = t.add( rest_accum.toNotation() );
//                }
                // add the current value to the accum
                accum = t.add(duration_array[i]);
                console.log('typeof(t.add)='+typeof(t.add) );
                console.log("t.add("+duration_array[i]+") accum.toNotation()="+accum.toNotation());
                
                // if the next element in the array isn't a rest add accum to t_array
                if( !nextIsRest ) {
                    // add accum to t_array, reset for repeat
                    t_array.push( accum.toNotation() );
                    t = Tone.Time( accum.valueOf() );
                    rest_accum.set("0");
                } else {
                    t = Tone.Time( accum.valueOf() );
                }
            } else if(duration_array[i].includes("r") === true && i===0) { // first duration is a rest
                restValue = processRestNotation(duration_array[i]);
                t = Tone.Time(restValue);
                t_array = [];
                t_array.push(t.toNotation());

            } else { // current loop is a rest
                isRest = true;
                restValue = processRestNotation(duration_array[i]);
                accum = accum.add(restValue);
                if( !nextIsRest ) {
                    t_array.push( accum.toNotation() );
                }
                t = Tone.Time( accum.valueOf() );
                restValue = "";
            }
        }
        return t_array;
    }

	function mergeDurationsAndPitch(durations, pitches) {
		if(pitches == "")
			return undefined;
	
		var melody = [];
		var time_array = processDurationNotation(durations);
		var j = 0;
		for(var i=0; i<pitches.length; i++) {
			var oneNote = {};
			// loop thru the rhythm array until the pitch array is completed.
			j = j % time_array.length; 
			rhythmValue = time_array[j];

			Object.defineProperties(oneNote, {
			  'time': {
				value: rhythmValue,
			  },
			  'note': {
				value: pitches[i],
			  },
			  'duration': {
				value: durations[i],
			  }
			});

			melody.push(oneNote);
			j++;
		}
		return melody;
	}
//-----------------------------------------------------*/
    var piano = null;
    function Maria() {
        stopIt();
		var mariaPitches = ["Eb4","A4","Bb4","Eb4","A4","Bb4","C5","A4","Bb4","C5","A4","Bb4","Bb4","A4","G4","F4","Eb4","F4","Bb4","Ab4","G4","F4","Eb4","F4","Eb4","G4",
		"Eb4","A4","Bb4","Eb4","A4","Bb4","C5","A4","Bb4","C5",
		"D5","Bb4","D5","Eb5","D5","C5","Bb4","D5","D5","Eb5","D5","C5","Bb4","D5","Eb5","F5"];
		
		var mariaDurations = ["8n","8n","2n + 4n","8n","4t","4t","4t","4t","4t","4t","8n","2n + 4n","8n","8n","8n","8n","8n","4n + 8n","8n","8n","8n","8n","8n","4n","4n","2n+4n+8n","8n","8n","2n + 4n","8n","4t","4t","4t","4t","4t","4t","8n","2n + 4n","8n","8n","8n","8n","8n","4n + 8n","8n","8n","8n","8n","8n","4n","4n","2n+4n+8n"];

        var mariaMelody = Rhythm.mergeDurationsAndPitch(mariaDurations, mariaPitches);        
        console.log(mariaMelody);
        if(!piano) {
			piano = new Tone.PolySynth(4, Tone.Synth, {
				"volume" : -5,
				"oscillator" : {
					"partials" : [1, 2, 5],
				},
				"portamento" : 0.006
			}).toMaster()
        }
        
		var melodyPart = new Tone.Part(function(time, value){
            piano.triggerAttackRelease(value.note, value.duration, time)
		}, mariaMelody ).start(0);

		//TRANSPORT
		Tone.Transport.loopStart = "0";
		Tone.Transport.loopEnd = "12:0";
		Tone.Transport.loop = false;
//	    var tempo = document.myForm.tempo.value;
        var tempo = 100;
        Tone.Transport.bpm.value = tempo   
        Tone.Transport.start("+0.2");
    
    }


var kick = null;
var snare = null;
var conga = null;
//	KICK
function makeKick() {
	var kick = new Tone.MembraneSynth({
		"volume" : -1,
		"envelope" : {
			"sustain" : 0.1,
			"attack" : 0.005,
			"decay" : 0.8
		},
		"octaves" : 5
	}).toMaster();
	return kick;
}



//	SNARE
function makeSnare() {
	var snare = new Tone.NoiseSynth({
		"volume" : -7,
		"envelope" : {
			"attack" : 0.001,
			"decay" : 0.5,
			"sustain" : 0.01,
			"release" : 0.02
		},
		"filterEnvelope" : {
			"attack" : 0.001,
			"decay" : 0.1,
			"sustain" : 0.01,
			"release" : 0.2
		}
	}).toMaster();
    return snare;
}

//  CONGA
function makeConga() {
	var conga = new Tone.MembraneSynth({
		"pitchDecay" : 0.008,
		"octaves" : 2,
		"envelope" : {
			"attack" : 0.0006,
			"decay" : 0.5,
			"sustain" : 0
		}
	}).toMaster();
	return conga;
}

	var lowPass = new Tone.Filter({
		"frequency": 14000,
	}).toMaster();

//  CLOSED HIHAT
    var closedHiHat = new Tone.NoiseSynth({
		"volume" : -14,
		"filter": {
			"Q": 1
		},
		"envelope": {
			"attack": 0.01,
			"decay": 0.15
		},
		"filterEnvelope": {
			"attack": 0.01,
			"decay": 0.03,
			"baseFrequency": 4000,
			"octaves": -2.5,
			"exponent": 4,

		}
	}).connect(lowPass);

    function getCongaPitches(patternString, corePitchesArray) {
        var patternArray = patternString.split(',');
        var count = 0;
        var pitches = [];
        for(let i=0; i<patternArray.length; i++) {
            if( parseInt(patternArray[i]) > 0) {
                pitches.push(corePitchesArray[count % corePitchesArray.length])
                count++;
            }
        }
        return pitches;
    }

    var kickPart;
    var snarePart;
    var congaPart;
    var hiHatPart;
    
    function DrumMachine() {
        console.log("DrumMachine");
    // create kick drum part
        var kickMenu = document.getElementById("someRhythmsKD");
        var kickPattern = kickMenu.options[kickMenu.selectedIndex].value;

        Rhythm.setOnlyDurationString(kickPattern, 1);
        var kickRhythm = Rhythm.getTransportCode(1);
        console.log("kickRhythm="+kickRhythm);
        if(!kick) {
            kick = makeKick();
        }
		kickPart = new Tone.Part(function(time, value){
            kick.triggerAttackRelease("A2", "8n", time)
		}, kickRhythm ).start(0, "1:0");
//---------------------------------------------------

    // create snare drum part
        var snareMenu = document.getElementById("someRhythmsSD");
        var snarePattern = snareMenu.options[snareMenu.selectedIndex].value;

        Rhythm.setOnlyDurationString(snarePattern, 2);
        var snareRhythm = Rhythm.getTransportCode(2);
        console.log("snareRhythm="+snareRhythm);
        if(!snare) {
            snare = makeSnare();
        }
		snarePart = new Tone.Part(function(time){
            snare.triggerAttack(time)
		}, snareRhythm ).start(0, "1:0");
//------------------------------------------------*/

    // create conga drum part
        var congaMenu = document.getElementById("someRhythmsCD");
        var congaPattern = congaMenu.options[congaMenu.selectedIndex].value;
        var congaTones = ["G4","Ab4","F#4"]; //,"G4","Ab4","F#4","G4","Ab4","F#4","G4","Ab4","F#4","G4","Ab4","F#4"];
        var congaPitches = getCongaPitches(congaPattern, congaTones);
        
        Rhythm.setDurationString(congaPattern, congaPitches, 3);
        var congaMelody = Rhythm.getMelodyWithRhythm(3);

        var congaRhythm = Rhythm.getTransportCode(3);

        console.log("congaRhythm="+congaRhythm);
        console.log("congaMelody="+congaMelody);
        if(!conga) {
            conga = makeConga();
        }
		congaPart = new Tone.Part(function(time, note){
            conga.triggerAttackRelease(note, "8n", time)
		}, congaMelody ).start(0, "1:0");

    // create hihat part
        var hiHatMenu = document.getElementById("someRhythmsHH");
        var hiHatPattern = hiHatMenu.options[hiHatMenu.selectedIndex].value;

        Rhythm.setOnlyDurationString(hiHatPattern, 4);
        var hiHatRhythm = Rhythm.getTransportCode(4);

//        var hiHatRhythm = Rhythm.createTransportTimeCode(hiHatArray);
        console.log("hiHatRhythm="+hiHatRhythm);

		hiHatPart = new Tone.Part(function(time){
			closedHiHat.triggerAttack(time);
		}, hiHatRhythm).start(0, "1:0");

        updateVolume();

		//TRANSPORT
		updateMute();
		Tone.Transport.loopStart = "0:0";
		Tone.Transport.loopEnd = "2:0";
		Tone.Transport.loop = true;
	    var tempo = document.myForm.tempo.value;
        Tone.Transport.bpm.value = tempo   
        Tone.Transport.start("+0.1");
    

    }

////////////////////////////Rhythm//////////////////////////
// 
// Rhythm.js
//
// functions for setting durations in Tone.js functions
//
// Tone.js has different ways to set the durations of notes.

// (1) Measure : Beat : subdivion (16th) 
// "1:0","1:1:2","1:3","2:1","2:2" (3-2 clave)

// (2) note durations:
// "d4n,d4n,4n,4nr,4n,4n,4nr" (3-2 clave)
//
// (3) time duration
// "0.75,0.75,0.5,-0.5,0.5,0.5,-0.5" (3-2 clave at 120bpm)


var Rhythm = (function() {

    //----------------------------------------
    /*  ----- overkill for my purposes -------
    //----------------------------------------
    
    const wholeNote = 384.0;
    const halfNote = 192.0;
    const halfNoteT = 128.0;
    const quarterNote = 96.0;
    const quarterNoteT = 64.0;
    const eighthNote = 48.0;
    const eighthNoteT = 32.0;
    const sixteenthNote = 24.0;
    const sixteenthNoteT = 16.0;
    const thirtysecondNote = 12.0;
    const thirtysecondNoteT = 8.0;
    const sixtyfourthNote = 6.0;
    const sixtyfourthNoteT = 4.0;
    const onehundredtwentyeigthNote = 3.0;
    const onehundredtwentyeigthNoteT = 2.0;
    ----------------------------------------*/
    
        const wholeNote = 96.0;
        const wholeNoteT = 64.0;
        const halfNote = 48.0;
        const halfNoteT = 32.0;
        const quarterNote = 24.0;
        const quarterNoteT = 16.0;
        const eighthNote = 12.0;
        const eighthNoteT = 8.0;
        const sixteenthNote = 6.0;
        const sixteenthNoteT = 4.0;
        const thirtysecondNote = 3.0;
        const thirtysecondNoteT = 2.0;
        
        // 2 count eighth note based rhythmic cells
        // 12 = eighth note, 24 = quarter note, 48 = half note etc.
        var halfNoteScalar = 48;
        var h = [48];
        var rh = [-48];
        
        var q_q = [24,24];
        var q_rq = [24,-24];
        var rq_q = [-24,24];
        
        var e_dq = [12,36];
        var re_dq = [-12,36];
        var e_rdq = [12,-36];
        
        var dq_e = [36,12];
        var rdq_e = [-36,12]
        var dq_re = [36,-12];
        
        var e_e_q = [12,12,24];
        var re_e_rq = [-12,12,-24];
        var re_e_q = [-12,12,24];
        
        var q_e_e = [24,12,12];
        var rq_e_e = [-24,12,12];
        var rq_e_re = [-24,12,-12]
        
        var e_q_e = [12,24,12];
        var e_rq_e = [12,-24,12];
        var re_q_e = [-12,24,12];
        
        var e_e_e_e = [12,12,12,12];
        var e_re_e_re = [12,-12,12,-12]
        var e_e_re_e = [12,12,-12,12];
        var re_e_re_e = [-12,12,-12,12];
        
        // 1 count sixteenth note based rhythmic cells
        // 6 = sixteenth note, 12 = eighth etc.
        var q = [24];
        var rq = [-24];
        
        var e_e = [12,12];
        var e_re = [12,-12];
        var re_e = [-12,12];
        
        var s_de = [6,18];
        var rs_de = [-6,18];
        var s_rde = [6,-18];
        
        var de_s = [18,6];
        var rde_s = [-18,6]
        var de_rs = [18,-6];
        
        var s_s_e = [6,6,12];
        var rs_s_re = [-6,6,-12];
        var rs_s_e = [-6,6,12];
        
        var e_s_s = [12,6,6];
        var re_s_s = [-12,6,6];
        var re_s_rs = [-12,6,-6]
        
        var s_e_s = [6,12,6];
        var s_re_s = [6,-12,6];
        var rs_e_s = [-6,12,6];
        
        var s_s_s_s = [6,6,6,6];
        var s_rs_s_rs = [6,-6,6,-6]
        var s_s_rs_s = [6,6,-6,6];
        var rs_s_rs_s = [-6,6,-6,6];
    
    // takes a string in the format "w,dh,h,dq,q,de,e,ds,s"
    // 1n = whole note
    // d2n = dotted half, 2n = half, 2nt = triplet half
    // d4n = dotted quarter, 4n = quarter, 4nt = quarter triplet
    // d8n = dotted eighth, 8n = eight, 8nt = eight triplet 
    // d16n = dotted sixteenth, 16n = sixteenth, 16nt = sixteenth triplet
    //
    // the string is translated into a format that can be used with Tone.js
        function processRhythm(rhythmString, meter) {
        //    var delimit1 = ","
        //    var delimit2 = "/"
            var rhythms = rhythmString.split(",");
            var timeSignature = meter.split("/");
        
        }
        
        
        var rhythmTextToNumbers = {
            "1n" : 96, 
            "d2n" : 72, "2n" : 48, "2t" : 32,
            "d4n" : 36, "4n" : 24, "4t" :  16,
            "d8n" : 18, "8n" : 12, "8t" : 8,
            "d16n" : 9, "16n" : 6, "16t" : 4,
        
            "1r" : -96, 
            "d2r" : -72, "2r" : -48, "2tr" : -32,
            "d4r" : -36, "4r" : -24, "4tr" :  -16,
            "d8r" : -18, "8r" : -12, "8tr" : -8,
            "d16r" : -9, "16r" : -6, "16tr" : -4
        };
        
        
        var numbersToRhythmText = {
            "96": "1n", 
            "72": "d2n", "48": "2n", "32": "2t",
            "36": "d4n", "24": "4n", "16": "4t",
            "18": "d8n", "12": "8n", "8": "8t",
            "9": "d16n", "6": "16n", "4": "16t",
        
            "-96": "1r", 
            "-72": "d2r", "-48": "2r", "-32": "2tr",
            "-36": "d4r", "-24": "4r", "-16": "4tr",
            "-18": "d8r", "-12": "8r", "-8": "8tr",
            "-9": "d16r", "-6": "16r", "-4": "16tr"
        };
    
    // W = double whole note
    // w = whole note
    // h = up stem half note
    // H = down stem half note
    // q = up stem quarter note
    // Q = down stem quarter note
    // e = up stem eighth note
    // E = down stem eighth note
    // x = up stem sixteenth note
    // X = down stem sixteenth note
    //
    // alt+0227 = double whole note rest
    // alt+0183 = whole note rest
    // alt+0238 = half note rest
    // alt+0206 = quarter note rest
    // alt+0228 = eighth note rest
    // alt+0197 = sixteenth note rest
    //
    // \ = barline
    
    
        var numbersToFinaleFontUpStem = {
            "96": "w", 
            "72": "h.", "48": "h", "32": "ht",
            "36": "q.", "24": "q", "16": "qt",
            "18": "e.", "12": "e", "8": "et",
            "9": "x.", "6": "x", "4": "xt",
        
            "-96": "alt+0183", 
            "-72": "alt+0238+.", "-48": "alt+0238", "-32": "alt+0238t",
            "-36": "alt+0206+.", "-24": "alt+0206", "-16": "alt+0206t",
            "-18": "alt+0228+.", "-12": "alt+0228", "-8": "alt+0228t",
            "-9": "alt+0197+.", "-6": "alt+0197", "-4": "alt+0197t"
        };
    
        var numbersToFinaleFontDownStem = {
            "96": "w", 
            "72": "H.", "48": "H", "32": "Ht",
            "36": "Q.", "24": "Q", "16": "Qt",
            "18": "E.", "12": "E", "8": "Et",
            "9": "X.", "6": "X", "4": "Xt",
        
            "-96": "alt+0183", 
            "-72": "alt+0238+.", "-48": "alt+0238", "-32": "alt+0238t",
            "-36": "alt+0206+.", "-24": "alt+0206", "-16": "alt+0206t",
            "-18": "alt+0228+.", "-12": "alt+0228", "-8": "alt+0228t",
            "-9": "alt+0197+.", "-6": "alt+0197", "-4": "alt+0197t"
        };
        
        // the rhythm notation used in Tone.js uses the following form:
        // "<measure> : <beat> : <subdivision>" 
        // each value is zero based i.e. beat 0 is what musicians think of as beat 1.
        // assuming a 4/4 meter, a steady stream of quarter starting at measure 2 is notated as follows:
        // ["1:0","1:1","1:2","1:3","2:0","2:1","2:2"...]
        // if the note is on the beat, no need to write in the subdivision (i.e. don't write 1:0:0)
        // the following is the rhythm for the keyboard part of I Wish.
        //  [["0:0:2", Dm7], ["0:1:1", Dm7], ["0:2", G13], ["0:2:3", G13], ["0:3:2", G7], 
        //  ["1:0:2", Dm7], ["1:1:1", Dm7], ["1:2", G13], ["1:2:2", G13], ["1:2:3", G7], ["1:3:2", gChord]]
        
        // [36,36,24,-24,24,24-24] each number/12 represents a duration in eight notes. numbers with minus signs are rests.
        // this should translate to 
        // "1:0","1:1:2","1:3","2:1","2:2" (3-2 clave)
        
        
        var myDurationCode1 = [];
        var myDurationCode2 = [];
        var myDurationCode3 = [];
        var myDurationCode4 = [];
        var myNoteNames1 = [];
        var myNoteNames2 = [];
        var myNoteNames3 = [];
        var myNoteNames4 = [];
        
        // used for Tonejs loopEnd value.
        var totalTime = '';
        //-----------------------------------------------------
        // -------- rhythm functions --------------------------
        //-----------------------------------------------------
        function getDurationArray(whichVoice) {
    //	    console.log("getDurationArray");
            var durationCode;
            if(whichVoice === 1) {
                durationCode = myDurationCode1;
            } else if(whichVoice === 2) {
                durationCode = myDurationCode2;
            } else if(whichVoice === 3) {
                durationCode = myDurationCode3;
            } else if(whichVoice === 4) {
                durationCode = myDurationCode4;
            } else {
                durationCode = myDurationCode1;        
            }
            return translateRhythmArrayToDurations(durationCode);
        }
    
        // whichVoice is one (not zero) indexed, AND any whichVoice value other than 1,2,3,4 will default to voice 1
        function setDurationString(durationString, noteNames, whichVoice) {
            console.log("setDurationString(): durationString="+durationString+" noteNames="+noteNames+" whichVoice="+whichVoice);
            var durationArray = adjustRhythmLength(durationString, noteNames);
            if(whichVoice === 1) {
                myDurationCode1 = durationArray;
                myNoteNames1 = noteNames;
            } else if(whichVoice === 2) {
                myDurationCode2 = durationArray;
                myNoteNames2 = noteNames;
            } else if(whichVoice === 3) {
                myDurationCode3 = durationArray;
                myNoteNames3 = noteNames;
            } else if(whichVoice === 4) {
                myDurationCode4 = durationArray;
                myNoteNames4 = noteNames;
            } else {
                myDurationCode1 = durationArray;        
                myNoteNames1 = noteNames;
           }
        }
    
        function setOnlyDurationString(durationString, whichVoice) {
            console.log("setOnlyDurationString(): durationString="+durationString+" whichVoice="+whichVoice);
            var durationArray = createArrayFromString(durationString);
            if(whichVoice === 1) {
                myDurationCode1 = durationArray;
            } else if(whichVoice === 2) {
                myDurationCode2 = durationArray;
            } else if(whichVoice === 3) {
                myDurationCode3 = durationArray;
            } else if(whichVoice === 4) {
                myDurationCode4 = durationArray;
            } else {
                myDurationCode1 = durationArray;        
           }
        }
    
        
        function getTransportCode(whichVoice) {
            var durationCode;
            var transportCode = [];
            if(whichVoice === 1) {
                durationCode = myDurationCode1;
            } else if(whichVoice === 2) {
                durationCode = myDurationCode2;
            } else if(whichVoice === 3) {
                durationCode = myDurationCode3;
            } else if(whichVoice === 4) {
                durationCode = myDurationCode4;
            } else {
                durationCode = myDurationCode1;        
            }
            var rawTransportCode = createTransportTimeCode(durationCode);
            console.log("getTransportCode(): durationCode="+durationCode+" rawTransportCode="+rawTransportCode+" whichVoice="+whichVoice);
            for(let i=0; i<rawTransportCode.length; i++) {         
                if( rawTransportCode[i].indexOf("R") === -1 ) {
                    transportCode.push(rawTransportCode[i]);
                }
            }
            return transportCode;
        }
        
        
        
        function translateRhythmArrayToDurations(rhythmArray, notes) {
            var stringArray = [];
    //        var rhythmArray = rhythmString.splice(",");
            for(var i=0; i<rhythmArray.length; i++) {
                var stringNumber = rhythmArray[i].toString();
                var duration = numbersToFinaleFontUpStem[stringNumber];
                stringArray.push(duration);  
    //            console.log("stringNumber="+stringNumber+" duration="+duration);
            }
            return stringArray;
        }
    
        function adjustRhythmLength(stringOfRhythms, pitches) {
            var arrayOfRhythms = [];
            var myStringArray = stringOfRhythms.split(",");
            for(var i=0; i<myStringArray.length; i++) {
                arrayOfRhythms.push(parseInt(myStringArray[i]));
            }
            var rhythmLength = 0;
            var diff_length = 0;
            var i;
            var r_array = arrayOfRhythms;
            for(i=0; i<arrayOfRhythms.length; i++) {
                if(arrayOfRhythms[i] > 0)
                    rhythmLength++;
            }
        //    console.log("pitches.length="+pitches.length+" rhythmLength="+rhythmLength);
    //		console.log("pitches="+pitches+" arrayOfRhythms="+arrayOfRhythms);
            if(pitches.length !== rhythmLength) {
                diff_length = pitches.length - rhythmLength;
            }
            if(diff_length > 0) { 
                var num = Math.round(diff_length / rhythmLength)
        //        console.log("num="+num);
                for(i=0; i<=num; i++) {
                    r_array = r_array.concat(arrayOfRhythms);
                }
            }
        //    console.log("r_array="+r_array);
            
            // now slice the r_array to the same length as pitches.length
            r_array = r_array.slice(0,pitches.length);
    //	    console.log("r_array="+r_array);
            return r_array;
        }
    
        function createArrayFromString(string) {
            var myArray = [];
            var myStringArray = string.split(",");
            for(var i=0; i<myStringArray.length; i++) {
                myArray.push(parseInt(myStringArray[i]));
            }
            return myArray;
        }
        
        function createStringArrayFromString(string) {
            var myArray = [];
            return string.split(",");
        
            var myStringArray = string.split(",");
            for(var i=0; i<myStringArray.length; i++) {
                myArray.push(myStringArray[i]);
            }
            return myArray;
        }
    
    
        function getMelodyWithRhythm(whichVoice)  {
            var durationCode;
            var notes;
            if(whichVoice === 1) {
                durationCode = myDurationCode1;
                notes = myNoteNames1;
            } else if(whichVoice === 2) {
                durationCode = myDurationCode2;
                notes = myNoteNames2;
            } else if(whichVoice === 3) {
                durationCode = myDurationCode3;
                notes = myNoteNames3;
            } else if(whichVoice === 4) {
                notes = myNoteNames4;
                durationCode = myDurationCode4;
            } else {
                durationCode = myDurationCode1;        
                notes = myNoteNames1;
            }
    //        console.log("getMelodyWithRhythm(): durationCode="+durationCode);
            return createMelodyWithRhythm(durationCode, notes)
        }
    
        function createMelodyWithRhythm(arrayOfRhythms, pitches) {
            var r_array = arrayOfRhythms;
    
    //------------------- adjustRhythmLength() step -----------------------       
            // NOTE: this step is now done by adjustRhythmLength() called before this function
            // leaving it here for safety
            // check to see if pitches.length equals 
            // adjusted arrayOfRhythms.length
            // (don't count the negative values of arrayOfRhythms)
            // if arrayOfRhythms is shorter, append a copy of itself 
            // to be at least the length of pitches.length
            var rhythmLength = 0;
            var diff_length = 0;
            var i;
            for(i=0; i<arrayOfRhythms.length; i++) {
    //		    console.log("arrayOfRhythms["+i+"]="+arrayOfRhythms[i])
                if(arrayOfRhythms[i] > 0)
                    rhythmLength++;
            }
    //        console.log("pitches.length="+pitches.length+" rhythmLength="+rhythmLength);
    //		console.log("pitches="+pitches+" arrayOfRhythms="+arrayOfRhythms);
            if(pitches.length !== rhythmLength) {
                diff_length = pitches.length - rhythmLength;
            }
            if(diff_length > 0) { 
                var num = Math.round(diff_length / rhythmLength)
        //        console.log("num="+num);
                for(i=0; i<=num; i++) {
                    r_array = r_array.concat(arrayOfRhythms);
                }
                r_array = r_array.slice(0,pitches.length);
    //	        console.log("r_array="+r_array);
            }
    //------------------- end adjustRhythmLength() step -----------------	    
    
    // hmm, can we set this here?
    //		myDurationCode1 = r_array;
    
            var rhythms = createTransportTimeCode(r_array);
    /*-----------------------------------------------		
            var rhythms;
            if( checkArrayRhythms(r_array, 12) ) {
                rhythms = createRhythmWithEighths(r_array);
            } else if( checkArrayRhythms(r_array, 6) ) {
                rhythms = createRhythmWithSixteenths(r_array);
            } else {
                return; // we can't deal with anything else yet.
            }
    //---------------------------------------------------*/
            console.log("rhythms="+rhythms);
            return mergeRhythmAndPitch(rhythms, pitches);
        }
    
        function createTransportTimeCode(arrayOfNumbers) {
            var rhythms;
            if( checkArrayRhythms(arrayOfNumbers, 12) ) {
                rhythms = createRhythmWithEighths(arrayOfNumbers);
            } else if( checkArrayRhythms(arrayOfNumbers, 6) ) {
                rhythms = createRhythmWithSixteenths(arrayOfNumbers);
            } else {
                return; // we can't deal with anything else yet.
            }
            return rhythms;
        
        }
        
        function createRhythmWithEighths(arrayOfRhythms) {
            console.log("createRhythmWithEighths()");
            var quartersPerMeasure = 4;
            var eighthsPerMeasure = 8;
            var eighthsPerQuarter = 2;
            var measure = 1;
            var eighths = 0;
            var quarters = 0;
            var measureStamp;
            var timeCode = [];
            for(var i=0; i<arrayOfRhythms.length; i++) {
                measureStamp = "";
                if(arrayOfRhythms[i] < 0) {
                    measureStamp += "R";
                    eighths = Math.abs(eighths);
        //            console.log("(-1) eighths="+eighths);
                }
                if(eighths >= eighthsPerMeasure) {
                    measure += Math.floor(eighths/eighthsPerMeasure);
                    eighths = eighths % eighthsPerMeasure;
                }
                if(eighths >= eighthsPerQuarter) {
                    quarters += Math.floor(eighths/eighthsPerQuarter);
                    eighths = eighths % eighthsPerQuarter;
                }
                if(quarters >= quartersPerMeasure) {
                    measure += Math.floor(quarters/quartersPerMeasure);
                    quarters = quarters % quartersPerMeasure;
                }
                measureStamp += ""+ measure +":"+ quarters; // start with "" so numbers will use toString()
                if(eighths > 0)
                    measureStamp += ":"+ eighths*2; // subdivision is sixteen note, thus "eighths*2"
                    
                timeCode.push(measureStamp);
        //        console.log("measureStamp="+measureStamp);
                eighths += Math.round(Math.abs(arrayOfRhythms[i])/eighthNote);	
    //			eighths = Math.abs(eighths);
        
        //        console.log("() eighths="+eighths);
            }
            return timeCode;
        }
        
        function createRhythmWithSixteenths(arrayOfRhythms) {
            console.log("createRhythmWithSixteenths()");
            var beatsPerMeasure = 4;
            var sixteenthsPerBeat = 4;
            var measure = 1;
            var quarters = 0;
            var subdivision = 0
            var measureStamp = "";
            var timeCode = [];
            for(var i=0; i<arrayOfRhythms.length; i++) {
                measureStamp = "";
                if(arrayOfRhythms[i] < 0) {
                    measureStamp += "R";
                    quarters = Math.abs(quarters);
                }
                if(subdivision >= sixteenthsPerBeat) {
                    quarters += Math.floor(subdivision/sixteenthsPerBeat);
                    subdivision = subdivision % sixteenthsPerBeat;
                }
                if(quarters >= beatsPerMeasure) {
                    measure += Math.floor(quarters/beatsPerMeasure);
                    quarters = quarters % beatsPerMeasure;
                }
                measureStamp += ""+ measure +":"+ quarters; // start with "" so numbers will use toString()
                
                if(subdivision>0)
                    measureStamp += ":" + subdivision;
                    
                timeCode.push(measureStamp);
                console.log(measureStamp);
                quarters += Math.floor(Math.abs(arrayOfRhythms[i])/quarterNote);
    //            quarters = Math.abs(quarters);
                subdivision += Math.round( (Math.abs(arrayOfRhythms[i]) % quarterNote)/sixteenthNote );
    //			subdivision = Math.abs(subdivision);
    
            }
            return timeCode;
        }
        
        function mergeRhythmAndPitch(rhythms, pitches) {
            if(pitches === "" || pitches === undefined || pitches === [])
                return undefined;
        
            var melody = [];
            var pair = [];
            var rhythmValue;
            var isRest = false;
            var j = 0;
    //	    console.log("mergeRhythmAndPitch(): pitches"+pitches);
            for(var i=0; i<pitches.length; i++) {
                pair = [];
                // loop thru the rhythm array until the pitch array is completed.
                j = j % rhythms.length; 
                rhythmValue = rhythms[j];
                if( rhythmValue.indexOf("R") !== -1 ) {
                    rhythmValue = rhythmValue.slice(1);
                    isRest = true;
                }
                if(isRest) {
                    isRest = false;
                    j++;
                    continue;        
                } else {
                    pair.push(rhythmValue);
                    pair.push(pitches[i]);
                }
    //	        console.log(pair);
                melody.push(pair);
                isRest = false;
                j++;
            }
    //		console.log("melody="+melody);
            return melody;
        }
        
        // [18,18,18,18,12,12] each number/6 represents a duration in sixteenth notes. number with minus signs are rests.
        // this should translate to 
        // "1:0","1:0:3","1:1:2","1:2:1","1:3","1:3:2"
        
        // eighth and 2 sixteenth x2 [12,6,6,12,6,6]
        // "1:0","1:0:2","1:0:3","1:1","1:1:2","1:1:3"
        
        // sixteenth, eighth, sixteenth x2 [6,12,6,6,12,6]
        // "1:0","1:0:1","1:0:3","1:1","1:1:1","1:1:3"
        
        // 2 sixteenth and eighth x2 [6,6,12,6,6,12]
        // "1:0","1:0:1","1:0:2","1:1","1:1:1","1:1:2"
        
        
        
        function checkArrayRhythms(array, minDuration) {
            for(var i=0; i<array.length; i++) {
        //        console.log("array["+i+"]="+ array[i] +" minDuration="+minDuration);
                if( array[i] % minDuration !== 0)
                    return false;
            }
            return true;
        }
        
        function clearRhythmGrid() {
            var beatsPerMeasure = 4;
            var number = beatsPerMeasure * 4 * 4;
            for(var i=0; i<(number+number); i++) {
                document.getElementById(i).checked = false;
            }
        }
        
        function buildRhythmGrid(beatsPerMeasure) {
            var html = "Inst 1:<input type=\"text\" size=\"80\" id=\"inputNotes1\"><br />";
            var number = beatsPerMeasure * 4 * 4;
            var measure = 1;
            var beat = 0;
            var subdivision = 0;
            var rhythmCode = "";
            var displayCode = "";
            for(var i=0; i<number; i++) {
                rhythmCode = '' + measure +':'+ beat;
                displayCode = '' + measure +':'+ (beat+1);
                if(subdivision > 0)
                    rhythmCode += ':' + subdivision;
                displayCode += ':' + (subdivision+1);        
                html += '<label>'+ displayCode + '<input type="checkbox" id="'+ i + '" value="'+ rhythmCode +'">';
                html += '</label> '
                subdivision++;
                if(subdivision % 4 === 0) {
                    beat++;
                    html += "| ";
                }
                subdivision = subdivision % 4;
                if(beat % beatsPerMeasure === 0 && beat > 0) {
                    measure++;
                    beat = 0;
                    html += '<br />';
                }
            }
            html += "Inst 2:<input type=\"text\" size=\"80\" id=\"inputNotes2\"><br />";
            measure = 1;
            beat = 0;
            subdivision = 0;
            for(i=0; i<number; i++) {
                rhythmCode = '' + measure +':'+ beat;
                displayCode = '' + measure +':'+ (beat+1);
                if(subdivision > 0)
                    rhythmCode += ':' + subdivision;
                displayCode += ':' + (subdivision+1);        
                html += '<label>'+ displayCode + '<input type="checkbox" id="'+ (i+number) + '" value="'+ rhythmCode +'">';
                html += '</label> '
                subdivision++;
                if(subdivision % 4 === 0) {
                    beat++;
                    html += "| ";
                }
                subdivision = subdivision % 4;
                if(beat % beatsPerMeasure === 0 && beat > 0) {
                    measure++;
                    beat = 0;
                    html += '<br />';
                }
            }
            return html;
        }
        
        
        function makeRhythmFromCheckboxes(offset) {
            var number = 64;
            var rhythmCode = "";
            var durationCode = "";
            var isFirst = true;
            var isFirstDuration = true;
            var box;
            var lastCheckbox = 0;
            var durationDistance = 0;
            var totalDuration = 0;
            var remainder = 0;
            var lastDuration = 0;
            for(var i=(0+offset); i<(number+offset); i++) {
                box = document.getElementById(i);
                if(box.checked) {
                    if( i > (0+offset) ) {
                        durationDistance = (i-offset) - lastCheckbox;
                        if(!isFirstDuration)
                            durationCode += ",";
                        totalDuration += durationDistance*6;
                        durationCode += "" + durationDistance*6;
                        isFirstDuration = false; 
                    }
                    
                    if(!isFirst)
                        rhythmCode += ",";
                    rhythmCode += box.value;
                    isFirst = false;
                    lastCheckbox = (i-offset);
                }
            }
            // calculate last duration to complete final measure
            var remainder = totalDuration % 24;
            lastDuration = quarterNote - remainder;
            if(durationCode !== '') {
                durationCode += ","+ lastDuration;
                if(offset === 0 )
                    myDurationCode1 = durationCode;
                else
                    myDurationCode2 = durationCode;
            }
            return durationCode;
        }
        
        function calcLoopEnd(measureBeatSubdivision, meter) {
        //     var meter = 4; // one indexed, like musician's brain
            var beatArray = measureBeatSubdivision.split(":");
            var measure = Number( beatArray[0] );
            var beat = Number( beatArray[1] ); // zero indexed, i.e. 0 = first beat.
            if(beatArray.length > 2) {
                var remainder = Number(beatArray[2]) % 4;
                if( (remainder > 0) && ((beat+1) < meter) ) {
        //			beat++;
                    measure++;
                    beat = 0;
                } else if(remainder > 0) {
                    measure++;
                    beat = 0;
                }
            } else {
                if( (beat+1) < meter ) {
        //			beat++;
                    measure++;
                    beat = 0;
                } else {
                    measure++;
                    beat = 0;
                }
            }
            return "" + measure + ":" + beat;
        }
        
        function calcLoopEndBeat(measureBeatSubdivision, meter) {
        //     var meter = 4; // one indexed, like musician's brain
            var beatArray = measureBeatSubdivision.split(":");
            var measure = Number( beatArray[0] );
            var beat = Number( beatArray[1] ); // zero indexed, i.e. 0 = first beat.
            if(beatArray.length > 2) {
                var remainder = Number(beatArray[2]) % 4;
                if( (remainder > 0) && ((beat+1) < meter) ) {
                    beat++;
                } else if(remainder > 0) {
                    measure++;
                    beat = 0;
                }
            } else {
                if( (beat+1) < meter ) {
                    beat++;
                } else {
                    measure++;
                    beat = 0;
                }
            }
            return "" + measure + ":" + beat;
        }
    
    //----------------------------------------------------------
    // working with arrays of duration notation
    //----------------------------------------------------------
    
    // processDurationNotation()
    //    parameter: duration_array - array of duration notation i.e. ['4n','8n','8n','4n+8n','8n']
    //
    //    returns array of duration notation that is cumulative of the input array 
    //      suitable for use of time parameter with synth.triggerAttackRelease() 
    //      i.e. processDurations(['4n','8n','8n','4n+8n','8n']) returns ["0", "4n", "4n + 8n", "2n", "2n + 4n + 8n", "1m"]
    //
    
    //    function processDurationNotation(duration_array) {
        function processDurationNotation(duration_array, startTime) {
            if(startTime == undefined)
                var myStartTime = "0";
            else
                var myStartTime = startTime;
            
            var nextIsRest = false;
            var restValue = '';
    //        var t = Tone.Time("0");  // holds the current accumulated time
            var t = Tone.Time(startTime);  // holds the current accumulated time
            var t_array = [];
            t_array.push(t.toNotation());
            var accum = "";  // holds the accumulated time for associated note's start time (notes and durations are parallel array)  
    
            // the first element is the duration of the first note, but that note starts at time zero which as
            // already been added to t_array so the value of duration_array[0]
            // is the start time of notes[1] (if there aren't any rest to consider).
            // in other words duration_array[i] is setting the start time for NEXT note (i+1 of the parallel notes array)
            // this is tricky.
            for(let i=0; i<duration_array.length; i++) {
    //            console.log('duration_array['+i+']='+duration_array[i]);
                // check if the next element in the array is a rest
                if(i<(duration_array.length-2) && duration_array[i+1].includes("r") ) {
                    nextIsRest = true;
                } else {
                    nextIsRest = false;  
                }
    
                // if current loop isn't rest (it's a note)
                if(duration_array[i].includes("r") === false) {
                    accum = t.add(duration_array[i]);
    //                console.log("NOTE accum.toNotation()="+accum.toNotation()+" duration_array["+i+"]="+duration_array[i]);
                    if( !nextIsRest ) {
                        // add accum to t_array, reset for repeat
                        t_array.push( accum.toNotation() );
    //                    console.log("NOTE !nextIsRest: t_array.push(accum.toNotation())="+accum.toNotation()+" duration_array["+i+"]="+duration_array[i]);
                    }
                    t = Tone.Time( accum.valueOf() );   
                }
                else { // current loop is a rest
                    restValue = processRestNotation(duration_array[i]);
                    accum = t.add(restValue);
    //                console.log("REST accum.toNotation()="+accum.toNotation()+" duration_array["+i+"]="+duration_array[i]);
                    if(i===0) { // if the first duration is a rest, clear t_array
                        t_array = [];				
                    }
                    if( !nextIsRest ) {
                        // add accum to t_array, reset for repeat
                        t_array.push( accum.toNotation() );
    //                    console.log("REST !nextIsRest: t_array.push(accum.toNotation())="+accum.toNotation()+" duration_array["+i+"]="+duration_array[i]);
                    }
                    t = Tone.Time( accum.valueOf() );
                }            
            }
    //        console.log("t_array="+t_array);
            return t_array;
        }
    
    
        // this function removes the 'r' from rest notation
        function processRestNotation(restNotationValue) {
            var restValue = "";
            for(let i=0; i<restNotationValue.length; i++) {
                if(restNotationValue.charAt(i)  !== "r")
                    restValue += restNotationValue.charAt(i);
            }
            return restValue;
        }
    
        function removeRestsFromDurations(duration_array) {
            var newDurations = [];
            for(let i=0; i<duration_array.length; i++) {
                if(duration_array[i].includes("r") === false) {
                    newDurations.push(duration_array[i]);
                }
            }
            return newDurations;
        }
    
    // mergeDurationsAndPitch()
    //    parameters: durations - array of duration notation i.e. ['4n','8n','8n','4n+8n','8n']
    //                pitches - parallel array of the note names for each duration i.e. ['A4','C5','C#5','E5','G#4']
    //
    //    returns array of noteObjects (with three attributes) used in Tone.Part(function(time, value){ }, noteObjects );
    //      time = t_array[i] - returned from processDurations(durations)
    //      note  = pitches[i]
    //      duration = durations[i]
    //
    //      NOTE:  The note and duration are unpacked in the callback function as value.note and value.duration
    //             and are used as parameter to the function synth.triggerAttackRelease(value.note, value.duration, time)
    //
        function mergeDurationsAndPitch(durations, pitches, startTime) 
        
        {
            if(pitches == "")
                return undefined;
            if(startTime == undefined)
                var myStartTime = "0";
            else
                var myStartTime = startTime;
        
            var melody = [];
            var rhythmValue;
            var time_array = processDurationNotation(durations, myStartTime);
    //		console.log('time_array='+time_array);
            var myDurations = removeRestsFromDurations(durations);
            var j = 0;
            for(var i=0; i<pitches.length; i++) {
                // loop thru the rhythm array until the pitch array is completed.
                j = j % time_array.length; 
                rhythmValue = time_array[j];
    
    //            console.log('typeof(pitches['+i+'])='+typeof(pitches[i]));
                // if pitches[i] is a single note just add the one note object
                if(typeof(pitches[i]) == 'string') {
                    var oneNote = {};
                    Object.defineProperties(oneNote, {
                      'time': {
                        value: rhythmValue,
                      },
                      'note': {
                        value: pitches[i],
                      },
                      'duration': {
                        value: myDurations[i],
                      }
                    });
    //				console.log('SINGLE NOTE i='+i+', oneNote='+oneNote);
                    melody.push(oneNote);
                } else {
                    // if pitches[i] is array do a loop over pitches[i].length
                    var chordLength = pitches[i].length;
                    for(var index=0; index < chordLength; index++) { 
                        var oneNote = {}; 
                        Object.defineProperties(oneNote, {
                          'time': {
                            value: rhythmValue,
                          },
                          'note': {
                            value: pitches[i][index],
                          },
                          'duration': {
                            value: myDurations[i],
                          }
                        });
    //					console.log('CHORD: i='+i+', oneNote['+index+'].time='+oneNote.time+' oneNote['+index+'].note='+oneNote.note+' oneNote['+index+'].duration='+oneNote.duration);
                        melody.push(oneNote);
                    }
                }
    
                j++;
                lastDuration = myDurations[i];
            }
            totalTime = rhythmValue + " + " + lastDuration;
            return melody;
        }
    
        // velocity is optional, default = 0.7 (1.0 max)
        function mergeDurationVelocityAndPitch(durations, pitches, velocity, startTime) {
            if(pitches == "")
                return undefined;
    
            var myStartTime;
            if(startTime == undefined)
                myStartTime = "0";
            else
                myStartTime = startTime;
        
            var melody = [];
            var rhythmValue;
            var velocityValue;
            var time_array = processDurationNotation(durations, myStartTime);
            var myDurations = removeRestsFromDurations(durations);
            var j = 0;
            for(var i=0; i<pitches.length; i++) {
                var oneNote = {};
                // loop thru the rhythm array until the pitch array is completed.
                j = j % time_array.length; 
                rhythmValue = time_array[j];
                velocityValue = (velocity !== undefined && velocity !== 0) ? velocity[i] : 0.7; 
    //            velocityValue = (velocity !== undefined) ? velocity[i] : 0.7; 
    //            console.log('time_array['+j+']='+time_array[j]);
    
    /*
                Object.defineProperties(oneNote, {
                  'time': {
                    value: rhythmValue,
                  },
                  'note': {
                    value: pitches[i],
                  },
                  'duration': {
                    value: myDurations[i],
                  },
                  'velocity': {
                    value: velocityValue,
                  }
                });
                melody.push(oneNote);
    */
    
    //            console.log('typeof(pitches['+i+'])='+typeof(pitches[i]));
                // if pitches[i] is a single note just add the one note object
                if(typeof(pitches[i]) == 'string') {
                    var oneNote = {};
                    Object.defineProperties(oneNote, {
                      'time': {
                        value: rhythmValue,
                      },
                      'note': {
                        value: pitches[i],
                      },
                      'duration': {
                        value: myDurations[i],
                      },
                      'velocity': {
                        value: velocityValue,
                      }
                    });
    //				console.log('SINGLE NOTE i='+i+', oneNote='+oneNote);
                    melody.push(oneNote);
                } else {
                    // if pitches[i] is array do a loop over pitches[i].length
                    for(var index=0; index<pitches[i].length; index++) { 
                        var oneNote = {};
                        Object.defineProperties(oneNote, {
                          'time': {
                            value: rhythmValue,
                          },
                          'note': {
                            value: pitches[i][index],
                          },
                          'duration': {
                            value: myDurations[i],
                          },
                          'velocity': {
                            value: velocityValue,
                          }
                        });
    //					console.log('CHORD: i='+i+', oneNote['+index+'].time='+oneNote.time+' oneNote['+index+'].note='+oneNote.note+' oneNote['+index+'].duration='+oneNote.duration);
                        melody.push(oneNote);
                    }
                }
    
                j++;
                lastDuration = myDurations[i];
    //			console.log("oneNote,time="+oneNote.time);
            }
            totalTime = rhythmValue + " + " + lastDuration;
            return melody;
        }
    
        function getTotalTime() {
            return totalTime;
        }
    
        return {
            adjustRhythmLength: adjustRhythmLength,
            makeRhythmFromCheckboxes: makeRhythmFromCheckboxes,
            calcLoopEndBeat: calcLoopEndBeat,
            calcLoopEnd: calcLoopEnd,
            createMelodyWithRhythm: createMelodyWithRhythm,
            getTransportCode: getTransportCode,
    //		createTransportTimeCode: createTransportTimeCode,
            clearRhythmGrid: clearRhythmGrid,
            buildRhythmGrid: buildRhythmGrid,
            setOnlyDurationString: setOnlyDurationString,
            setDurationString: setDurationString,
            getDurationArray: getDurationArray,
            getMelodyWithRhythm: getMelodyWithRhythm,
            mergeDurationsAndPitch: mergeDurationsAndPitch,
            mergeDurationVelocityAndPitch: mergeDurationVelocityAndPitch,
            createArrayFromString: createArrayFromString,
            createStringArrayFromString: createStringArrayFromString,
            getTotalTime: getTotalTime
        };
    
    })();
    
    
    //-----------------------------------------------------
    // -------- end rhythm functions --------------------------
    //-----------------------------------------------------
    // The Beat Goes On
    // Bb2,Ab2,F2,Ab2,Bb2,Bb2,Ab2,F2,Ab2
    
    // Beethoven 5th
    // C4,Eb4,Eb4,D4,D4,F4,F4,E4,E4,G4,G4,F4,F4,Ab4,Ab4,G4,G4,Bb4,Bb4,Ab4,Ab4,C5,C5,B4,B4,D5,D5,C5,C5
    
    // In the Hall of the Mountain King
    // E3,F#3,G3,A3,B3,G3,B3,Bb3,Gb3,Bb3,A3,F3,A3,E3,F#3,G3,A3,B3,G3,B3,E4,D4,B3,G3,B3,D4,E3,F#3,G3,A3,B3,G3,B3,Bb3,Gb3,Bb3,A3,F3,A3,E3,F#3,G3,A3,B3,G3,B3,E4,D#4,B3,D#4,F#4,E4
    
    // Joy to the World
    // A4,G#4,F#4,E4,D4,C#4,B3,A3,E4,F#4,F#4,G#4,G#4,A4
    // A4 G#4 F#4 E4 D4 C#4 B3 A3 E4 F#4 F#4 G#4 G#4 A4
    
    // Birthday
    // A3,A3,C#4,E4,G4,F#4,E4,A3,D4,D4,F#4,A4,C5,B4,A4,D4,A3,A3,C#4,E4,G4,F#4,E4,A3,E4,E4,G#4,B4,D5,C#5,B4,E4
    
    // Funk bassline
    // C3,E2,F2,F#2,G2,A2,Bb2,B2,C3
    // G5,A5,Eb5,D5,Eb5,D5,C5,A4,C5,A4,G4,A4,C5,A4,C5,D5,Eb5,D5,C5,A4,C5
    
    // Sunshine of Your Love
    // D3,D3,C3,D3,A2,Ab2,G2,D3,F3,D3
    
    // Minor Montuno
    // G4,Eb4,C4,Eb4,Ab4,Eb4,C4,Eb4,Ab4,A4,Eb4,C4,Eb4,Ab4,Eb4,C4,Eb4,F4,F#4
    
    // Minor Riff
    // B2,D3,F#3,G3,F3,F#3,E3,F3,F#3,D3,B2,F#2,F#2,F2,F#2,G2,G#2,A2,A#2
    
    // turnaround ending
    // C4,Bb4,A4,Ab4,G4,G4,A4,B4,C5,E4,Bb4,E4,Bb4
    // C2,E2,F2,F#2,G2,F2,E2,D2,C2,C2,C3,C2,C3
    
    // Whiter Shade of Pale
    // E4,E4,D4,C4,B3,C4,D4,E4,C4,A4,B4,C5,F4,E4,F4,D4,B4,C5,D5,G4,F4,G4,F4,F4,E4,D4,C4,A4,D4,E4,F4,G4,B3,C4,D4,F4,E4,D4,C4
    // C3,C3,B2,B2,A2,A2,G2,G2,F2,F2,E2,E2,D2,D2,C2,C2,G2,G2,F2,F2,E2,E2,D2,D2,C2,C2,F2,F2,E2,E2,G2,G2
    
    // Birdland
    // Bb4,A4,Bb4,A4,G4,E4,G4,E4,G4,A4,Bb4,A4,G4,E4,D4,G4,Bb4,A4,Bb4,A4,G4,E4,G4,E4,G4,A4,Bb4,A4,G4,E4,D4,B3
    // B1,C2,D2,B1,C2,C#2,D2,G2,B1,C2,D2,B1,C2,C#2,D2,G2