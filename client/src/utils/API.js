import axios from "axios";

export default {
    /////////////////////////////////
    ///////// Song API CRUD /////////
    // Create Song 
    createSong: function(songData) {
        axios.post("/api/song", songData)
    },
    // Get all Songs from database 
    getAllSongs: function() {
        return axios.get("/api/song")
    },
    // Get Song By ID
    getSongById: function(id) {
        return axios.get("/api/song/" + id)
    },
    // Update Song Info
    updateSong: function(id, songData) {
        return axios.put("/api/song/" + id, songData)
    },
    // Delete Song by ID
    deleteSong: function(id) {
        return axios.delete("/api/song" + id)
    }
};