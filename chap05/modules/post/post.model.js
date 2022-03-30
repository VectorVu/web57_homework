
const mongoose = require("mongoose");


// post model
const PostSchema = new mongoose.Schema({
    content: String,
    author: {
        type: mongoose.Types.ObjectId
    }
},{
    timestamps:true
})
const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
