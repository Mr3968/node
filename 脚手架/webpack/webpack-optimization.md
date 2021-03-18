# webpack-optimization (优化)

* webpack4之后 会根据你选择的mode来执行不同的优化，不过所有的优化还是可以手动配置和重写的

## minimizer

* 允许你通过提供一个或多个定制过的TerserPlugin实例，覆盖默认压缩工具

### 常见的提供的定制压缩插件

* OptimizeCSSAssetsPlugin
    - 用于优化或者压缩css资源
    - 配置选项
        - assetNameRegExp: 一个正则表达式，指示应优化/最小化资产的名称。提供的正则表达式针对ExtractTextPlugin配置中实例所导出文件的文件名而不是源css文件的文件名运行。默认为```/\.css$/g```
        - cssProcessor: 用于优化/最小化css的css处理器，默认为**cssnano**这应该是遵循```cssnano.process接口的函数
        - cssProcessorOptions: 传递给的选项cssProcessor，默认为{}
        - canPrint: 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true

* TerserPlugin
    - 这个插件仅仅使用于devtool的值为```source-map,inline-source-map,hidden-source-mao,nosources-source-map```
    - 作用：有时候希望代码里面的console等在开发的时候有，在正式环境里面可以去掉log，warn等
    - 选项配置
        - test：用来匹配需要压缩的文件 默认值  ```/\.m?js(\?.*)?$/i```
        - include: 匹配参与压缩的文件
        - exclude: 排除不需要参与压缩的文件
        - parellel: 值为布尔类型 使用多进程并发运行以提高构建速度 并发运行的默认数量： os.cpus().length - 1  
        - minify: 允许你自定义压缩函数。
        - terserOptions: Terser压缩配置
            - ecma:undefined
            - parse:{}
            - compress:{}
                - warnings:false  不去除警告语句
                - drop_debugger：true 发布时去除debugger语句
                - drop_console 发布时去除console语句
                - pure_funcs：['console.log'] 配置发布时，不被打包的函数，只去掉console.log
            - mangle:true
            - module:false
            - output:null
            - format:null

* splitChunks
    - 对于动态导入的模块，默认使用webpack4+提供的全新的通用分块策略。在SplitChunksPlugin页面中查看配置其行为的可用选项
    - webpack将根据一下条件自动拆分chunks：
        - 新的chunk可以被共享，或者模块来自node_moudls文件夹
        - 新的chunk体积大于20kb（在进行min+gz之前的体积）
        - 当按需加载chunks时，并行请求的最大数量小于或等于30
        - 当加载初始化页面时，并发请求的最大数量小于过等于30
    - 当尝试满足最后两个条件时，最好使用较大的chunks
