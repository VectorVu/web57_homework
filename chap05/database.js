const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/chap05", err => {
    if (err) return console.log("can not connect to MongoDb", err);
    console.log("successful connection to MongoBb");
})
// post model
const PostSchema = new mongoose.Schema({
    content: String,
    author: {
        type: String,
        required: true
    }
})

const PostModel = mongoose.model('Post', PostSchema);

app.post("/api/posts", async (req, res) => {
    try {
        const { content, author } = req.body;
        const newPost = await PostModel.create({ content, author });

        res.send({ success: 1, data: newPost });
    } catch (error) {
        res.send({ success: 0, data: error });
    }
})
// read all posts
app.get("/api/posts", async (req, res) => {
    try {
        const Posts = await PostModel.find();
        res.send({ success: 1, data: Posts });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
})
// read a post 
app.get("/api/posts/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const Post = await PostModel.findById(postId);
        res.send({ success: 1, data: Post });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
})

app.put("/api/posts/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const updatePost = await PostModel.findByIdAndUpdate(postId, { content }, { new: true });
        res.send({ success: 1, data: updatePost });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
})

app.delete("/api/posts/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        await PostModel.findByIdAndDelete(postId);
        res.send({ success: 1, data: postId + " has been deleted" });
    } catch (error) {
        res.send({ success: 0, data: "can not deleted this post: " + error });
    }
})

// comment model
const CommentSchema = new mongoose.Schema({
    content: String,
    author: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
})
const CommentModel = mongoose.model('Comment', CommentSchema);

app.post("/api/comments", async (req, res) => {
    try {
        const { content, author, postId } = req.body;
        const newComment = await CommentModel.create({ content, author, postId });

        res.send({ success: 1, data: newComment });
    } catch (error) {
        res.send({ success: 0, data: error });
    }
})
// read all comments of a post
app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        const commentsOfPost = await CommentModel.find({ postId: postId });
        res.send({ success: 1, data: commentsOfPost });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
})
// read a comment 
app.get("/api/comments/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const Comment = await CommentModel.findById(commentId);
        res.send({ success: 1, data: Comment });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
})

app.put("/api/comments/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const updateComment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true });
        res.send({ success: 1, data: updateComment });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
})

app.delete("/api/comments/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        await CommentModel.findByIdAndDelete(commentId);
        res.send({ success: 1, data: commentId + " has been deleted" });
    } catch (error) {
        res.send({ success: 0, data: "can not deleted this comment: " + error });
    }
})
app.listen("9002", err => {
    if (err) return console.log("can not start");
    console.log("successs started at 9002");
})