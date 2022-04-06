const jwt = require("jsonwebtoken");
const UserModel = require("../modules/auth/user");
const PostModel = require("../modules/post/post.model");
const HttpError = require("./httpError");

async function needAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        throw new HttpError(401, 'Not found token');
    }
    const jwtToken = token.split(' ')[1];
    const data = jwt.verify(jwtToken, process.env.SECRET_KEY).data;
    const userId = data.userId;
    if (!userId) {
        throw new HttpError(401, 'Authorization is wrong');
    }
    const existedUser = await UserModel.findById(userId);
    if (!existedUser) {
        throw new HttpError(401, 'Authorization is wrong');
    }
    req.user = existedUser;
    next();
}
async function isAuthor(req, res, next) {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
        throw new HttpError(401, 'Not found post');
    }
    console.log(req.user._id.equals(post.author));
    if (!req.user._id.equals(post.author)) {
        throw new HttpError(403, 'Not the author');
    }
    next();
}
const validateInput = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            throw new HttpError(422, message);
        }
    }
}
const checkRole = (role) => {
    return (req, res, next) => {
        if (!(req.user.role === role)) {
            throw new HttpError(400, "invalid role");
        }
        next();
    }
}
const checkQuery = (req, res, next)=>{
    const {byPast} = req.query;
    console.log(byPast);
    if(!(+byPast===1)){
        throw new HttpError(400, 'Invalid params');
    }
    next();
}
module.exports = {
    needAuthenticated,
    isAuthor,
    validateInput,
    checkRole,
    checkQuery
}