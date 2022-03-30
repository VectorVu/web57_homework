const PostModel = require("./post.model");

const getPosts = async (req, res) => {
    try {
        const Posts = await PostModel.find();
        res.send({ success: 1, data: Posts });
    } catch (error) {
        res.send({ success: 0, data: null });
    }

}
const createPost = async (req, res) => {
    try {
        const { content, author } = req.body;
        const newPost = await PostModel.create({ content, author });

        res.send({ success: 1, data: newPost });
    } catch (error) {
        res.send({ success: 0, data: error });
    }
}
const getAPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const Post = await PostModel.findById(postId);
        if(Post) res.send({ success: 1, data: Post });
        else res.send({ success: 0, data: postId+" is not exist" });    
    } catch (error) {
        res.send({ success: 0, data: null });
    }
}
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const updatePost = await PostModel.findByIdAndUpdate(postId, { content }, { new: true });
        if(updatePost) res.send({ success: 1, data: updatePost });
        else res.send({ success: 0, data: postId+" is not exist" });
    } catch (error) {
        res.send({ success: 0, data: null });
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const postDelete =  await PostModel.findByIdAndDelete(postId);
        if(postDelete) res.send({ success: 1, data: postId + " has been deleted" });
        else res.send({ success: 0, data: postId + " is not exist" })
       
    } catch (error) {
        res.send({ success: 0, data: "can not deleted this post: " + error });
    }
}    
module.exports = {
    createPost,
    getPosts,
    getAPost,
    updatePost,
    deletePost
}