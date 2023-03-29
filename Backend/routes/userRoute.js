const {UserModel} = require("../models/userModel");
const express = require("express");
const bcrypt = require('bcrypt');
require('dotenv').config()

const userRouter = express.Router();

// User Page
userRouter.get("/",(req,res)=>{
    res.send("Users Page")
})

// User - Get All Users
userRouter.get("/all", async (req,res)=>{
    try{
        let users = await UserModel.find();
        res.status(200).send({message:"User Data Fetched",users})
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

// User - Single User Detail
userRouter.get("/:id", async (req,res)=>{
    let userID= req.params.id;
    try{
        let user = await UserModel.findById(userID);
        res.status(200).send({message:"User Data Fetched",user})
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

// User Registration
userRouter.post("/register", async (req,res)=>{
    let {name, email, password, phone, country, role} = req.body;

    try{
        let user = await UserModel.find({email});
        if(user.length>0){
            res.status(400).send({error:"User already registered in Database"})
        }else{
            bcrypt.hash(password, +process.env.salt, async function(err, hash) {
                if(err){
                    res.status(401).send({error:"Server Error"});
                    console.log(err)
                }else{
                    let user = new UserModel({name, email, password:hash, phone, country, role});
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
        let user = await UserModel.find({email});
        if(user.length==0){
            res.status(400).send({error:"User not found, Kindly register"})
        }else{
            bcrypt.compare(password, user[0].password, async function(err, result) {
                if(result){
                    res.status(200).send({message:"User Logged In"})
                }else{
                    res.status(401).send({error:"Incorrect Password, Kindly Login Again"});
                    console.log(err)
                }
            });            
        }
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

// User Update
userRouter.patch("/update/:id", async (req,res)=>{
    let userID= req.params.id;
    // let  {name, password, phone, country, age, height, weight, healthProblem, classes} = req.body;
    let payload = req.body;

    try{
        let user = await UserModel.findByIdAndUpdate(userID,payload);        
        res.status(200).send({Message:"User data updated",user})
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

// User Delete
userRouter.delete("/delete/:id", async (req,res)=>{
    let userID= req.params.id;

    try{
        let user = await UserModel.findByIdAndDelete(userID);        
        res.status(200).send({Message:"User data deleted"})
    }catch(error){
        res.status(400).send({error:error.message})
    }
})


module.exports= {userRouter}

