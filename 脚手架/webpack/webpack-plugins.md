# webpack的常见插件

* CopyWebpackPlugin
    - weback中打包拷贝静态资源文件插件
    - 用于webpack打包时拷贝文件的插件包
    - 使用
        - ```new CopyWecpackPlugin([{ from:path.resole( _dirname, '../static' ),to:...// 定义到要拷贝到的目标目录，非必填，不填写则拷贝到打包的output输出地址中 }])```


* HtmlWebpackPlugin 
    - 作用：
        1. 生成项目的主图口html文件，一般原则是spa的话会生成一个html文件，多应用的话会生成多个对应的html文件
        2. 管理生成的html中引入js,css等资源配置，一般在多应用中会体现的比较突出一些
    - 使用：
        - ```new HtmlWebpackPlugin({ hash: false, template: resolve('../src/index.html'), filename: 'index.html' }),```
    - 配置
        1. template：本地模板的所在的文件路径，支持的加载器有html(常用),ejs(默认)等
        2. filename：输出的文件名称，默认是index.html，注意：**这个文件的生成路径是相对于webpack中的output.path而言的**
            - 例子：若output.path为dist文件夹，则
                - filename:'index.html' // dist文件夹 -> index.html文件
                - filename:'test/index.html' // dist文件夹 -> test文件夹 -> index.html
        3. hash:true/false, 默认为false,是否每次为文件中引入的静态资源如js,css等路径后面加上唯一的hash值
        4. inject:向template中注入静态资源的位置
            - true/body: js资源注入body中
            - header: js资源注入到header中
            - false：css和js都不会注入
        5. favicon: 添加特定的favicon路径输出到html中，需要在模板中单独配置
        6. title: template的title属性，需要子啊模板中单独配置
        7. chunks: 允许插入到模板中的chunk，如果不配置的话则会向entry中所有的打包出来的文件引入到模板中，这个一般在多应用中经常使用
        8. excludeChunks: 于chunk功能相反 
        9. chunksSortMode: no/auto/function 默认为auto，打包文件引入到模板的顺序模式
        10. showErrors: false/true 默认为true,是否讲生成模板过程中的错误信息输入到模板上
        11. xhtml: false/true 默认为true 是否渲染link标签为自闭形式
        12. templateParameters
    - 上面所提及到的chunk就是打包后的静态资源比如一个js文件或者一个css文件以一个link或者script标签的形式插入到html文件中 这整个标签就称之为chunk

* webpack.DefinePlugin
    - 这个插件是用来配置全局变量的
    - 参数为一个对象
    - 如果变量为一个字符串 那么需要写成 ``` '" some str "' ```