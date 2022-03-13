## Ex1
Bài giải:
```
const fs = require("fs");

fs.writeFile("numbers.txt","1 8 5 7 2","utf8",(err)=>{
    if(err) console.log(err);
});
```

## Ex2
Đề bài:
```
// data là một object
const writeFile = (path, data) => {
  // Hoàn thiện hàm
}

const writeFileToDisk = async (path, data) => {
  try {
    const isSuccess = await writeFile(path, data);
    console.log(isSuccess) // true
  } catch (err) {
    console.log(err) // 'Lỗi'
  }
}
```
Bài giải:
```
const writeFile = (path, data) => {
    const dataJson = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, dataJson, "utf8", (err) => {
            if(err) reject(err="Lỗi");
            else resolve(true);
        });
    })
}
const writeFileToDisk = async (path, data) => {
    try {
      const isSuccess = await writeFile(path, data);
      console.log(isSuccess) // true
    } catch (err) {
      console.log(err) // 'Lỗi'
    }
  }
writeFileToDisk("mytest.txt", {a:1, b:2, c:4});
```

## Ex3

Bài Giải: tận dụng 2 hàm readFile và writeFile

```
const writeFile = (path, data)=>{
    const dataJson = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile(path,dataJson,"utf8",(err) => {
            if(err) reject(err="Lỗi");
            else resolve(true);
        });
    })
}
  const readFile = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err,data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      })
    })
}

const readAndWrite = async (fileRead, fileResult) => {
    try {
        const readData = await readFile(fileRead);
        const arrData = readData.split(" ");
        console.log(arrData);
        const oddArr = arrData.filter(x => x%2 !== 0);
        console.log(oddArr);
        const writeData = await writeFile(fileResult, oddArr.length);
    } catch (error) {
        console.log(error);
    }
  }
readAndWrite("numbers.txt","result.txt");
```

## Ex4
Đề bài:
```
async function wait() {

}

async function go() {
  console.log('Starting');
  await wait(2000);
  console.log('running');
  await wait(200);
  console.log('ending');
}
// Hoàn thiện hàm wait sao cho "ending" hiên thị sau "running" 200ms, "running" hiện thị sau "Starting" 2000ms
```
Bài giải:
```
async function wait(time) {
    return new Promise((resolve)=>{
        return setTimeout(resolve,time);
    })  
}
async function go() {
  console.log('Starting');
  await wait(2000);
  console.log('running');
  await wait(200);
  console.log('ending');
}
go();
```




