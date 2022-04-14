const PostModel = require("./post.model");
const HttpError = require("../../common/httpError");
const slugify = require('slugify');

const getPosts = async (req, res) => {
    const { keyword } = req.query;
    let filter = {};
    if (keyword) {
        // slugify.extend({ 'a': 'à' })
        // const keywordSlug = slugify(keyword);
        // console.log(keywordSlug);
        keyword.replace("a","à");
        filter ={slug:keyword};
        console.log(keyword);
    }
    const Posts = await PostModel.find({slug:keyword});
    if (!Posts) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: Posts});
}

const createPost = async (req, res) => {
    const { title, content, imageUrl } = req.body;
    const newPost = await PostModel.create({ title, content, imageUrl, author: req.user._id });
    if (!newPost) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newPost });
}

const getAPost = async (req, res) => {
    const { postId } = req.params;
    const Post = await PostModel.findById(postId);
    if (!Post) {
        throw new HttpError(400, postId + " is not exist");
    }
    res.send({ success: 1, data: Post });
}

const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const updatePost = await PostModel.findByIdAndUpdate(postId, { content }, { new: true });
    if (!updatePost) {
        throw new HttpError(400, postId + " is not exist");
    }
    res.send({ success: 1, data: updatePost });
}

const deletePost = async (req, res) => {
    const { postId } = req.params;
    const postDelete = await PostModel.findByIdAndDelete(postId);
    if (!postDelete) {
        throw new HttpError(400, postId + " is not exist");
    }
    res.send({ success: 1, data: postId + " has been deleted" });
}

module.exports = {
    createPost,
    getPosts,
    getAPost,
    updatePost,
    deletePost
}