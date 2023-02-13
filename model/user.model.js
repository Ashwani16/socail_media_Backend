const mongoose=require("mongoose");

const user_Schema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String
})
const UserModel=mongoose.model("user",user_Schema)
module.exports={UserModel}