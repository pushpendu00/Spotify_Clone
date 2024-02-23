const artistModel = require("../models/artistModel");
const songModel = require("../models/songModel");
const userModel = require("../models/userModel");
// const { verify_jwt_token } = require("../utils/jwt");

module.exports.artist = async (req,res)=>{
    try{
        // console.log(req.params.artist_id);
        const artist = await artistModel.findById({_id : req.params.artist_id});
        if(!artist){
            return res.send({
                status : 404,
                message : "Artist Not found",
            })
        }
        // const songs = await songModel.find({artist : {$regex :  artist.artist,$options : 'i'}});
        const songs = await songModel.find({artist : artist.artist});
        return res.send({
            status : 200,
            message : "Successfully",
            artist,
            songs,
        })
    }catch(err){
        // console.log(err);
        return res.send({
            status : 502,
            message : "Internal Server Error"
        })
    }
}


module.exports.follow = async (req,res)=>{
    try {
        // const {artist_id} = req.body.artist
        let updateUser = await userModel.findByIdAndUpdate({_id : req.id},{
            $pull : {
                followartist : req.body.artist_id,
            }
        });
        if(!updateUser){
            return res.send({
                status : 404,
                message : 'User not found',
            });
        }
        const user = await userModel.findById(updateUser._id);
        return res.send({
            status : 200,
            message : 'Successfully',
            user
        });
    } catch (error) {
        // console.log(error);
        return res.send({
            status : 502,
            message : 'Internal Server Error'
        })
    }
}

module.exports.unfollow = async (req,res)=>{
    try {
        const user = await userModel.findByIdAndUpdate({_id : req.id},{
            $push : {
                followartist : {$each : [req.body.artist_id],$position : 0}
            }
        });
        if(!user){
            return res.send({
                status : 404,
                message : 'User not found',
            });
        }
    // console.log(user)
        return res.send({
            status : 200,
            message : 'Successfully'
            // user
        })
    } catch (error) {
        console.log(error);
        return res.send({
            status : 502,
            message : 'Internal Server Error'
        })
    }
}


module.exports.artist_Name_to_id = async (req,res)=>{
    try {
        const artist = await artistModel.findOne({artist : req.body.artist});
        if(!artist){
            return res.send({
                status : 404,
                message : 'Artist Not Found'
            })
        }
        return res.send({
            status : 200,
            artist_id : artist._id
        })
    } catch (error) {
        // console.log(error);
        return res.send({
            status : 502,
            message : 'Internal Server Error'
        })
    }
}