const CommentModel = require("./comment.model");


const createComment = async (req, res) => {
    try {
        const { content, author, postId } = req.body;
        const newComment = await CommentModel.create({ content, author, postId });

        res.send({ success: 1, data: newComment });
    } catch (error) {
        res.send({ success: 0, data: error });
    }
}
// read all comments of a post
const readCommentsOfAPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const commentsOfPost = await CommentModel.find({ postId: postId });
        if(commentsOfPost) res.send({ success: 1, data: commentsOfPost });
        else res.send({ success: 0, data: postId+" is not exist" });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
}
// read a comment 
const readComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await CommentModel.findById(commentId);
        if(comment) res.send({ success: 1, data: comment });
        else res.send({ success: 0, data: commentId+" is not exist" }); 
    } catch (error) {
        res.send({ success: 0, data: null });
    }
}

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const updateComment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true });
        if(updateComment) res.send({ success: 1, data: updateComment });
        else res.send({ success: 0, data: commentId+" is not exist" }); 
    } catch (error) {
        res.send({ success: 0, data: null });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const commentDelete = await CommentModel.findByIdAndDelete(commentId);
        if(commentDelete) res.send({ success: 1, data: commentId+" has been deleted" });
        else res.send({ success: 0, data: commentId+" is not exist" }); 
    } catch (error) {
        res.send({ success: 0, data: "can not deleted this comment: " + error });
    }
}

module.exports={
    createComment,
    readCommentsOfAPost,
    readComment,
    updateComment,
    deleteComment
}