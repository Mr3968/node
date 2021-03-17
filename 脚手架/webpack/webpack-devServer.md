# devServer的常用属性

* deverServer.inline
    - 在derServer的两种模式之间切换，默认情况下，应用程序启用内联模式，这意味着一段处理实时重载的脚本被插入到你的包中，并且构建消息将会出现在浏览器控制台
    - 也可以使用iframe模式，它在通知栏下面使用<iframe>标签，包含了关于构建的消息，切换到iframe模式 inline:false


* deverServer.disableHostCheck
    - 设置为true时，此选项绕过主机检查 **不建议这样做** 因为不检查主机的应用程序容易受到DNS重新连接攻击

* deverServer.historyApiFallback
    - 当使用HTML5 History API时，任意的404响应都可能需要被代替为 index.html devServer.historyApiFallback 默认禁用 

* devServer.contentBase
    - 告诉服务器从那个目录中提供内容，只有在你想要提供静态文件时才需要
    - 也可以从多个目录提供内容 contentBase:[  ]