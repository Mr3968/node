1. 当父组件更新的时候 子组件的 componentDidMount 是不会在去执行一次的

2. this.props.children 有的时候 我们需要去遍历这个 children 对子节点做一些相应的处理的情况下 组件的 children 里面有遍历的情况 那么此时的 this.props.children 并不是我们想要的一个一维数组 所以我们需要用 React.children.map/forEach 去做一些处理 详情见 cli/page/demo

3. 高阶组件转发 ref 详情见 page/home

4. 判断子元素是否只有一个 React.children.only(props.children) 有就返回他 没有就抛出错误

5. ReactDom.createPortal(child,container)

   - 将元素挂载在该 container 容器下

6. this.setState

   - 当调用 setState 的时候，组件的 state 并不会立即改变，setState 只是把要修改的状态放入一个队列中，React 会优化真正的下执行时机，并且 React 会处于性能的原因，可能会多次 setState 的状态的修改合并成一次状态修改。
   - useState 同

7. ReactDom.flushSync

   - 可以将回调函数中的更新任务，放在一个比较高的优先级中
   - 可以用此 api 解决 6 上面遇到的合并的问题
     - 在用一个函数作用域中调用两次 this.setState 可能会合并 那么 我们可以把其中一次调用放在此 api 的回调里面

8. 类组件的 this.forceUpdate 这个函数里面是调用 this 的 所以当你需要吧这个函数传递给子组件的时候 你需要修改它 this 指向问题用回调或者 bind 等等

9. mobx 的使用 技巧 对于类组件来说 当我类组件中 render 函数中 使用了 mobx 的可观察的值的话 那么当我这个值变化的时候 是会重新触发类组件的 render 函数的

10. dangerouslySetInnerHTML 直接在vnode下面添加html代码

11. Profiler 测量一个应用多久渲染一次以及渲染一次的代价
