/**
 * 假设你是球队的经理。对于即将到来的锦标赛，你想组合一支总体得分最高的球队。球队的得分是球队中所有球员的分数 总和 。
 * 然而，球队中的矛盾会限制球员的发挥，所以必须选出一支 没有矛盾 的球队。
 * 如果一名年龄较小球员的分数 严格大于 一名年龄较大的球员，则存在矛盾。同龄球员之间不会发生矛盾。
 * 给你两个列表 scores 和 ages，其中每组 scores[i] 和 ages[i] 表示第 i 名球员的分数和年龄。
 * 请你返回 所有可能的无矛盾球队中得分最高那支的分数
 */

// scores = [4,5,6,5], ages = [2,1,2,1]

// 球队的球员数量是不确定的 所以首先要保证这个球队是没有矛盾的 在去计算分数
// 存在一个人一个球队且分最高的情况

// 思路1： 把年龄当作分数的减分项 去计算分数加上年龄的值  -----------思路错误 球队的球员数量是不确定的

// 思路2：手动确定球员的数量 设置为ages.length  为此手动减一 递归的去计算  ----------计算过于繁琐 或许能实现 但性能一定垃圾

// 正确思路：数据量比大 不支持进行所有子集的枚举 希望有一种顺序在进行选择的时候不会发生冲突
//

//   const teamArr = [];
function bestTeamScore(scores, ages) {
  let length = scores.length;
  let flag = isTrue(scores, ages, length);
  console.log(flag);
  if (flag) {
    let count = 0;
    scores.forEach((d) => {
      count += d;
    });
  }
}

// 判断是否矛盾
function isTrue(scores, ages, length) {
  let count = 0;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (ages[j] > ages[i] && scores[j] > scores[i]) {
        count++;
      }
    }
  }
  if (count / 2 === length) {
    return true;
  } else {
    return false;
  }
}

// 从给定的数组中返回length个球员的球队信息  ---分数 年龄
function findTeam(scores, ages, length) {}

bestTeamScore([1, 3, 5, 10, 15], [1, 2, 3, 4, 5]);

//   this.stimer = setInterval(function () {
//     check();
//   }, 4000);
//   var check = function () {
//     function doCheck(a) {
//       (function () {}["constructor"]("debugger")());
//       doCheck(++a);
//     }
//     try {
//       doCheck(0);
//     } catch (err) {}
//   };
//   check();
