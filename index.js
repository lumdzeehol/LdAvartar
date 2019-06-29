import Canvas from './dist/index.js'
  
// 获取一个canvas对象并初始化头像
const cans = new Canvas('test', 180, 180)
              .initWithImg(
                './img/img.jpeg',
                (canvas) => {
                  canvas.draw({x: 0, y: 0});
                  canvas.drawMask();
                }
              );

