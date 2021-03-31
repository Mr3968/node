# webGl 入门

## Canvas 画布

- 平时交流所说的 Canvas 一词就是指 Canvas 的 2D 绘图功能，通过 Canvas 元素实现的 3D 绘图功能，也就是是所谓的 webgl 或者说 webgl 依赖于 Canvas 元素实现

> Canvas 对象方法.getContext('2d')

- 返回对象具有一系列绘制二维图形的方法，比如绘制直线，圆弧等 API

> canvas.getContext('webgl')

- 返回对象具有一系列绘制渲染三维场景的方法，也就是 WebGL API
- `let gl = canvas.getContext('webgl') // 调用webgl api绘制方法 gl.drawArrays(gl.POINTS,0,0);`

## 着色器

- 着色器代码通过着色器语言 GLSL ES 编写，对于前端工程来说学习 WebGL,还需要学习一门新的语言着色器语言 GLSL ES。
- 着色器语言用于计算机图形编程，运行在 GPU 中，平时所说的大多数语言编写的程序都是运行再 CPU 的。于 OpenGL API 相配合的是着色器语言 GLSL，于 OpenGL ES API、WebGL API 相互配合的是着色器语言 GLSL ES。 OpenGL 标准应用的是客户端 OpenGL ES 应用的是移动端，WebGL 标准应用的是浏览器平台
- 顶点着色器和片元着色器经过 WebGL 编译处理后，会在 GPU 的顶点着色器单元和片元着色器单元上执行
- 再 点.html 中，顶点着色器定义了顶点的渲染位置和点的渲染像素大小
- 再 点.html 中，片元着色器定义了点的渲染结果像素的颜色值

- 通过程序可以看出顶点着色器源码、片元着色器源码`vertexShaderSource、fragShaderSource`都是只有一个主函数 main,也就是入口函数
- 给内置函数 gl_Position 赋值`vec4(0.0,0.0,0.0,1.,)`也就是设置顶点位置坐标，vec4 代表的是一种数据类型，再这里可以理解为 vec4()是一个可以构造出 ve4 类型数据的构造函数，前三个参数表示顶点坐标值 xyz
- 给内置函数 gl_FragColor 赋值```vec4(1.0,0.0,0.0,1.0)```,也就是设置会在屏幕上显示的像素的颜色,vec4()构造函数 前三个参数，表示颜色RGB值，最后一个参数是透明度A。再WebGL着色器中颜色值使用[0,1]区间表示

### 着色器代码放在script标签中

- webgl着色器代码再js中以字符串的形式存在，编写代码比较麻烦，为了编写方便，可以把着色器代码写在script或者其他HTML标签中，然后通过元素.innerText属性获得元素中的字符串，也就是着色器的代码

## gl.drawArrays()

- 作用就是通知GPU执行着色器代码，然后根据着色器代码再Canvas画布上进行渲染绘制 