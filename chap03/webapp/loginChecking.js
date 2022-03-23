function loginCheck({username, password}) {
    if (username === "admin" && password === "123456") return { "success": true };
    return { "success": false };
}
module.exports = loginCheck;