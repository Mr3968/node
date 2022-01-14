# 编辑器的学习（从业务逻辑上分析）

```onst platform = util.getPlatform() // 获取当前是windows还是mac的方法```
- 一进入是 home/home-index 页面

  - 首先判断是否登录 如果没有登录渲染的就是 login 组件 登录了就有一个 Link 组件包裹的"应用列表"
  - 点击应用列表会进入 manage/index 是 UserContent 组件 二级路由 index 无效

- manage 页面

  - 渲染用户已经创建了的 app
  - 通过已经创建了的 app 点击编辑 进去编辑器 或者是通过新建一个应用来进入编辑器
  - 引用了 H5Item 组件 渲染用户已经创建了的 app 每一个 app 都有自己的 appId
  - 如果是通过新建应用进入编辑器 在调用创建应用的接口的时候 传递的参数就是新 app 的默认参数`{appData:'defaultData',categoryId:"1",coverImageUrl:"http://cdn.h5ds.cn/static/images/img-null.png" // 系统默认图片}` 通过返回的 appId 进入编辑器 `editor/${appId}`

- editor 页面
  - 在此页面引入插件
  - 进入时获取 url 上的 appId
    - 获取到这个 app 的类型 user,template 只要不是 template 那么获取的就是 app 详情 否则就是获取的 tamplate 详情
      - 在获取到的详情上对数据进行一次清洗 （之前版本的数据 以及 全局配置的更改 以及 一些资源路径的替换）
  - 渲染"EditorCore"这个组件
    - 组件会加载插件
    - 传入编辑器的配置"options"
      - 编辑器需要的各种接口封装的函数以及 modal 等等
    - 设置默认主题
    - 挂载插件自带资源
  - "EditorCore"无 dom 节点 引入的"layout"组件
    - "layout"渲染的就是编辑器的页面
    - "EditorCore"组件 loadOver 为 fasle 的时候会 return 一个 LoadingBox 组件 在这个组件中去订阅 loading 的进度条的改变，当他真的改变了的时候就会去调用发布接口来实现进度条的实时更新，当前的更新状态有 30%，70%分别对应加载 js 以及 plugins
  - this.props 参数会保存至仓库其他组件来通过仓库访问

---

## 从 layout 开始分析

- useEffect / elementResizeEvent

  - 监听页面的变化 重新去设置 layoutSize
  - 第一个参数为目标节点。第二个参数为改变的回调
  - 回调里面调用了 debounce 防抖 不用每次改变都执行而是最后一次改变执行
  - 回调里面重新去获取页面的高度然后调用仓库的`setWindowSize`
  - `setWindowSize`里面调用移动画布`this.containerPosition`重新赋值他的 width，height
  - 真正起到监听 size 变化的方式是`elementResizeEvent`而不是 useEffect

- useEffect

  - 在生产环境下 即将退出时要显示是否要退出编辑器

- render

  - 在渲染之前先判断左侧的操作面板是否打开
  - 打开就是 360px
  - 关闭是 60px

- 插件的点击事件
  - 获取原始数据
  - 添加一个图层
  - 历史记录上添加一个记录
  - 图层的 index 为 0
  - 每一个页面对应的数据就是 pageData,pageData 里面有一个 layers 用来存放图层数据
  - 添加的时候没有不居中添加就直接居中添加
  - 数据清洗
  - 触发添加图层之前的函数以及添加图层的回调
  - 把当前图层的信息加入到 pageData 的 layers 里面的第一个
  - 添加数据后选中元素
  - 调用`layout.updateComponet('timeline,setting')`更新视图

## Header 组件

