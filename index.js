import Canvas from './src/ld-avartar/index.js'
  
// 获取一个canvas对象并初始化头像
const cans = new Canvas('test', 180, 180)
              .initWithImg(
                'http://images.shejidaren.com/wp-content/uploads/2018/10/035212qNc.jpg',
                (canvas) => {
                  canvas.draw({x: 0, y: 0});
                  canvas.drawMask();
                }
              );

