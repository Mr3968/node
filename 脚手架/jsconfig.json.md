# jsconfig.json

* 表示该目录是js项目的根目录。jsconfig.json文件指定跟文件和js语言服务提供的功能选项

## compilerOptions对象的属性

* noLib 
    - 不包含默认库文件

* target
    - 指定要使用的默认库 值是
        - es3,es5,es6,es2015,es2016,es2017,es2018,esnext

* checkJs
    - 启用js文件的类型检查
    - 默认值为true

* experimentalDecorators
    - 为拟议的ES装饰器提供实验支持

* allowSyntheticDefaultImports
    - 允许从没有默认导出的模块进行默认导入。这不会影响代码发出，只会影响代码类型检查
    - 默认值为true

* baseUrl
    - 用于解析非相对模块名称的基目录

* paths
    - 指定相当于baseUrl选项计算的路径映射（路径别名）