- Menus 组件
  - useEffect
    - 在 Menus 组件里面`useEffect`每分钟会保存一次 app
  - 保存 app
    - 通过仓库的 appData 来获取到当前使用了那些插件
      - 调用 appUtil 下 getPidByData 方法
      - getPidByData 方法内部调用了 this.getPid 从 pages,fixeds,popups 三个地方获取他们的 layers 的 pid+version
      - 然后在对 pids 数组进行去重 去掉默认插件，去掉空的
      - 保存成功之后调用`editor.updateHistoryList = util.randomID()`
      - 把最新的数据重新保存至 localStorage/H5DS_APP_DATA（此时的 editor.appData 还没有更新）
  - 对齐
    - 会拿到当前选中图层数组的 length
    - 当 length 大于 1 时才会水平等间距，垂直等间距
  - 撤销
    - 发布销毁控制器
    - 然后判断历史记录
      - 当缓存数组大于 0,当历史记录 index 大于等于 1 才会有效
      - historyIndex--
      - appData 回到上一次的 appData //..
      - reRenderView 强制渲染 editor
      - 调用`this.forceUpdateSet(key)` 重新渲染需要重新渲染那些东西
        - 此方法接受一个参数表示指定重新渲染那些地方
        - 若没有参数则所有的都会重新渲染
        - 页面高度，数据区域，其他区域，动画区域，事件区域，自定义编辑区域，自定义编辑区域，更新位置区域，
      - 调用`layout.updateComponent('pageList', 'script')`
        - 此方法的参数表示指定那个改变
        - 参数为: pageList,footer,timeline,setting,script
  - 重做(下一步)
    - 与撤销的业务是基本差不多的
    - historyIndex 是++
    - 判断上 historyIndex 最多是 historyCache.length - 1
  - 播放
    - 改变 playAnimateKey 的值 
  - 缩放
    - 缩放的值会根据屏幕的尺寸来显示每当屏幕的尺寸改变的时候会在去重新设置 scale 值
- SubMenus 组件
  - 切换主题
    - 给 body 标签添加类并加载对应的 css 文件（antd 对应的版本）
  - 清理缓存
    - 先调用 savaApp 然后吧 application 里面的`H5DS_APP_DATA`数据设置为空

## Sidebar 组件

- showPanelName
  - 对于插件的一个分类
    - 文本 -- textSource
    - 图片 -- imageSource
    - 图表 -- chartSource
    - 地图 -- mapSource
    - 装饰 -- decorateSource
    - 形状 -- shapeSource
    - 更多 -- pluginSource
  - 点击事件
    - 每个分类的点击都是把仓库 showPanelName 改变成自身对应的值**除了图片**
    - 根据@observable 的特性监听了这个值 其他的组件会去实时的获取到这个值 并做出相应的操作
  - 图片的点击事件
    - 调用发布事件去发布`h5ds.imageSource.show`事件，第二参数传递一个回调利用发布订阅的特性在发布时执行的函数里面 去把这个回调保存在订阅事件的组件中(`ImageSource`组件)
    - 当前回调做的事
      - 回调会被赋值给图片 item 的点击事件
      - 回调接受一个参数`data`
      - 执行`editor.addLayerByPid`函数
        - `_img.naturalWidth`获取图片的原始宽度
        - `_img.naturalHeight`获取图片的原始高度

## Panels 组件

- template 组件在 datav 项目中不存在

- 获取到资源列表并进行分类

- `editor.showPanelName === panelName`满足这个条件的类型才会被渲染
  - 有三中类型的组件会被渲染
    1. 通过实例 Editor 传入的
    2. `PanelPageList`组件
    3. `PluginGroup`组件
  - 在`PluginGroup`组件中
    - 点击 Item 之前会去判断一下
    - 判断时候是文本，图片等 如果是会重新去修改`showPanelName`也就是重新渲染整个`Panels`区域

## LayerList 组件

- 选择图层

  - 在仓库中存储一个数组 用来存储图层下标
  - 按住 shift 不放开去选中图层是选择的两次选中以及他们之间的图层
  - 按住 alt 不放开去选择图层是单击就是选择或者取消选择
  - 实现的原理：
    - 按住 shift 的时候
      - 每次的选择都会去临时的记录`this.tempSelectLayerIndex`下当前选择的下标`layerIndex`
      - 按住 shift 的时候去比较两者的大小
      - 大的赋值给 maxIndex,小的赋值给 minIndex
      - 然后遍历 minIndex 于 maxIndex 之间的就是按住 shift 选中的图层
      - 在按钮 shift 操作的时候 需要确保当前已经有被选中的图层
    - 按住 alt 的时候
      - 首先判断用户的是 windows 还是 mac 一个是 ctrlKey 一个是 metaKey
      - 当点击的时候就去查找选中的数组里面是否有当前点击的 keyid 有就删除没有就添加
  - 每一个被选中的都会去调用 setControl 去打开他的控制边框

