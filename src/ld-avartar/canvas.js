'use strict'
import Avartar from './avartar.js';

class Canvas {
  el; // DOM节点
  context; // canvas上下文
  offset; // canvas DOM offset
  width;
  height;

  avartar; // canvas 中的图片

  /**
   * @param {string} id canvas的id属性
   * @param {number} width canvas初始化宽度
   * @param {number} height canvas初始化高度
   */
  constructor(id, width, height) {
    this.el = document.getElementById(`${id}`);
    this.context = this.el.getContext('2d');
    this.width = width;
    this.height = height;

    this.offset = {
      left: this.el.offsetLeft,
      top: this.el.offsetTop
    };

    this.el.onmousedown = (event) => {
      /**
       * 计算鼠标点击位置与图片边缘的距离
       */
      this.avartar.setClickPoint(
        event.clientX - this.offset.left - this.avartar.offset.x, 
        event.clientY - this.offset.top - this.avartar.offset.y
      );
      document.onmousemove = (ev) => {
        this.context.clearRect(0, 0, this.width, this.height);
        this.draw({
          x:  ev.clientX - this.offset.left - this.avartar.clickPoint.x,
          y:  ev.clientY - this.offset.top - this.avartar.clickPoint.y
        });
        this.drawMask();
      }
      document.onmouseup = (ev) => {
        document.onmousemove = null;
        this.avartar.setOffset(
          ev.clientX - this.offset.left - this.avartar.clickPoint.x,
          ev.clientY - this.offset.top - this.avartar.clickPoint.y
        )  
      }
    }
  }
  // 初始化图片
  initWithImg(imgUrl, onImgLoad) {
    this.avartar = new Avartar({
      imgUrl, 
      canvas: this,
      onImgLoad
    })
  }

  // 画头像遮罩边框层
  drawMask(style = 'rgba(240,240,240, .7)', maskWidth = 20) {
    this.context.fillStyle = style;
    this.context.fillRect(0,0,this.width, maskWidth);
    this.context.fillRect(this.width - maskWidth, maskWidth, maskWidth, this.height - maskWidth);
    this.context.fillRect(0, this.height - maskWidth, this.width - maskWidth, maskWidth);
    this.context.fillRect(0, maskWidth, maskWidth, this.height - maskWidth * 2);
  }

  /**
   * 根据当前位移绘制图片
   * @param {x: number, y: number} obj 图片位移
   */
  draw({x, y}) {
    this.context.drawImage(
      this.avartar.img, 
      x, 
      y, 
      this.avartar.width, 
      this.avartar.height
    );
  }
}

export default Canvas