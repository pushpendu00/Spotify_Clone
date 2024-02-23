const artistModel = require("../models/artistModel")
const songModel = require('../models/songModel');

module.exports.search = async (req,res)=>{
    try{
        // console.log('hello');
        const artists = await artistModel.find({artist : {$regex :  req.params.searchItem,$options : 'i'}}).limit();
        const songs = await songModel.find({songTitle : {$regex :  req.params.searchItem,$options : 'i'}}).limit();
        // console.log(req.params.searchItem);
        return res.send({
            status : 200,
            artists,
            songs
        });
    }catch(err){
        return res.send({
            status : 502,
            message : "Internal Server Error"
        })
    }
}