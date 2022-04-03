const PostModel = require("./post.model");
const jwt = require("jsonwebtoken");
const UserModel = require("../auth/user");

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
        const token = req.headers.authorization;
        
        if(!token){
            throw new Error('Not found token');
        }
        const jwtToken = token.split(' ')[1];
        const data = jwt.verify(jwtToken, process.env.SECRET_KEY);
        const {userId} = data;
        if(!userId){
            throw new Error('Authorization is wrong');
        }
        const existedUser = await UserModel.findById(userId);
        if(!existedUser){
            throw new Error('Authorization is wrong');
        }
        
        const { content } = req.body;
        const newPost = await PostModel.create({ content, author: existedUser._id});

        res.send({ success: 1, data: newPost });
    } catch (error) {
        res.status(400).send({success:0, message: error.message})
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

        const token = req.headers.authorization;
        
        if(!token){
            throw new Error('Not found token');
        }
        const jwtToken = token.split(' ')[1];
        const data = jwt.verify(jwtToken, process.env.SECRET_KEY).data;
        const userId = data.userId;
        console.log(userId);

        if(!userId){
            throw new Error('Authorization is wrong');
        }
        const existedUser = await UserModel.findById(userId);
        if(!existedUser){
            throw new Error('Authorization is wrong');
        }
        const post = await PostModel.findById(postId);
        const isAuthor = userId === post.author;
        if(!isAuthor){
            throw new Error('Not the author');
        }
        const { content } = req.body;
        const updatePost = await PostModel.findByIdAndUpdate(postId, { content }, { new: true });
        if(updatePost) res.send({ success: 1, data: updatePost });
        else {
            throw new Error('Not found post');
        }
    } catch (error) {
        res.status(400).send({success:0, message: error.message})
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