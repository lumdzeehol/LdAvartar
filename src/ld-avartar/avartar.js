'use strict'
class Avartar {
  img; // 图片
  width; // 宽度
  height; // 高度
  offset; // 距离canvas边框的距离
  clickPoint; // 点击事件距离图片边框的距离
  canvas; // canvas容器对象

  constructor({imgUrl, onImgLoad, canvas}) {
    this.canvas = canvas;
    this.img = new Image();
    this.img.src = imgUrl;
    this.img.onload = () => {
      this.initScaleInCanvas(this.canvas.width, this.canvas.height); 
      (typeof onImgLoad === 'function') && onImgLoad(this.canvas);
    }

    
    this.offset = {
      x: 0,
      y: 0
    };
    
    this.clickPoint = {};
  }

  // 设置相对canvas的位移
  setOffset(x, y) {
    this.offset.x = x;
    this.offset.y = y;
  }
  
  // 设置点击位置距离图片编剧的距离
  setClickPoint(x, y) {
    this.clickPoint.x = x;
    this.clickPoint.y = y;
  }

  // 根据canvas大小自适应初始化图片宽高
  initScaleInCanvas(canvasWidth, canvasHeight) {
      if (this.img.width > this.img.height) {
        this.width = canvasWidth;
        this.height = this.img.height * this.width / this.img.width;
      } else {
        this.height = canvasHeight;
        this.width = this.img.width * this.height / this.img.height;
      }
  }
  
}

export {
  Avartar
}