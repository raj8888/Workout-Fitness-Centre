const {UserModel} = require("../models/userModel");
const {client} = require("../config/redisDB")
const express = require("express");
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require("jsonwebtoken")
let {get_date,get_time}=require("../utils/utils")

const userRouter = express.Router();

// User Page
userRouter.get("/",(req,res)=>{
    res.status(200).send({message:"User Page"})
})

// User - Get All Users
userRouter.get("/all", async (req,res)=>{
    try{
        let users = await UserModel.find();
        res.status(200).send({message:"User Data Fetched",users})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// User - Single User Detail
userRouter.get("/:id", async (req,res)=>{
    let userID= req.params.id;
    try{
        let user = await UserModel.findById(userID);
        res.status(200).send({message:"User Data Fetched",user})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// User Registration
userRouter.post("/register", async (req,res)=>{
    let {name, email, password, phone, sex, country, role} = req.body;

    try{
        let user = await UserModel.find({email});
        if(user.length>0){
            res.status(400).send({error:"User already registered in Database"})
        }else{
            bcrypt.hash(password, +process.env.salt, async function(err, hash) {
                if(err){
                    res.status(401).send({message:"Server Error",error:err.message});
                    console.log(err)
                }else{
                    let createdDate=get_date();
                    let createdTime=get_time();
                    let user = new UserModel({name, email, password:hash, phone, sex, country, role,createdDate,createdTime});
                    await user.save();
                    res.status(200).send({message:"User Registered",user})
                }
            });
            
        }
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

// User Login
userRouter.post("/login", async (req,res)=>{
    let {email, password} = req.body;

    try{
        let user = await UserModel.findOne({email});
        if(!user){
            res.status(400).send({error:"User not found, Kindly register"})
        }else{
            bcrypt.compare(password, user.password, async function(err, result) {
                if(result){
                    var token = jwt.sign({ userID: user._id, role:user.role, name:user.name }, process.env.secretKey, { expiresIn:"7d"});
                    var refresh_token = jwt.sign({ userID: user._id, role:user.role, name:user.name}, process.env.refreshSecretKey, { expiresIn:"30d" });
                    await client.HSET("token",email,token)
                    await client.HSET("refresh_token",email,refresh_token)
                    if(user.role=="trainer"){
                        res.status(200).send({message:"Trainer Logged In",token,refresh_token,user})
                    }else{
                        res.status(200).send({message:"User Logged In",token,refresh_token,user})
                    }
                }else{
                    res.status(401).send({error:"Incorrect Password, Kindly Login Again"});
                    console.log(err)
                }
            });            
        }
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// User Update
userRouter.patch("/update/:id", async (req,res)=>{
    let userID= req.params.id;
    let payload = req.body;
    try{
        let user = await UserModel.findByIdAndUpdate(userID,payload);        
        res.status(200).send({message:"User data updated",user})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// User Delete
userRouter.delete("/delete/:id", async (req,res)=>{
    let userID= req.params.id;

    try{
        let user = await UserModel.findByIdAndDelete(userID);        
        res.status(200).send({message:"User data deleted"})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})




module.exports= {userRouter}

