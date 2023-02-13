const express=require("express");
const { connection } = require("./config/db");
const { postRouter } = require("./controller/posts.Router");
const { userRouter } = require("./controller/user.Router");
require('dotenv').config()

const app=express();
app.use(express.json());

app.use("/user",userRouter);
app.use("/posts",postRouter)
app.listen(process.env.port,()=>{
    try {
        connection;
        console.log("Server is started")
    } catch (error) {
        console.log("some error in mongoosw")
    }
});