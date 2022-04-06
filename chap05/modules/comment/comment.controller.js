const CommentModel = require("./comment.model");
const HttpError = require("../../common/httpError");

const createComment = async (req, res) => {
    const { content, author, postId } = req.body;
    const newComment = await CommentModel.create({ content, author, postId });
    if (!newComment) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newComment });
}
// read all comments of a post
const readCommentsOfAPost = async (req, res) => {
    const { postId } = req.params;
    const commentsOfPost = await CommentModel.find({ postId: postId });
    if (!commentsOfPost) {
        throw new HttpError(400, postId + " is not exist");
    }
    res.send({ success: 1, data: commentsOfPost });
}
// read a comment 
const readComment = async (req, res) => {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new HttpError(400, commentId + " is not exist");
    }
    res.send({ success: 1, data: comment });
}

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const updateComment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!updateComment) {
        throw new HttpError(400, commentId + " is not exist");
    }
    res.send({ success: 1, data: updateComment });
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const commentDelete = await CommentModel.findByIdAndDelete(commentId);
    if (!commentDelete) {
        throw new HttpError(400, commentId + " is not exist");
    }
    res.send({ success: 1, data: commentId + " has been deleted" });
}

module.exports = {
    createComment,
    readCommentsOfAPost,
    readComment,
    updateComment,
    deleteComment
}