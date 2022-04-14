require('dotenv').config()
require('express-async-errors');
const express = require("express");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, err => {
    if (err) return console.log("can not connect to MongoDb", err);
    console.log("successful connection to MongoBb");
})

const postRouter = require("./modules/post/post.router");
const commentRouter = require("./modules/comment/comment.router");
const authRouter = require("./modules/auth/auth.router");
const uploadRouter = require("./modules/upload/upload.router");
const app = express();

app.use(express.json());
app.get("/", (req, res)=>{
    res.send('<h1>Đây là demo ZoZForum</h1><br><p>Test các api khác bằng Postman qua đường dẫn trang web/api/... Register -> login -> lấy token -> tạo post -> tạo comment ||upload ảnh,.... </p>')
})
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

app.use('*', (req, res)=>{

    res.send({message: '404 not found'});
})

app.use(function (err, req, res, next) {
    res.status(err.status||500).send({success:0, message: err.message})
})
app.listen(process.env.PORT || 9002, err => {
    if (err) return console.log("can not start");
    console.log("successs started at 9002");
})