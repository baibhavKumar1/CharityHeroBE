const express= require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const BlacklistModel = require('../Model/blacklist.model');
const UserModel = require('../Model/user.model');
require('dotenv').config();

UserRouter.get('/',(req,res)=>{
    res.send('on')
})

UserRouter.post('/register',async(req,res)=>{
    try{
        const {name,email,pass} = req.body;
        const exist = await UserModel.findOne({email});
        if(exist){
            return res.status(400).send("User already registered");
        }
        else{
            bcrypt.hash(pass,4,async(err,hash)=>{
                if(err){
                    res.status(400).send(err.message)
                } 
                const newUser = new UserModel(
                    {
                        name,pass:hash,email
                    }
                );
                await newUser.save();
                res.status(200).json({"Message":"User registered","New User":newUser})
            })
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

UserRouter.post('/login',async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.find({email});
        console.log(user)
        if(user.length==0){
            res.status(400).send("User is not registered");
        }
        bcrypt.compare(pass, user[0].pass, (err,decoded)=>{
            console.log(decoded)
            if(decoded){
                const token = jwt.sign({userID:user[0]._id},"Secret");
                res.status(200).json({"message":"User Logged in","Token":token})
            }else{
                res.status(400).send("Wrong credentials");
            }
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

UserRouter.get('/logout',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(400).send("Token not found");
    }else{
        await BlacklistModel.updateMany({},{$push:{token:[token]}})
        return res.status(200).send("Logged out successfully");
    }
})

module.exports = UserRouter;