1. 浏览器渲染进程中包含了 js 引擎线程 与 定时触发器线程 那么当 js 引擎执行到了 setInterval 与 setTimeOut 的时候 是定时触发器线程接管 还是 js 引擎线程继续执行（事件循环）

1. 回答：

   - 事件的执行顺序一定是可以用事件循环来解释 当是不同的浏览器对这问题的处理方式不一样
   - 测试代码：

- ```
    function main2() {

        setTimeout(() => {
            // ....这里花1秒
            var j = i;
            var a = 0;
            console.log('jjjjjjj');
            while(j < 500000000) {
                j++;
                a++;
            }
            console.log('aaaaaaaaaaaaaaa', i, a, +new Date() - start);
        }, 2000)
        var start = +new Date();
        var i = 1;
        while(i < 5000) {
            i++;
            console.log('-');
        }
        console.log('b');
    }

    main2();
  ```

- 但是在 chrom 浏览器中 打印的结果是‘b’,‘jjjjjjj’,‘aaaaaa’是同时打印的  同时**我们发现根据时间搓打印出来的值 表示 setTimeOut 的回调就是同步执行的 也就是 2s 之后就被执行了**
    - 证明 setTimeOut 函数 以及 setTimeOut 的回调函数 是与第一层的 while 函数同步执行的 所以 在 while 执行完了之后 并不会有等待过程而是直接打印 那么时间搓打印2s加上里面的while的执行时间是合理的



- 在 firfox 浏览器里面 打印完了 b 之后会有等待在打印 jjjjj 在等待打印 aaaa 同时**时间搓是2s加上里面的while的执行时间 而没有加上外部的执行时间**
    - 说明是打印b然后再执行setTimeOut也就是2s过后执行回调 再打印jjjj 然后等待while执行 打印aaaa 但是时间搓缺没有再加上第一层while的时间 不合理


- 通过再两种浏览器中观察发现无论是那种浏览器 他打印时间搓 一定是2s加上里面的while的执行时间 那么也就说明了  浏览器的定时触发器线程是与js引擎线程并行执行的  只是不同的浏览器对于定时触发器线程是不一致的 但是无论是那种都说明了  一定是并行执行并且满足事件循环
