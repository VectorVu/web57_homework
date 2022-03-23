function randomCourse(){
    const courses = [
        { "course": "c4e" },
        { "course": "ci" },
        { "course": "web57" }
    ]
    const index = Math.floor(Math.random()*courses.length);
    return courses[index];
} 
module.exports = randomCourse;