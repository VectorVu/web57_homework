const express = require("express");
const postModel = require("./post");
const commentModel = require("./comment");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello!!! I am chap04");
})

// create new post
app.post("/api/posts", async (req, res) => {
    const { content, author } = req.body;
    try {
        const newPost = await postModel.createPost({ content, author });
        res.send({
            success: 1,
            data: newPost
        });
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// read list posts
app.get("/api/posts", async (req, res) => {
    try {
        const allPosts = await postModel.readListPosts();
        res.send({
            success: 1,
            data: allPosts
        });
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// read post by id
app.get("/api/posts/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const postFound = await postModel.readPost(postId);
        if (postFound) {
            res.send({
                success: 1,
                data: postFound
            });
        }
        else {
            res.send({
                success: 0,
                data: "This Id does not exist"
            });
        }
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// updata post
app.put("/api/posts/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const postUpdate = await postModel.updatePost({ postId, content });
        if (postUpdate) {
            res.send({
                success: 1,
                data: postId + " has been updated"
            });
        }
        else {
            res.send({
                success: 0,
                data: "This Id does not exist"
            });
        }
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// delete post
app.delete("/api/posts/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const postDeleted = await postModel.deletePost(postId);
        if (postDeleted) {
            res.send({
                success: 1,
                data: postId + " has been deleted"
            });
        }
        else {
            res.send({
                success: 0,
                data: "This Id does not exist"
            });
        }
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// comment
// create comment
app.post("/api/comments", async (req, res) => {
    const { content, author, postId } = req.body;
    try {
        const newComment = await commentModel.createComment({ content, author, postId });
        res.send({
            success: 1,
            data: newComment
        });
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// read comment by id
app.get("/api/comments/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const cmtFound = await commentModel.readComment(commentId);
        if (cmtFound) {
            res.send({
                success: 1,
                data: cmtFound
            });
        }
        else {
            res.send({
                success: 0,
                data: "This Id does not exist"
            });
        }
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// updata post
app.put("/api/comments/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const cmtUpdate = await commentModel.updateComment({ commentId, content });
        if (cmtUpdate) {
            res.send({
                success: 1,
                data: commentId + " has been updated"
            });
        }
        else {
            res.send({
                success: 0,
                data: "This Id does not exist"
            });
        }
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// delete comment
app.delete("/api/comments/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const cmtDeleted = await commentModel.deleteComment(commentId);
        if (cmtDeleted) {
            res.send({
                success: 1,
                data: commentId + " has been deleted"
            });
        }
        else {
            res.send({
                success: 0,
                data: "This Id does not exist"
            });
        }
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})

// read all comments by postId
app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        const cmtOfPost = await commentModel.readAllCmtByPostId(+postId);
        res.send({
            success: 1,
            data: cmtOfPost
        });
    } catch (error) {
        res.send({
            success: 0,
            data: null,
            message: error.message
        });
    }
})
app.listen(9001, err => {
    if (err) {
        return console.log(err);
    }
    console.log("Server started");
})