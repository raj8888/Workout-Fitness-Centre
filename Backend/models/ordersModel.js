const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
    price:Number,
    classID:String,
    userID:String,
    status:Boolean,
    createdDate:String,
    createdTime:String
},{
    versionKey:false
})

const OrdersModel = mongoose.model("orders",ordersSchema);

module.exports={OrdersModel};