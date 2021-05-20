# 一切都是为了能更好的看懂 react 源码

# TS 基础语法

- ts 程序由以下几个部分组成
  - 模块
  - 函数
  - 变量
  - 语句和表达式
  - 注释

# TS 的基础类型

- 任意类型

  - 关键字：any

- 数字类型

  - 关键字：number

- 字符串类型

  - 关键字：string

- 布尔类型

  - 关键字： boolean

- 数组类型

  - 关键字：无
  - 例子：`let arr :number[] = [1,2]; // 使用数组泛型 let arr : Array<number> = [1,2];`

- 元组类型

  - 说明：元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同
  - 关键字：无
  - 例子：`let x : [string,number] x= ['as',1] `

- 枚举

  - 说明： 枚举类型用于定义数值集合
  - 关键字：enum
  - 例子：`enum Color{Red,Green,Blue} let c:Color = Color.Blue console.log(c) // 输出2`

- void

  - 说明：用于标识方法返回值的类型，表示该方法没有返回值
  - 关键字：void

- null

  - 关键字：null
  - 说明：表示对象缺失

- undefined

  - 关键字： undefined

- never
  - 关键字：never
  - never 是其他类型的子类型，代表从不会出现的值

## any 类型

- 任意值是 ts 针对编程时类型不明确的变量使用的一种数据类型，他常用于一下三种情况

  - 1. 变量的值会动态改变时，比如来自于用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查

  - 2. 改写现有代码的时候，任意值允许在编译时可选择地包含或移除类型检查

  ```
    let x : any = 4;
    x.ifItExists(); // 正确 ifItExists方法在运行时可能存在，但这里不会检查
    x.toFixed()
  ```

  - 3. 定义存储各种类型数据的数组时

## |

- 如果一个变量可能出现多种类型的时候，可以用|来支持多种类型

## never 类型

- 是其他类型的子类型，代表从来不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值 在函数中它通常变现为抛出异常或无法执行到终止点

## 枚举类型

- 如果枚举的某个属性是计算出来的 那么它后面一位的成员必须要初始化值

# 类型断言

- 类型断言可以用来手动指定一个值的类型，即允许一种类型更改为另一种类型

- 当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时 S 能被成功断言成 T。这是为了在进行类型断言时 提供额外的安全性 毫无根据的断言是危险的 如果你想 那么可以使用 any

- 类型断言之所以不被称为类型转换，是因为转换通常意味着某种运行的支持。但是 类型断言纯粹是一个编译的语法 同时，它也是一种为编译器提供关于如何分析代码的方法

# 类型推断

- 当类型没有给出时 ts 编译器利用类型推断来推断类型

- 如果由于缺乏声明而不能推断出类型， （即声明了变量没有进行赋值）那么它的类型被视作默认的动态 any 类型

# 位运算符

- ^

  - 异或运算，对等长二进制模式按位或二进制的每一位执行逻辑异按位或操作。操作的结果是如果某位不同则该位为 1.否则该位为 0

- <<

  - 左移，把<<左边的运算数的各二进位全部左移若干位，由<<右边的数指定移动的位数，高位丢弃，低位补 0

- > >

  - 右移，把>>左边的运算数的各二进位全部右移若干位，>>右边的数指定移动的位数

- > > >
  - 无符号右移，与有符号右移位类似，除了左边一律使用 0 补位

# 函数

## 函数返回值

```
function name ():return_type {
  // 语句
  return value
}
```

- return_type 是返回值的类型 返回值的类型需要与函数定义的返回类型（return_type）一致

## 函数参数类型定义

```
function name (param1:[dataType],param2:[dataType]){
  // 语句
}
```

- dataType 为参数类型

## 可选参数

```
function name (fitstName:string,lastName?:string):string {
  if(lastName){
    return firstName + lastName
  }else{
    return firstName
  }
}
```

- 可选参数必须是跟在必须参数后面

## 默认参数

```
function function_name(param1[:type],param2[:type] = default_value) {

}
```

- 参数不能同时设置为可选和默认。

# 数组

- 如果数组声明时未设置类型，则会被认为是 any 类型，在初始化时根据第一个元素的类型来推断数组的类型

- 联合类型数组

```
let arr :number[] | string[];
arr = [1,2,4]
arr = ['a','b','c']
```

# 接口

- 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法

- 定义

```
interface interface_name {
  //
}
```

## 联合类型接口

```
interface RunOptions {
    program:string;
    commandline:string[]|string|(()=>string);
}

// commandline 是字符串
var options:RunOptions = {program:"test1",commandline:"Hello"};
console.log(options.commandline)

// commandline 是字符串数组
options = {program:"test1",commandline:["Hello","World"]};
console.log(options.commandline[0]);
console.log(options.commandline[1]);

// commandline 是一个函数表达式
options = {program:"test1",commandline:()=>{return "**Hello World**";}};

var fn:any = options.commandline;
console.log(fn());
```

## 接口与数组

```
interface nameList {
  [index:number]:string
}
let list :nameList = ['aa','bb','cc']
// 数组也可以看成是特殊的对象 它的键为索引 索引一定是number类型 所以这个interface 实际上相当于是在约束数组
```

## 接口继承

```
// 单接口继承
Child_interface_name extends super_interface_name
// 多接口继承
Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name
``
```

# 类的访问控制符

- ts 中，可以使用访问控制符来保护对类，变量，方法和构造方法的访问。ts 支持 3 中不同的访问权限

- public（默认）: 共有，可以在任何地方被访问

- protected: 受保护，可以被其自身以及子类访问

- private： 私有，只能被其定义所在的类访问

# Ts 对象

- ts 声明的对象如果想要新增一个方法或属性 是会报错的 因为 ts 的对象必须是特定类型的实例 意思就是新增的属性或方法必须是对象已经存在的属性
- 相当于只能修改 不能新增

# 鸭子类型

- 鸭子类型是动态类型的一种风格，是多态的一种形式
- 在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由当前方法和属性的集合决定

- 在不使用鸭子类型的语言中，我们可以编写一个函数，它接受一个类型为鸭子的对象，并调用它的走和叫的方法，在使用鸭子类型的语言中，这样一个函数可以接受一个任意类型的对象，并调用它的走和叫方法。如果这些需要被调用的方法不存在，那么将引发一个运行时错误。

# 命名空间

```
// IShape.ts 文件代码：
namespace Drawing {
    export interface IShape {
        draw();
    }
}
// Circle.ts 文件代码：
/// <reference path = "IShape.ts" />
namespace Drawing {
    export class Circle implements IShape {
        public draw() {
            console.log("Circle is drawn");
        }
    }
}
// Triangle.ts 文件代码：
/// <reference path = "IShape.ts" />
namespace Drawing {
    export class Triangle implements IShape {
        public draw() {
            console.log("Triangle is drawn");
        }
    }
}
// TestShape.ts 文件代码：
/// <reference path = "IShape.ts" />
/// <reference path = "Circle.ts" />
/// <reference path = "Triangle.ts" />
function drawAllShapes(shape:Drawing.IShape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
```

- 命名空间嵌套

```
namespace Runoob {
   export namespace invoiceApp {
      export class Invoice {
         public calculateDiscount(price: number) {
            return price * .40;
         }
      }
   }
}
```
