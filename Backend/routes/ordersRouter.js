const {OrdersModel} = require("../models/ordersModel");
const express = require("express");
require('dotenv').config()
let {get_date,get_time}=require("../utils/utils")


const ordersRouter = express.Router();

// Order Page
ordersRouter.get("/",(req,res)=>{
    res.status(200).send({message:"Orders Page"})
})

// Orders - Get All Orders
ordersRouter.get("/all", async (req,res)=>{
    try{
        let orders = await OrdersModel.find();
        res.status(200).send({message:"Orders Data Fetched",orders})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// orders - Single orders Detail
ordersRouter.get("/:id", async (req,res)=>{
    let ordersID= req.params.id;
    try{
        let orders = await OrdersModel.findById(ordersID);
        res.status(200).send({message:"Order Fetched",orders})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


//all orders of single users
ordersRouter.get("/user/:id", async (req,res)=>{
    let userID= req.params.id;
    try{
        let orders = await OrdersModel.find({userID});
        res.status(200).send({message:"Orders Fetched",orders})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

// Order creation
ordersRouter.post("/create", async (req,res)=>{
    let payload = req.body;
    payload.status=true;
    payload.createdDate=get_date();
    payload.createdTime=get_time();
    try{
        let order = new OrdersModel(payload);
        await order.save();
        res.status(200).send({message:"Order created",order})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


// Order status Update (true or false)
ordersRouter.patch("/update/:id", async (req,res)=>{
    let orderID= req.params.id;
    try{
        let order = await OrdersModel.findByIdAndUpdate(orderID,{status:false});        
        res.status(200).send({message:"Order Status updated"})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
    }
})




module.exports= {ordersRouter}