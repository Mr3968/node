let message: string = "hello world"

// console.log(message)

enum Color { Red, Green, Blue }
let c: Color = Color.Red
// console.log(c)

// let a: void = undefined || null
// // console.log(a)

// let b: number | string | boolean = 10

// b = 'asd'
// console.log(b)

let q

q = 'ad'

q = 0

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

let arr: any[] = ['1', 0, 1534, 'asd', {}]

// console.log(arr)

class A {
    private str1: string = 'hello'
    str2: string = 'world'
    protected str3: string = '!'
}

// let a = new A()


interface ILoan {
    interest: number
}


class AgriLoan implements ILoan {
    interest: number
    rebate: number

    constructor(interest: number, rebate: number) {
        this.interest = interest
        this.rebate = rebate
    }
}

var obj = new AgriLoan(10, 1)
// console.log("利润为 : " + obj.interest + "，抽成为 : " + obj.rebate)


let sites = {
    a: 'asd',
    b: 'sdsd',
    c: <any>'asdas',
}
sites.c = function () {
    console.log(sites.a)
}
sites.c()
