1. 当父组件更新的时候 子组件的componentDidMount 是不会在去执行一次的

2. this.props.children  有的时候 我们需要去遍历这个children对子节点做一些相应的处理的情况下  组件的children里面有遍历的情况 那么此时的this.props.children并不是我们想要的一个一维数组 所以我们需要用React.children.map/forEach去做一些处理  详情见 cli/page/demo

3. 高阶组件转发ref  详情见page/home

4. 判断子元素是否只有一个 React.children.only(props.children)  有就返回他 没有就抛出错误

5. ReactDom.createPortal(child,container)
    - 将元素挂载在该container容器下

6. this.setState
    - 当调用setState的时候，组件的state并不会立即改变，setState只是把要修改的状态放入一个队列中，React会优化真正的下执行时机，并且React会处于性能的原因，可能会多次setState的状态的修改合并成一次状态修改。
    - useState同

7. ReactDom.flushSync
    - 可以将回调函数中的更新任务，放在一个比较高的优先级中
    - 可以用此api解决6上面遇到的合并的问题
        - 在用一个函数作用域中调用两次this.setState可能会合并 那么 我们可以把其中一次调用放在此api的回调里面
    