# hook

* useState监听的是地址（原始地址或者引用地址）
    - 只有当地址改变了的时候 他才会去执行render函数 当地址没有改变 但是值变了 那么react也是不会去执行render函数的