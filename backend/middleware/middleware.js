
const {verify_jwt_token} = require('../utils/jwt');
const userModel = require('../models/userModel');

const middleware = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        // console.log(token)
        if(!token){
            return res.status(200).send({
                message : "Token not found"
            })
            // return res.redirect('/login');
        }
        let user = await verify_jwt_token(token);
        let authUser = await userModel.findById({_id : user.userId});
        if(!authUser){
            return res.status(404).send({
                message : "User not found"
            })
            // return res.redirect('/register');
        }
        req.id = authUser._id;
        // console.log("user page access");
        next();
    }catch(err){
        console.log(err);
        return res.send({
            message : "Authentication Error"
        })
    }
}
module.exports = middleware;