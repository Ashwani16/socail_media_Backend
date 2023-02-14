const {Router}=require("express");
const { UserModel } = require("../model/user.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=Router();

userRouter.post("/register",async (req,res)=>{
    const {name,password,gender,email}=req.body;
    // console.log(obj)
    var pass
    bcrypt.hash(password,2,async (err,data)=>{
        if(err){
            console.log(err)
        }
        pass=data
        let user=new UserModel({name,password:pass,gender,email})
        try {
            await user.save()
            res.send({resonse:"User succefully Registered"});
        } catch (error) {
            console.log(error)
        }
    })      
})

userRouter.post("/login",async(req,res)=>{
    const {name,password}=req.body;
    const data=await UserModel.findOne({name:name}); 
    console.log("-----cc-->",req.body)
   try {
    bcrypt.compare(password, data.password, (err, result)=>{ 
        if(result){
         let token=jwt.sign({name},process.env.secretkey)
         res.send({status:"Log in Successfull",token})
        }
        
     })
   } catch (error) {
        res.send("Please Enter Correct Cridentials")
   }
})

module.exports={userRouter}