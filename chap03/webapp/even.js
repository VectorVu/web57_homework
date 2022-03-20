function even(startNum, endNum){
    let evenArray = [];
    for(let i = startNum; i<= endNum; i++){
        if(i%2 === 0) evenArray.push(i);
    }
    return evenArray;
}
module.exports = even;