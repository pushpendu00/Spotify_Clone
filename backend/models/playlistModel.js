const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    // thumbnail : {
    //     type : String,
    // },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    songs : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'song'
        }
    ],

    // Collaboraters setup leter

    // collaboraters : [
    //     {
    //         type : mongoose.Types.ObjectId,
    //         ref : 'user'
    //     }
    // ]
});

const playlistModel = mongoose.model('playlist',schema);

module.exports = playlistModel;