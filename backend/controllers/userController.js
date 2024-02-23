
const currentPlayModel = require('../models/currentPlayModel');
const userModel = require('../models/userModel');
const { verify_jwt_token } = require('../utils/jwt');



//** user details */
module.exports.user = async(req,res)=>{
    try{
        const {token} = req.body;
        // console.log("token - ",token);
        let U = await verify_jwt_token(token);
        const user = await userModel.findById({_id : U.userId}).populate('masterPlay').populate('followartist').populate('likesong');
        // console.log(user);
        if(!user){
            return res.send({
                message : "User not found",
                status : 404
            })
        }
        // console.log(user);
        // const currentPlay = await currentPlayModel.findOne({user : user._id});
        return res.send({
            user,
            // currentPlay : user.currentPlay,
            status : 200
        })
    }catch(err){
        console.log(err);
        return res.send({
            message : "Technical Error",
            status : 502
        })
    }
}


/**
 *    current play song
 */


module.exports.getmasterPlay = async (req,res)=>{
    try{
        const {token}= req.body;
        let U = await verify_jwt_token(token);
        const response = await userModel.findById({_id : U.userId}).populate("song");
        // Successfully change current song on 
        console.log(response);
        return res.send({
            message : "Successfully",
            status : 200,
        })
    }catch(err){
        return res.send({
            message : "Technical Error",
            status : 502
        })
    }
}


module.exports.setmasterPlay = async (req,res)=>{
    try{
        const {token,songId}= req.body;
        let U = await verify_jwt_token(token);
        const response = await userModel.findByIdAndUpdate({_id : U.userId},{
            masterPlay : songId
        }).populate('masterPlay');
        // console.log(response);
        // Successfully change current song on
        return res.send({
            message : "Successfully",
            response,
            status : 200,
        })
    }catch(err){
        return res.send({
            message : "Technical Error",
            status : 502
        })
    }
}


module.exports.setmasterPlay


