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

9. mobx 的使用 技巧 对于类组件来说 当我类组件中 render 函数中 使用了 mobx 的可观察的值的话 那么当我这个值变化的时候 是会重新触发类组件的 render 阶段

10. dangerouslySetInnerHTML 直接在 vnode 下面添加 html 代码

11. Profiler 测量一个应用多久渲染一次以及渲染一次的代价

12. Suspense 在动态导入的帮助下，让我们轻松定义延迟加载组件

- 配合 react.lacy 使用
- api 还不稳定

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        // 可包裹多个
      </Suspense>
    </div>
  );
}
```

13. useLayoutEffect

- 这个是用在处理 DOM 元素的时候，当你的 useEffect 里面的操作需要处理 DOM，并且会改变页面的样式，就需要用这个，否则可能会出现闪屏问题，useLayoutEffect 里面的 callback 函数会在 DOM 更新完成后立即执行，但是会在浏览器进行任何绘制之前运行完成，阻塞了浏览器的绘制

- 他是在 DOM 树已经在内存中构建完毕 ref 等赋值已经完成 所有在 useLayoutEffect 中能拿到 useRef 的值

- useLayoutEffect 是在 layout 阶段同步执行回调

14. 调用 getSnapshotBeforeUpdate

- 16 版本之后 componentWillXXXX 钩子前增加了 UNSAFE 前缀
  - 原因是 因为 Stack Reconciler 重构为 Fiber Reconciler 后，render 阶段的任务可能中断/重新开始 对应的组件在 render 阶段的声明钩子（componentWillXXX）可能触发多次 与 15 版本不一致 因此标记为 "UNSAFE\_"

- 所以出了代替的生命周期钩子 getSnapshotBeforeUpdate
  - 因为 getSnapshotBeforeUpdate 是在 commit 阶段的 before mutation 阶段调用的 由于 commit 阶段是同步的 所有不会遇到多次调用的问题

- 此 api 必须与 componentDidUpdate 配合使用 主要是用在可能更改 DOM 之前从 DOM 中获取一些信息，比如滚动的位置 这个方法返回的任何值，都会传递给 componentDidUpdate(nextProps,nextState,snapshot)

- 可能会出现在需要以特殊方式进行处理 UI 时调用

- 他接受两个参数 prevProps preState