- 锁定图层

  - 在图层中会存储一个`set`对象，对象下会有一个 lock 来标识当前图层是否会被锁定
  - 点击判断当前是否被锁定 没有就锁定 锁定了就解锁

- 修改图层名称

  - 通过判断传入的下标以及 state 的下标 来比较是否相等
    - 如果相等就说明是需要保存输入框的值以及更改名称
    - 如果不相等就说明是需要打开输入框进入编辑状态
  - 把输入框的值赋值给当前图层的`name`值

- 显示隐藏图层
  - 在图层中会存储一个`set`对象，对象下会有一个`hide`来表示当前是否隐藏
  - 当为 false 的时候表示不隐藏 为 true 的时候表示隐藏

## Canvas 组件

- componendDidMount

  - 鼠标滚轮的事件监听
    - 根据监听的回调函数的第四个参数来判断应该放大还是缩小
      - 为正就是放大 为负就是缩小
    - 兼容 ie 兼容 mac
      - 兼容 mac `util.getPlatform()`
      - 兼容 ie `ev.returnValue = false`
    - 缩小画布 `zoomOutCanvas`
    - 放大画布 `zoomInCanvas`
    - 每一次放大缩小的时候 需要调整页面的高度 `top`值

- 在 canvas 的根元素上 会标识当前是横屏还是竖屏

### DrawPathAnimate
1. 贝塞尔曲线的绘制
  - 监听鼠标的`mousedown`事件  去获取当前点击时的target的data-index，data-type两个属性  
  - 根据index 以及type来对相应的点进行操作  没有就是添加这个点 移动的时候 相应的改变他的坐标
  - 绘制了点之后 会把所有点的坐标受控 方便进行path的绘制  
    - path:M：起点，L：直线终点 （大写绝对定位 ，小写相对定位）strokeDasharray：间隔多少像素绘制一次（虚线） fill:填充颜色 
  - 取消挂载的时候 会取消事件的监听 



### CanvasPreview 组件

1. componentDidMount

- 执行`initDragSelectGroupEvent`函数

  - 初始化选择的事件 以及监听'.h5ds-canvas'的 mousedown 事件
  - 每当点击这里的时候 都会去判断
    - 控制器是否打开
    - 当前点击的地方是否点击在了 图层上
      - 如果没有就是空白出点击 就销毁控制器
      - 如果有就 return

- 自动适配画布的大小

  - 调用 `editor.autoScale`
    - 重新去计算当前的 scale 的值
    - 根据数据的宽高值（适时变化的） 以及给定的画布的 100%缩放时的值来计算 当前的 scale 的值
      - 定义两个值 一个以宽度来计算 一个以高度来计算
      - 比较这两个值 以小的值来重新定义当前的 scale 的值

- 绑定事件

  - 调用`dragGroupEvent(getSelectPageData,getLayersDOM,editor)`
    - 传入的参数为 获取当前 page 的数据 以及 DOM 节点 以及`store/editor`的相关数据
    - 监听`h5-canvas-preview`的多图层拖动 （若多图层被合并成了一个图层 那么其实走的是单图层拖动）
      - 手动修改他的 left top 值来完成拖动 所以需要监听他的 mousedown，mousemove，mouseup
      - 在事件`mouseup`里面需要调用`editor.setHistory`方法来记录当前的历史记录

- 初始化控制器事件

  - 点击空白会去销毁 layer 的控制器
    - 首先确定没有点在图层上 是点击的空白处
    - 调用发布`h5ds.destoryControl`
      - 发布时执行的回调
        - 找到'.h5ds-control' 并删除掉里面的所有元素
  - 订阅初始化控制器方法
    - name: h5ds.initControl
    - callback: 执行 `this.initControlCallback()`

- store/Editor -- pageTab 用来标识页面 tab 的类型
  - "page" , "popup" , "fixed"
  - page,popup,fixed
  - 不为"popup"就渲染 Page 组件
  - 为"popup"且 popupData 有值 就渲染 Popup

#### Page 组件

**帧动图层不可滑动**

- 回去遍历当前的图层 以及获取的插件 把插件的当作参数传入到 Layer 组件的 children

