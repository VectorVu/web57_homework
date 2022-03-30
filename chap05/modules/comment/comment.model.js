const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: String,
    author: {
        type: mongoose.Types.ObjectId
    },
    postId: {
        // type: mongoose.Types.ObjectId
        type: String,
    }
},{
    timestamps:true
})

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;