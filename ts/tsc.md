# 常用编译参数

* --help
    - 帮助信息

* --module
    - 载入扩展模块

* --target
    - 设置ECMA版本

* --declaration 
    - 额外生成一个.d.ts扩展名的文件

* --removeComments
    - 删除文件的注释

* --out
    - 编译多个文件合并到一个输出的文件

* --sourcemap
    - 生成一个sourcemap(.map)文件
    - sourcemap是一个存储源代码与编译对面位置映射的信息文件

* --module nolmplicitAny
    - 在表达式和声明上有隐含的any类型时报错

* --watch
    - 在监视模式下运行编译器，会监视输出文件 在他们改变时重新编译