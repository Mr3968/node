var message = "hello world";
// console.log(message)
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
// console.log(c)
var a = undefined || null;
// console.log(a)
var b = 10;
b = 'asd';
console.log(b);
