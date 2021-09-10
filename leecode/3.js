// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 思路： 从第一位开始 第一位与第三位 中间的第二位是否比第一位以及第三位小
// 其实就是遍历数组 从每一位开始往后推三位
// 思路错误，这样忽略了[2,1,0,1,2]这种情况

// let trap = function (height) {
//   if (height.length >= 3) {
//     let num = 0;
//     height.forEach((d, i) => {
//       let arr = [];
//       for (let index = 0; index < 3; index++) {
//         arr.push(height[i + index]);
//       }
//       if (arr[0] > arr[1] && arr[1] < arr[2]) {
//         let a = arr[0] - arr[1];
//         let b = arr[2] - arr[1];
//         num += a > b ? b : a;
//       }
//     });
//     console.log(num);
//   }
// };

// trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

// 正确思路1：先求高度为1的水 在求高度为2的水。。。
// let trap = function (height) {
//   let length = Math.max(...height);
//   let count = 0; // 记录当前的 雨水

//   for (let i = 1; i <= length; i++) {
//     findRain(i);
//   }
//   function findRain(index) {
//     let start = false;
//     let num = 0;
//     height.forEach((d, i) => {
//       if (d < index && start) {
//         num += 1;
//       }
//       if (d >= index && start) {
//         count += num;
//         num = 0;
//       }
//       if (d >= index) {
//         start = true;
//       }
//     });
//   }
//   console.log(count);
// };

// trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

// 正确思路2：求列的水  遍历每一列 永远只看当前列以及当前列左右两端的最高的列
// 然后去比较当前列与左右两端的列的高度 是否存在雨水  存在的话在算出当前雨水
// 若存在雨水则雨水的值是两端较矮的墙的高度减去当前列的高度

// let trap = function (height) {
//   let count = 0;
//   for (let i = 1; i < height.length - 1; i++) {
//     let maxLeft = 0;
//     let maxRight = 0;
//     height.forEach((d, j) => {
//       if (i > j && height[i] < d) {
//         maxLeft = d > maxLeft ? d : maxLeft;
//       }
//     });
//     height.forEach((d, j) => {
//       if (i < j && height[i] < d) {
//         maxRight = d > maxRight ? d : maxRight;
//       }
//     });
//     if (maxLeft && maxRight) {
//       count += Math.min(maxLeft, maxRight) - height[i];
//     }
//   }
//   console.log(count);
//   return count;
// };

// trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

// 以上的所有解法  均是双重遍历时间复杂度为O（m*n）或 O（n*n）
// 使用动态规划

let trap = function (height) {
  let count = 0;
  let maxLeftArr = new Array(height.length).fill(0);
  let maxRightArr = new Array(height.length).fill(0);

  for (let i = 1; i < height.length - 1; i++) {
    maxLeftArr[i] = Math.max(height[i - 1], maxLeftArr[i - 1]);
  }
  for (let i = 1; i < height.length - 1; i++) {
    maxRightArr[i] = Math.max(height[i + 1], maxLeftArr[i + 1]);
  }
  height.forEach

  return count;
};

// trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
