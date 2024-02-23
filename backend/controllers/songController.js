const userModel = require('../models/userModel');

module.exports.like = async (req,res)=>{
    try {
        // console.log();
        const {song_id,isLike} = req.body;
        // console.log(song_id);
        if(isLike){
            await userModel.findByIdAndUpdate({_id : req.id},{
                $push : {
                    likesong : {$each : [song_id],$position : 0}
                }
            });
            // const user = await userModel.findById(updateUser._id);
            return res.send({
                status : 200,
                message : "Liked",
                // user,
            });
        }else{
            await userModel.findByIdAndUpdate({_id : req.id},{
                $pull : {
                    likesong : song_id
                }
            })
            return res.send({
                status : 202,
                message : "Remove Liked"
            });
        }
    } catch (error) {
        return res.send({
            status : 502,
            message : "Internal Server Error!"
        });
    }
}