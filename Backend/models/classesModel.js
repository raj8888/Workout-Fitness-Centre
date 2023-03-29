const mongoose = require("mongoose");

const classesSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    country:String,
    role:{type:String,enum:["trainer","client"],default:"client"},
    age:Number,
    height:Number,
    weight:Number,
    healthProblem:[{type:String}],
    classes:[{type:String}],
    time: { type: Date, default: Date.now }
},{
    versionKey:false
})

const ClassesModel = mongoose.model("class",classesSchema);

module.exports={ClassesModel};