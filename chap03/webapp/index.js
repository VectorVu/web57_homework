const express = require("express");

const random = require("./random");

const even = require("./even");

const loginCheck = require("./loginChecking");
// Ex1 xây dựng web app với express
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!!! I am a first app!");
});

// Ex2 GET /course
app.get("/course", (req, res) => {
    res.send({ "course": "web57" });
})
// GET /course/random
app.get("/course/random", (req, res) => {
    res.send(random());
})
// GET /even
app.get("/even", (req, res) => {
    const start = parseInt(req.query['from']);
    const end = parseInt(req.query['to']);
    res.send({ "numbers": even(start, end) })
})
// GET login
app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
})
// POST /auth/login
app.post("/auth/login", (req,res)=>{
    console.log(req.body);
    res.send(loginCheck(req.body));
})
// port 9000
app.listen(9000, err => {
    if (err) {
        return console.log(err);
    }
    console.log("Server started");
})




