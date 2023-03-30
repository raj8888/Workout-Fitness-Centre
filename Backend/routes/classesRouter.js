const {ClassesModel} = require("../models/ClassesModel");
const express = require("express");
require('dotenv').config()
let {get_date,get_time}=require("../utils/utils")


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

// classes creation
classesRouter.post("/create", async (req,res)=>{
    let payload = req.body;
    payload.createdDate=get_date();
    payload.createdTime=get_time();
    payload.trainerID=payload.userID
    payload.seatOccupied=0;

    try{
        let classes = new ClassesModel(payload);
        await classes.save();
        res.status(200).send({message:"class created",classes})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


// class Update
classesRouter.patch("/update/:id", async (req,res)=>{
    let classesID= req.params.id;
    let payload = req.body;
    try{
        let classes = await ClassesModel.findByIdAndUpdate(classesID,payload);        
        res.status(200).send({message:"class data updated"})
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

