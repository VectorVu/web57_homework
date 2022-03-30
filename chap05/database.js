const express = require("express");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chap05", err => {
    if (err) return console.log("can not connect to MongoDb", err);
    console.log("successful connection to MongoBb");
})

const postRouter = require("./modules/post/post.router");
const commentRouter = require("./modules/comment/comment.router");
const app = express();

app.use(express.json());
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

app.use('*', (req, res)=>{
    res.send({message: '404 not found'});
})
app.listen("9002", err => {
    if (err) return console.log("can not start");
    console.log("successs started at 9002");
})