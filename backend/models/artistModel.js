
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    artist : {
        type : String,
    },
    avatar : {
        type : String,
    }
},{timestamps : true});

const artistModel = mongoose.model('artist',schema);

module.exports = artistModel;