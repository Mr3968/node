# varing-颜色插值

## 颜色线性插值

* 相邻像素之间的同一种单色成分的差值是定值，所有像素的同一种单色成分是一个等差数列，给出两个点的像素值，GPU自动内插出两点之间所有像素的值，这个过程是像素的线性插值过程

* 使用关键字attribute声明了一个表示顶点颜色数据的变量a_color，用来接受类型数组 ```var colorData = new Float32Array([0,0,1,1,0,0])```包含的顶点颜色RGB值数据，顶点位置变量apos和顶点颜色变量a_color的数据类型同样都是四维向量vec4，从这里也可以看出GLSL ES语言的关键字attribute的作用就是声明一个可以接受顶点位置坐标，顶点颜色，顶点法向量等顶点数据的变量


* 顶点着色器程序使用关键字varying声明一个v_color变量，为什么这里不使用attribute而是使用varying
    - 使用attribute关键字声明的顶点位置坐标数据执行gl_Position = apos；经过装配、光栅化后得到一系列未定义颜色的片元，执行代码v_color = a_color;就是把使用attribute关键字声明的变量a_color赋值给varying关键字声明的变量v_color，着色器会利用原始的两个颜色数据进行插值计算，计算出每一个片元对应的RGBA值。然后执行片元着色器中代码gl_FragColor = v_color；把插值计算出的每一个片元的颜色值赋值给对应片元。 6个点可以绘制2个三角面，你如果把前三个点的颜色设置为红色，后三个点设置为蓝色，那么你可以得到一个红色三角面，一个蓝色三角面。如果三个点颜色不同插值计算后会得到一个彩色的三角形

- **片元着色器程序和顶点着色程序都通过varying关键字声明一个颜色变量v_color，即varying vec4 v_color。这很好理解，两个独立的着色器单元你可以理解为两个具有串联关系的处理器，这样声明就是为了把顶点着色器插值计算后得到的颜色值v_color传递给渲染流水线中处于顶点着色器后面的片元着色器。**

- **在片元着色器中声明了 precision lowp float; 是为了定义片元着色器中的所有浮点型数据的精度，在着色器语言中lowp是精度限定字 表示低精度。计算机资源有限，设置数据精度是为了提高执行效率**

- 程序初始化initShader()后，会返回一个程序对象program，该对象包含顶点着色器中attribute关键字声明的顶点位置，顶点颜色变量。调用webgl api gl.getAttributeLocation(),可以把program对象作为该api第一个参数，位置变量apos或颜色变量a_color字符串形式作为第二个参数可以返回顶点数据变量的位置，获取了着色器中变量的位置就可以把js中对应数据传递过去