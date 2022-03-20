function random(){
    const courses = [
        { "course": "c4e" },
        { "course": "ci" },
        { "course": "web57" }
    ]
    let num = Math.floor(Math.random()*courses.length);
    return courses[num];
} 
module.exports = random;