const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    nickName : {
        type : String,
        required : true,
        default : 'ME'
    },
    password : {
        type : String,
        required : true
    },
    masterPlay : {
        type : mongoose.Types.ObjectId,
        ref : 'song',
        // default : null
    },
    myplaylist : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'playlist',
        }
    ],
    followartist : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'artist',
        }
    ],
    likesong : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'song',
        }
    ]
});

const userModel = mongoose.model('user',schema);

module.exports = userModel