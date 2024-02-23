
// const bcrypt = require('bcrypt');
const {create_hash_password, verify_hash_password} = require('../utils/hash');

const {create_jwt_token, } = require('../utils/jwt');
const userModel = require('../models/userModel');
/*
*
*
*
            Register functionality
*
*
*
*/
module.exports.register = async(req,res)=>{
    try{
        const {firstName, lastName, email, userName, password} = req.body;
        let user = await userModel.findOne({email : email});
        // if user already registered
        if(user){
            return res.send({
                status : 201,
                message : "User already logged In"
            })
        }

        // if user not registered
        // hashing password
        const hash_password = await create_hash_password(password);
        const nickName = firstName.substring(0,1).toUpperCase() + lastName.substring(0,1).toUpperCase()

        const new_user = new userModel({
            firstName, lastName, email, userName, nickName,
            password : hash_password,
        });

        user = await new_user.save();

        const token = await create_jwt_token(user);
        // store jwt token in cookie
        // res.cookie('spotify_jwt',token,{
        //     expires : new Date(Date.now()+2592000000),
        //     httpOnly : true
        // });

        // return res.redirect('/user');

        return res.send({
            status : 200,
            user,
            token,
            message : "Successfully Registerd"
        })
    }catch(err){
        console.log(err);
        return res.send({
            status : 502,
            message : "Register error"
        });
    }
}

/*
*
*
*
            Login functionality
*
*
*
*/
module.exports.login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        let user = await userModel.findOne({email : email});
        // if user not registered
        if(!user){
            return res.send({
                status : 403,
                message : "User not registered"
            });
        }

        let isVerify = await verify_hash_password(password, user.password);
        if(!isVerify){
            return res.send({
                status : 401,
                message : "Incorrect Password"
            });
        }
        const token = await create_jwt_token(user);
        // // store jwt token in cookie
        // res.cookie('spotify_jwt',token,{
        //     expires : new Date(Date.now()+2592000000),
        //     httpOnly : true
        // });

        // return res.redirect('/user');

        return res.send({
            status : 200,
            user,
            token,
            message : "Successfully Login",
        })
    }catch(err){
        console.log(err);
        return res.send({
            status : 502,
            message : "Login Error"
        });
    }
}