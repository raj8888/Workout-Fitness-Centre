const express=require('express')
var cors = require('cors')
require('dotenv').config()
const {connection}=require("./config/server")
const {userRouter} = require("./routes/userRouter")
const {classesRouter} = require("./routes/classesRouter")
const {ordersRouter} = require("./routes/ordersRouter")
const {authenticator} = require("./middlewares/authenticator")

const app=express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Base API Endpoint")
})

app.use("/user",userRouter);
app.use(authenticator)
app.use("/class",classesRouter);
app.use("/order",ordersRouter);



app.get("/check",(req,res)=>{
    res.send("data PAGE")
})


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the db")
    } catch (error) {
        console.log(error)
    }
    console.log(`listning on port ${process.env.port}`)
})
