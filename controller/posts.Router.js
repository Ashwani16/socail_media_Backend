const {Router}=require("express");
const { PostModel } = require("../model/post.model");
const { UserModel } = require("../model/user.model");
require('dotenv').config();
var jwt = require('jsonwebtoken');
const postRouter=Router();

const authentication=async (req,res,next)=>{
    try {
        
        const token=req.headers.token;
        console.log(req);
    var {name} = jwt.verify(token, process.env.secretkey);
    let user=await UserModel.findOne({name:name})
    
    if(user){
        req.body.user_id=user._id;
        console.log("verify")
        next()
    }
    } catch (error) {
        res.send("Please Athonticate")
    }
    
}
postRouter.get("/",authentication,async(req,res)=>{
    const {user_id}=req.body
    try {
        let  posts=await PostModel.find({user_id})
        res.send(posts)
    } catch (error) {
        res.send("some error in getting data")
    }
})
postRouter.post("/add",authentication,async(req,res)=>{
    const {user_id,title,body,device}=req.body
    try {
        let  posts=new PostModel({user_id,title,body,device})
        await posts.save();
        res.send("Posted Successfully")
    } catch (error) {
        res.send("some error in Posting")
    }
})
postRouter.patch("/update/:id",authentication,async(req,res)=>{
    const {id}=req.params;
    try {
        await PostModel.findOneAndUpdate({_id:id},req.body)
        res.send("updated Successfully")
    } catch (error) {
        res.send("some error in updating")
    }
})
postRouter.delete("/delete/:id",authentication,async (req,res)=>{
    const {id}=req.params;
    try {
        await PostModel.findOneAndDelete({_id:id})
        res.send("Deleted Successfully")
    } catch (error) {
        res.send("some error in Deleting")
    }
})


module.exports={postRouter}