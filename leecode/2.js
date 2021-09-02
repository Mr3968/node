// 借助全局变量
// let func = (function () {
//   // TODO 请实现对应代码逻辑，每调用一次返回值都会加1
//   if (!window.count) {
//     window.count = 0;
//   }
//   return () => {
//     window.count += 1;
//     return window.count;
//   };
// })();

// console.log(func()); // -> 1
// console.log(func()); // -> 2
// console.log(func()); // -> 3

let func = (function () {
  // TODO 请实现对应代码逻辑，每调用一次返回值都会加1
  // 闭包实现
  let num = 0;
  return () => {
    return ++num;
  };
})();

console.log(func()); // -> 1
console.log(func()); // -> 2
console.log(func()); // -> 3
