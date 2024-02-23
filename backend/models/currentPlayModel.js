const { default: mongoose } = require("mongoose");


const schema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    playSong : {
        type : mongoose.Types.ObjectId,
        ref : 'song',
    }
});


const currentPlayModel = mongoose.model('currentPlay',schema);

module.exports = currentPlayModel;