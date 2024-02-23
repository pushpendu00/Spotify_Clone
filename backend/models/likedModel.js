const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name : {
        type : String
    },
    thumbnail : {
        type : String
    },
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
})

const likedModel = mongoose.model('like',schema);

module.exports = likedModel;