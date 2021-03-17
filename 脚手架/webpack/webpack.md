# webpack

* 在一个项目中  不同的环境我们需要不同的webpack配置

* 就算是不同的webpack配置 也是有相同的webpack配置的

* 就可以抽成一个公共基础的webpack配置

* 然后使用```webpackMerge```来合并两个配置文件

* 使用```webpackMerge(webpack.base.js,{ ... })``` 这样就可以合并两个配置文件