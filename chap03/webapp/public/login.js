const submitForm = document.getElementById("loginForm");
const userName = document.getElementById("uname");
const userPass = document.getElementById("upass");

submitForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        const submitData = await fetch("http://localhost:9000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userName.value, password: userPass.value }),
        })

        const result = await submitData.json();
        if (result["success"]) {
            return alert("Đăng nhập thành công!!!");
        }
        return alert("Đăng nhập thất bại :(((");
    } catch (error) {
        console.log(error);
    }
})