const express=require('express')
var cors = require('cors')
require('dotenv').config()
const {connection}=require("./config/server")
const {userRouter} = require("./routes/userRoute")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
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
