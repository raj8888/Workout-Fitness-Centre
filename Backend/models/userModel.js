const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    country:String,
    sex:String,
    role:{type:String,enum:["trainer","client"],default:"client"},
    age:Number,
    height:Number,
    weight:Number,
    healthProblem:[{type:String}],
    classes:[{type:String}],
    createdDate:String,
    createdTime:String,
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema);

module.exports={UserModel};