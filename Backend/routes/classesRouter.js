const {ClassesModel} = require("../models/ClassesModel");
const express = require("express");
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require("jsonwebtoken")

const classesRouter = express.Router();

// class Page
classesRouter.get("/",(req,res)=>{
    res.status(200).send({message:"classes Page"})
})

// class - Get All class
classesRouter.get("/all", async (req,res)=>{
    try{
        let classes = await ClassesModel.find();
        res.status(200).send({message:"classes Data Fetched",classes})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// class - Single class Detail
classesRouter.get("/:id", async (req,res)=>{
    let classesID= req.params.id;
    try{
        let classes = await ClassesModel.findById(classesID);
        res.status(200).send({message:"class Data Fetched",classes})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// classes Registration
classesRouter.post("/register", async (req,res)=>{
    let {name, email, password, phone, country, role} = req.body;

    try{
        let classes = await ClassesModel.find({email});
        if(classes.length>0){
            res.status(400).send({error:"class already registered in Database"})
        }else{
            bcrypt.hash(password, +process.env.salt, async function(err, hash) {
                if(err){
                    res.status(401).send({message:"Server Error",error:err.message});
                    console.log(err)
                }else{
                    let classes = new ClassesModel({name, email, password:hash, phone, country, role});
                    await classes.save();
                    res.status(200).send({message:"class Registered",classes})
                }
            });
            
        }
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

// class Login
classesRouter.post("/login", async (req,res)=>{
    let {email, password} = req.body;

    try{
        let classes = await ClassesModel.findOne({email});
        if(!classes){
            res.status(400).send({error:"class not found, Kindly register"})
        }else{
            bcrypt.compare(password, classes.password, async function(err, result) {
                if(result){
                    var token = jwt.sign({ classesID: classes._id, role:classes.role }, process.env.secretKey, { expiresIn: 60 });
                    var refresh_token = jwt.sign({ classesID: classes._id, role:classes.role}, process.env.refreshSecretKey, { expiresIn: 180 });
                    res.status(200).send({message:"class Logged In",token,refresh_token})
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

// class Update
classesRouter.patch("/update/:id", async (req,res)=>{
    let classesID= req.params.id;
    // let  {name, password, phone, country, age, height, weight, healthProblem, classes} = req.body;
    let payload = req.body;

    try{
        let classes = await ClassesModel.findByIdAndUpdate(classesID,payload);        
        res.status(200).send({message:"class data updated",classes})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// class Delete
classesRouter.delete("/delete/:id", async (req,res)=>{
    let classesID= req.params.id;

    try{
        let classes = await ClassesModel.findByIdAndDelete(classesID);        
        res.status(200).send({message:"class data deleted"})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


module.exports= {classesRouter}

