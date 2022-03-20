function loginCheck(loginJson) {
    if (loginJson['username'] === "admin" && loginJson['password'] === "123456") return { "success": true };
    return { "success": false };
}
module.exports = loginCheck;