- 存储用户自定义的 JS 文件 并注入内部相应的代码 让用户可以自定义调用
  - 用户自定义的内容只会在预览发布页面才会去执行
  - 注入：
    - 音乐：
      - 播放音乐函数
        - playSound // 参数为 id
      - 停止播放音乐函数
        - stopSound // 参数为 id
      - 通过 id 找音乐
        - getSound // 参数为 id
      - 暂停播放音乐
        - pauseSound // 参数为 id
    - layer:
      - 通过 id 查询 layer
        - getLayerDataById // 参数为 id
      - 通过 className 查询 layer
        - getLayerDataByClassName // 参数为 className
    - 页面
      - 普通更新整个页面
        - updatePage // 参数为回调函数 可不传
      - 更新弹窗的视图
        - updatePopups // 参数为回调函数 可不传
      - 更新浮动层的视图
        - updateFixeds // 参数为回调函数 可不传
    - 图层：
      - 通过 keyid 去更新对应的图层
        - updateLayerByKeyid // 参数为存放 keyid 的数组
      - 通过 id 去更新对应的图层
        - updateLayerByIds // 参数为存放 id 的数组
      - 通过 class 更新对应的图层
        - updateLayerByClass // 参数为存放 className 的数组
    - 分享微信
      - setWeiXinShare // 参数为一个对象 title imgUrl desc 属性
    - 长页
      - 当前是否未长页
        - isLangPage

##### Layer 组件

- Layer 组件用来渲染图层的
  - 每一个图层上对应了一个插件，插件在 Layer 上进行渲染
  - pages ==> layers 数组 （图层对应的数组）

- 长页判断
  - 如果是长页 元素在可视区域才会显示
    - 小于可视区域直接 return null

- 设置动画
  - layer.animate数组中每一位是一个对象 对象中存储了动画的相关 

- 在layer中点击事件中 回去执行当前的插件的事件  ```layer--->events []```
  - 事件是存放在events数组中 
    - h5ds_event_topage
    - h5ds_event_toggle_layer
    - h5ds_event_trigger_animate
    - h5ds_event_toggle_popup
    - h5ds_event_sound
    - h5ds_event_click
    - h5ds_event_link
    - h5ds_event_msg
    - h5ds_event_tel
    - 对事件的名字

  - layer中动画样式
    - 分为进入动画与强调动画与离开动画 
    - 离开动画回设置一个setTimeOut 未了确保离开动画一定是在render完了之后执行 
      - 怎样确保render已经执行完了  ---- 通过ref 有值说明已经执行完了



### SetSize
* 设置画布的宽度以及高度
  - 竖屏的情况下只能设置高度 

### PhoneLine
* 画布中对应的手机表示线

### RulerLine
* 网格以及 画布的刻度线

### Navigator
* 画布右下角的缩略图 
  - 对缩略图进行缩放 画布会相应的进行缩放 

### ContextMenu
* 右键插件的时候 出来的菜单
  - 置顶
  - 置底
  - 上移一层
  - 下移一层
  - 复制图层
  - 粘贴图层
  - 删除图层
  - 保存图层
  - 合并图层
  - 打散图层
  - 拷贝动画
  - 粘贴动画
  - 所有的操作原理都是对当前插件的数据进行的操作 pages--->layers

## Footer
* 时间轴以及JS脚本的绘制

1. 时间轴
  - 刻度线的绘制 以及 图层列表的展示及相应的操作 

2. JS脚本
  - 编写代码以及相干函数的提示 

## Toolbar
* 导入psd文件
* 设置全局背景
* 背景音乐
* 历史记录
* 网格开关
* 截图
  - 源码在dom-to-images.js文件 源码相对繁琐

## Setting
* 页面设置
  - 当选中的图层为1的时候才会去渲染
    - 图层样式
    - 图层动画
    - 图层交互（事件设置）
  -  当选中的图层大于1的时候渲染组合设置
    - 设置当前组合图层的
      - 动画间隔
      - 动画延迟
      - 等比缩放
      - 随机大小
      - 环形分布
      - ...
  - 当没有选中图层时
    - 渲染当前页面的设置
      - 对于对应page的数据进行操作

## SourceModal
* 挂载音频modal以及图片modal
* 来源是外部传来的参数 