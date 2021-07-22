import React, { Component } from 'react';
import * as THREE from 'three';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cube = null;
  }

  componentDidMount() {
    // 创建一个场景
    this.scene = new THREE.Scene();
    // 创建创建了相机
    // 使用的是PerspectiveCamera -- 透视相机
    // 第一个参数是视野角度 第二个参数是长宽比 接下来的参数是近界面和远截面
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    // 创建了渲染器
    this.renderer = new THREE.WebGLRenderer();
    // 设置渲染器的尺寸
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // 创建立方体 需要一个BoxGeometry对象，这个对象包含一个立方体中所有的顶点和面
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    // 给立方体一个材质，让它有颜色
    let material = new THREE.MeshBasicMaterial({ color: 0xff9999 });
    // 网格包含一个几何体以及作用再次几何体上是材质，直接将网格对象放入到我们的场景中，并让它在场景中自由移动
    this.cube = new THREE.Mesh(geometry, material);
    // 默认情况下，当我们调用scene.add()的时候，物体会被添加到(0,0,0)坐标，
    // 但使得摄像机和立方体彼此在一起，为了防止 需要把摄像机的位置向外移动一点
    this.scene.add(this.cube);

    this.camera.position.z = 2;

    this.animate();
  }

  // 动画循环
  animate = () => {
    // 创建一个使渲染器能够每次在屏幕刷新时对场景进行绘制的循环，
    requestAnimationFrame(this.animate);
    // 让立方体进行旋转
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.02;
    this.cube.rotation.z += 0.02;
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div>{/* <h3>room页面</h3> */}</div>;
  }
}

export default Room;
