const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const soundSchema = new Schema({
    attType: String,
    attValues: [{
        name: String, 
        value: Number
    }]
})
const instrumentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    voiceType: {
        type: String,
        default: 'Synth'
    },
    soundAttributes: [soundSchema]
}) 

const Instrument = mongoose.model("Instrument", instrumentSchema);
module.exports = Instrument;
