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
// let a: void = undefined || null
// // console.log(a)
// let b: number | string | boolean = 10
// b = 'asd'
// console.log(b)
var q;
q = 'ad';
q = 0;
// console.log(q)
// console.log(q == false)
// 位运算符
// var a:number = 2;   // 二进制 10 
// var b:number = 3;   // 二进制 11
// var result; 
// result = (a & b);     
// console.log("(a & b) => ",result)
// result = (a | b);          
// console.log("(a | b) => ",result)  
// result = (a ^ b);  
// console.log("(a ^ b) => ",result);
// result = (~b); 
// console.log("(~b) => ",result);
// result = (a << b); 
// console.log("(a << b) => ",result); 
// result = (a >> b); 
// console.log("(a >> b) => ",result);
// result = (a >>> 1); 
// console.log("(a >>> 1) => ",result);
// function disp(s1:string):void; 
// function disp(n1:number,s1:string):void; 
// function disp(x:any,y?:any):void { 
//     console.log(x); 
//     console.log(y); 
// } 
// disp("abc") 
// disp(1,"xyz");
var arr = ['1', 0, 1534, 'asd', {}];
// console.log(arr)
var A = /** @class */ (function () {
    function A() {
        this.str1 = 'hello';
        this.str2 = 'world';
        this.str3 = '!';
    }
    return A;
}());
var AgriLoan = /** @class */ (function () {
    function AgriLoan(interest, rebate) {
        this.interest = interest;
        this.rebate = rebate;
    }
    return AgriLoan;
}());
var obj = new AgriLoan(10, 1);
// console.log("利润为 : " + obj.interest + "，抽成为 : " + obj.rebate)
var sites = {
    a: 'asd',
    b: 'sdsd',
    sayHello: function () { }
};
sites.sayHello = function () {
    console.log(sites.a);
};
sites.sayHello();
