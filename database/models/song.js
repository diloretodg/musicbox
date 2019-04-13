const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    pitch: {
        type: Number,
        requred: true
    },
    duration: {
        type: Number,
        requred: true
    },
    time: {
        type: Number,
        requred: true
    }
});

const partSchema = new Schema({
    partType:{
        type: String,
        default: 'Melody'
    },
    notes: [noteSchema]
});

const songSchema = new Schema({
    name: {
        type: String,
    },
    bpm: {
        type: Number,
        default: 120
    },
    ref: {
        type: Number,
        default: 60
    },
    parts: [partSchema]
    ,
})

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
