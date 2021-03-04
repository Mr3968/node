# Editor.js 文件里面

1. cleanData() 这个 api 的用处

2. EditorCore 组件

# ImageSourceList

1. 为什么使用发布订阅模式发送请求
   - answer: 把请求放在订阅的回调上 但在其他的地方再次遇到时 就直接调用发布 就可以是实现同步更新 并且相当于封装了一下请求的函数 加强代码的正交性

# EditorCore

1. 在里面是 loading 的时候会 return 有一个"LoadingBox"在"Layout"里面同样也会加载一个"FullLoading"组件 为什么会有两个 loading 的组件 但是渲染只会看见一个

   - 分析：
     - 看见的 loading 组件是那个？
       - answer：看见的是"LoadingBox"组件
     - "FullLoading"组件的作用
       - answer：是全局的一个轻提示的作用

2. 挂载插件的时候，挂载成功会去调用进度条的更新，那么怎么样确保 PubSub.js 文件会在 MountPlugin.js 之前进行（渲染页面之前）

3. 挂载基础插件的时候会吧插件的 config 的属性保存到当前插件对象里面（提升了一级 tool/plugins/mountBasicLayerPlugins）作用？

4. 选中多个图层的时候不会显示表示是中间的或对齐的线

# mobx

1. Transaction 的学习

# store / Editor

1. historyCache 存储的东西

   - answer : 存储的是当前这个 app 改变之后的详情 实时更新的

2. 为何当改变的逻辑能完成 但是却没有监听改变的逻辑

   - answer: mobx 的 observable 会监听 相当于获取到的都是实时的

3. h5ds-ui / util.imgLazy
   - 打印出来的 src 是 undefined
   - 图片是能渲染出来的
   - 检查完了 不是源码的问题
   - 我重写函数 注释 onerror 事件 但是还会报错 


# canvas

1. jq的语法 
   - ``` $('.h5ds-control').off('click.my-plugins') ``` 
   - 例如这样的代码 off的第一个参数为什么是事件名称加上类名？？
      - answer : 这里的第一个参数并不是事件名称加上类名 这里表示的是命名空间 举例：在同一个元素上绑定了两个相同的事件 此时像off掉其中一个特定的事件的时候 就可以使用命名空间 来确保关掉指定的事件
      
2. 控制器的相关设置  


3. CanvasPreview组件里面的 Fixed 组件 没有render

4. 在CanvasPreview 组件里面 打印pageData 只会打印一组数据 name:'空白页面' ，在CanvasPreview组件的子组件Page里面 打印传入的pageData就会打印4组不一样的值（有两组的值是一样的）  ???

