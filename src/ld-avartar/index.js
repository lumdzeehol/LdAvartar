import Canvas from './canvas.js';

const cans = new Canvas('test', 180, 180)
              .initWithImg(
                './img/img.jpeg',
                (canvas) => {
                  canvas.draw({x: 0, y: 0});
                  canvas.drawMask();
                }
              );
