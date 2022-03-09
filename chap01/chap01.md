## Ex1 
Bài giải
```
const obj1 = { x: 20, y: 30 };

function cloneDeep(obj) {
    let jsonObj = JSON.stringify(obj);
    // chuyển obj đầu vào sang dạng JSON để giữ được tất cả các key, value của obj1 ở dạng dữ liệu string (nguyên thủy)
    let cloneObj = JSON.parse(jsonObj);
    /*parse obj đã chuyển sang JSON lại dạng object,
    khi này thì thực chất tất cả các key và value của obj1 ban đầu sẽ được clone qua biến mới như 1 dạng dữ liệu nguyên thủy
    và sẽ được lưu vào 1 ô nhớ khác với ô nhớ của obj1, nên việc sửa đổi dữ liệu của obj2 không ảnh hưởng đến obj1;
    */ 
    return cloneObj;
}
const obj2 = cloneDeep(obj1)
obj2.x = 10;
console.log(obj1);
console.log(obj2);
```
## Ex2

```
const macbooks = ['macbook2015', { model: 'macbook2014' }, 'macbook2017'];
const apples = [...macbooks];
apples[0] = 'air';
apples[1].model = 'm1';

console.log(macbooks) // ["macbook2015",{model: 'm1'}
,"macbook2017"];
console.log(apples) // ["air",{model: 'm1'}
,"macbook2017"];
```

Giải thích:
```
const apples = [...macbooks];
```
sau khi đoạn code trên được thực thi,
biến `apples` là một mảng chứa các phần tử đã được clone từ mảng `macbooks`.  
 
`macbooks[0]` và `macbooks[2]` là 2 chuỗi string (dữ liệu nguyên thủy), còn `macbooks[1]` là một object, cho nên khi ta dùng toán tử spread để clone các phần tử từ macbooks sang apples thì `apples[0]` và `apples[2]` copy giá trị được chứa trong ô nhớ của `macbooks[0]` và `macbooks[2]` và lưu vào ô nhớ của chính nó, còn `apples[1]` copy địa chỉ ô nhớ của `macbooks[1]`.
```
apples[0] = 'air';
```
vì thế khi ta thay đổi `apples[0]` thì nó chỉ thay đổi giá trị chứa trong ô nhớ của nó thành "air" và giá trị trong `macbook[0]` không bị ảnh hưởng vì chúng được lưu ở 2 ô nhớ khác nhau.
```
apples[1].model = 'm1';
```
còn khi ta thay đổi `apples[1].model` thì thực chất `apples[1]` chứa cùng 1 địa chỉ ô nhớ với `macbook[1]` nên nó sẽ bị thay đổi theo.

## Ex3
Đề bài:
```
var text = 'outside';
function show() {
  console.log(text) //1
  var text = 'inside';
}
```
Sau khi gọi funtion show(), thì kết quả ở //1 sẽ log ra giá trị `undefined`. 

Giải thích: bên trong hàm show, ta thấy dòng lệnh:` var text = 'inside'` thực chất, trình biên dịch của Javascript sẽ phân tách lệnh này thành 2 phần, là phần khai báo `var text` và phần gán giá trị `text = 'inside'`. Sau đó, với cơ chế hoisting mặc định thì phần khai báo `var text` sẽ được đưa lên đầu scope (ở đây là bên trong hàm show) và vì vậy `var text = 'outside'` sẽ bị `var text` ghi đè và `text` mang giá trị `undefine` ngay trên lệnh `console.log(text)` => log ra `undefine`.
```
var text = 'outside';
function show() {
  var text;
  console.log(text) //1
  var text = 'inside';
}
```

## Ex4

Đề bài:
```
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
Bài giải:
```
function inBetween(num1, num2){
  return function(num){
    return num >= num1 && num <= num2;
  }
}
function inArray(arr2){
    return function(num){
      return arr2.includes(num);
    }
}
```

## Ex5

Đề bài:
```
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```
Kết quả hiện ra là:
```
alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
Giải thích: Ta thấy,Counter( là một constructor function. 
Sau khi dòng lệnhlet counter = new Counter( được thực thi thì:

1. Một object mới được tạo ra, object counter;
2. This sẽ được bind vào counter, vậy nên mọi references đến this đều trỏ vào counter;
3. proto được thêm vào. Do đó counter.proto sẽ trỏ vào Counter.prototype `console.log(counter.__proto__ === Counter.prototype); // true`;
4. Sau cùng, object counter mới được tạo đó sẽ được return thành biến counter của ta.

Vì đó, biến counter có thể sử dụng `this.up` và `this.down` của `Counter()` và kết quả được in ra như ta đã thấy. [^1]

## Ex6

Đề bài:
```
console.log("hello");

setTimeout(() => console.log("world"), 0);

console.log("hi");
```
Thứ tự message in ra là `hello`, `hi`, và cuối cùng là `world`. 

Giải thích: 
1. khi dòng lệnh `console.log("hello")` được thực thi, thì nó được đẩy vào call stack và tiến hành in `hello` ra console, sau đó được lấy ra khỏi call stack để đẩy hàm tiếp theo vào;
2. khi dòng `setTimeout(() => console.log("world"), 0)` được thực thi, thì hàm callback được thêm vào vùng web Api của trình duyệt và web Api bắt đầu đếm thời gian được set của `setTimeout()`, ở đây là 0;
3. cùng lúc đó, trong khi `setTimeout()` đang được tính thời gian trong vùng web Api thì ở callstack, dòng `console.log("hi")` được thêm vào và tiến hành in `hi` ra console;
4. sau khi hết thời gian set ban đầu, hàm callback của setTimeout chưa được đưa vào callstack mà phải xuống hàng đợi queue, đợi Event Loop hoạt động. 
5. sau khi `console.log("hi")` được thực thi xong và lấy ra khỏi callstack thì lúc này callstack đã trống và Event Loop tiến hành đưa hàm callback từ queue lên callstack và thực hiện `console.log("world")` in `world` ra console. 






