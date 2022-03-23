function getEvenInRange(startNum, endNum) {
    let evenArray = [];
    if (startNum % 2 !== 0) startNum++;
    for (let i = startNum; i <= endNum; i += 2) {
        evenArray.push(i);
    }
    return evenArray;
}
module.exports = getEvenInRange;