1. form表单的initialValue是不受控的  所以当数据来源受控去更新页面可能值form表单的默认值也不会显示   

2. modal是动态的  当显示的时候整个DOM元素才会渲染  当你需要给子元素添加ref的时候 你需要让modal的dom元素一直存在  设置 forceRender