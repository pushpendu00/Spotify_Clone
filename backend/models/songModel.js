const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    songTitle : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : true
    },
    songUrl : {
        type : String,
        required : true
    },
    tags : {
        type : String,
    },
    genre : {
        type : String
    },
    year : {
        type : Number
    },
    duration : {
        type : Number,
        required : true
    }
});

const songModel = mongoose.model('song',schema);

module.exports = songModel;