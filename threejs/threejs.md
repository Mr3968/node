# 构建一个 3D 空间需要的要素

## 场景

```
let scene = new THREE.Scene()
```

## 相机

```
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
```

- 需要传入垂直视野，宽高比，近平面和远平面

- 重置视野
  - 决定相机视图可以到达的垂直空间大小
- 宽高比
  - 用于创建基于垂直的水平视野的宽高比
- 近平面（near）
  - 相机视图开始的地方
- 远平面

  - 相机视图结束的地方
  
- ![相机参数](https://cdn.h5ds.com/uploads/s/20210706/5ff9d4f22643817dfdbd9faacd1dd01324395483.svg)

## 渲染器
