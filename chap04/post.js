const fs = require("fs");
// create post
const createPost = async ({ content, author }) => {
    const oldPostsPrimi = await fs.promises.readFile("posts.json", { encoding: 'utf-8' });
    const oldPostsConv = JSON.parse(oldPostsPrimi);
    const newPost = {
        id: Date.now(),
        content,
        author
    }
    const newPosts = [...oldPostsConv, newPost];

    await fs.promises.writeFile(
        "posts.json",
        JSON.stringify(newPosts)
    );
    return newPost;
}
// read list posts
const readListPosts = async () => {
    const oldPostsPrimi = await fs.promises.readFile("posts.json", { encoding: 'utf-8' });
    const oldPostsConv = JSON.parse(oldPostsPrimi);
    return oldPostsConv;
}
// read post by id
const readPost = async (postId) => {
    const oldPostsPrimi = await fs.promises.readFile("posts.json", { encoding: 'utf-8' });
    const oldPostsConv = JSON.parse(oldPostsPrimi);
    const postFound = oldPostsConv.find(post => String(post.id) === postId);
    return postFound;
}
// update post
const updatePost = async ({ postId, content }) => {
    let updateFlag = false;
    const oldPostsPrimi = await fs.promises.readFile("posts.json", { encoding: 'utf-8' });
    const oldPostsConv = JSON.parse(oldPostsPrimi);
    const postUpdate = oldPostsConv.map(post => {
        if (String(post.id) === postId) {
            updateFlag = true;
            return {
                ...post,
                content
            }
        }
        return post;
    });
    await fs.promises.writeFile(
        "posts.json",
        JSON.stringify(postUpdate)
    );
    return updateFlag;
}

// delete post
const deletePost = async (postId) => {
    const oldPostsPrimi = await fs.promises.readFile("posts.json", { encoding: 'utf-8' });
    const oldPostsConv = JSON.parse(oldPostsPrimi);
    const postDeleted = oldPostsConv.filter(post => String(post.id) !== postId);
    await fs.promises.writeFile(
        "posts.json",
        JSON.stringify(postDeleted)
    );
    return oldPostsConv.length > postDeleted.length;
}

module.exports = {
    createPost,
    readListPosts,
    readPost,
    updatePost,
    deletePost
}