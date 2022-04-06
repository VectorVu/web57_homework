

const express = require("express");

const router = express.Router();

const postController = require("./post.controller");
const commentController = require("../comment/comment.controller");
const middlewares = require("../../common/middlewares");
const { createPostSchema, updataPostSchema } = require("./post.validation");

// router tập hợp các API có điểm chung => post
router.get("/", middlewares.checkQuery,postController.getPosts);
router.get("/:postId", postController.getAPost);
router.post("/",
    middlewares.needAuthenticated,
    middlewares.checkRole("user"),
    middlewares.validateInput(createPostSchema, "body"),
    postController.createPost);
router.put("/:postId",
    middlewares.needAuthenticated,
    middlewares.isAuthor,
    middlewares.validateInput(updataPostSchema, "body"),
    postController.updatePost);
router.delete("/:postId",
    middlewares.needAuthenticated,
    middlewares.checkRole("admin"),
    postController.deletePost);
router.get("/:postId/comments", commentController.readCommentsOfAPost);
module.exports = router;
