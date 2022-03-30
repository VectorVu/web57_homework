

const express = require("express");

const router = express.Router();

const postController = require("./post.controller");
const commentController = require("../comment/comment.controller");
// router tập hợp các API có điểm chung => post
router.get("/", postController.getPosts);
router.get("/:postId", postController.getAPost);
router.post("/", postController.createPost);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.get("/:postId/comments", commentController.readCommentsOfAPost);
module.exports = router;
