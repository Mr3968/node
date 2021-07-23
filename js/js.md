1. es6 的解构赋默认值 只能是当前的值参数为 undefined 的时候 默认值才会生效

2. svg-path:M：起点，L：直线终点 （大写绝对定位 ，小写相对定位）strokeDasharray：间隔多少像素绘制一次（虚线） fill:填充颜色

3. css 媒体查询 aspect-ratio 宽高比 -- aspect-ratio

4. 在 less 中使用 calc 需要写成 width:~"calc(100% - 100px)";

5. Promise.all 的参数是一个数组 数组中存放的是异步函数 若是同步函数则没有意义 all 的作用是使参数的数组中的异步函数去同步的执行

6. jquery 可以自定义事件 用 tigger 去触发 这样就类似于订阅发布

7. MessageChannel 是浏览器中的 api 创建一个新的消息通道，并通过他的两个 MessagePort 属性发送数据

```
let channel = new MessageChannel()

let port1 = channel.port1
let port2 = channel.port2
// 两个端口都是只读的

port1.onmessage = function (event){
    console.log("port1收到来自port2的数据"+event.data)
}
port2.onmessage = function (event){
    console.log("port2收到来自port1的数据"+event.data)
}


port1.postMessage('asd')
port2.postMessage('qwe')

// 两个端口互相传输消息

// 传输的数据是深拷贝的
```

8. font-variant-east-asian: traditional; 一行 css 代码就可以实现网站的简体中文变成繁体中文 但是这种效果是需要字体本身包含繁体变体 而在 windows 系统中的几个默认字体都没有包含繁体变体 在 OS X 也就是 iMac 或者 Mac pro 以及 ios 系统 iPad 等设备的默认中文字体是包含繁体变体的
