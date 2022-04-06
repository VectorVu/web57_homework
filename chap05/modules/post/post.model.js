const mongoose = require("mongoose");

// post model
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    imageUrl: String,
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})
const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
