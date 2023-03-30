const mongoose = require("mongoose");

const classesSchema = mongoose.Schema({
    title:String,
    seatTotal:Number,
    seatOccupied:Number,
    price:Number,
    activity:String,
    venue:{type:String,enum:["online","offline"],default:"online"},
    locationOrLink:String,
    Duration:String,
    image:String,
    trainerID:String,
    createdDate:String,
    createdTime:String,
    classDate:String,
    classTime:String,             
    clients:[{type:String}]
},{
    versionKey:false
})

const ClassesModel = mongoose.model("class",classesSchema);

module.exports={ClassesModel};