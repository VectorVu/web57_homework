const fs = require("fs");

// create comment
const createComment = async ({ content, author, postId }) => {
    const oldCmtsPrimi = await fs.promises.readFile("comments.json", { encoding: 'utf-8' });
    const oldCmtsConv = JSON.parse(oldCmtsPrimi);
    const newComment = {
        id: Date.now(),
        content,
        author,
        postId
    }
    const newComments = [...oldCmtsConv, newComment];

    await fs.promises.writeFile(
        "comments.json",
        JSON.stringify(newComments)
    );
    return newComment;
}

// read comment by id
const readComment = async (commentId) => {
    const oldCmtsPrimi = await fs.promises.readFile("comments.json", { encoding: 'utf-8' });
    const oldCmtsConv = JSON.parse(oldCmtsPrimi);
    const CmtFound = oldCmtsConv.find(cmt => String(cmt.id) === commentId);
    return CmtFound;
}

// update post
const updateComment = async ({ commentId, content }) => {
    let updateFlag = false;
    const oldCmtsPrimi = await fs.promises.readFile("comments.json", { encoding: 'utf-8' });
    const oldCmtsConv = JSON.parse(oldCmtsPrimi);
    const cmtUpdate = oldCmtsConv.map(cmt => {
        if (String(cmt.id) === commentId) {
            updateFlag = true;
            return {
                ...cmt,
                content
            }
        }
        return cmt;
    });
    await fs.promises.writeFile(
        "comments.json",
        JSON.stringify(cmtUpdate)
    );
    return updateFlag;
}

// delete post
const deleteComment = async (commentId) => {
    const oldCmtsPrimi = await fs.promises.readFile("comments.json", { encoding: 'utf-8' });
    const oldCmtsConv = JSON.parse(oldCmtsPrimi);
    const cmtDeleted = oldCmtsConv.filter(cmt => String(cmt.id) !== commentId);
    await fs.promises.writeFile(
        "comments.json",
        JSON.stringify(cmtDeleted)
    );
    return oldCmtsConv.length > cmtDeleted.length;
}
// read all comments by postId
const readAllCmtByPostId = async (postId) => {
    console.log(postId);
    const oldCmtsPrimi = await fs.promises.readFile("comments.json", { encoding: 'utf-8' });
    const oldCmtsConv = JSON.parse(oldCmtsPrimi);
    const cmtOfPost = oldCmtsConv.filter(cmt => Number(cmt.postId) === postId);
    return cmtOfPost;
}
module.exports = {
    createComment,
    readComment,
    updateComment,
    deleteComment,
    readAllCmtByPostId
}