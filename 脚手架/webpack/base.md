# webpack的基本信息

* webpack的运行环境是node
    - 那么webpack的里面的console一定也是在控制台输出而不是浏览器
    - 同时node里面有很多的内置模块 比如 path

* webpack的多个配置文件
    - 在一个项目中  不同的环境我们需要不同的webpack配置
    - 就算是不同的webpack配置 也是有相同的webpack配置的
    - 就可以抽成一个公共基础的webpack配置
    - 然后使用```webpackMerge```来合并两个配置文件
    - 使用```webpackMerge(webpack.base.js,{ ... })``` 这样就可以合并两个配置文件

* devtool
    - 用来配置是否生成，以及如何生成source map
    - 值为: 值为string , false
    - 在开发环境下 我们想要知道控制台打印的信息或者报错的信息所对饮的代码行 但是webpack为我们打包之后的代码 变量名，文件名等等全部变了  就不能看到自己想要看到的console信息 那么这个时候就需要设值devtool 来生成source map来查看控制台的信息对应的代码行
    - 当然在生产环境下 需要设置为none 避免源代码的泄露

* Resole
    - 配置webpack如何寻找模块对应的文件
    - alias
        - 配置项通过别名来吧原导入路径映射成一个新的导入路径 （路径别名）
    - extensions
        - 在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在
        - 默认为['.js','.json']
    - modules
        - 配置webpack去那些目录下寻找第三方模块
        - 默认是node_moduls