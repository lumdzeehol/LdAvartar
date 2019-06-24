(function(){
  var canvas = document.querySelector("#test");
  var cxt = canvas.getContext("2d");
  const canvasW = 180;
  const canvasH = 180;
  const img = new Image();

  const initCanvasImg = (imgObj, {canvasW, canvasH}) => {
    const drawObj = {w: 0, h: 0};

    if (imgPos.w > imgPos.h) {
      drawObj.w = canvasW;
      drawObj.h = imgPos.h *drawObj.w / imgPos.w;
    } else {
      drawObj.h = canvasH;
      drawObj.w = imgPos.w * drawObj.h / imgPos.h;
    }
    return drawObj;
  }

  const imgPos = {x: 0, y: 0};

  img.src = 'http://images.shejidaren.com/wp-content/uploads/2018/10/035212qNc.jpg';
  img.onload = () => {
    imgPos.w = img.width;
    imgPos.h = img.height;

    const drawObj = initCanvasImg(imgPos, {canvasW, canvasH});
    console.time();
    cxt.drawImage(img,0,0, drawObj.w, drawObj.h);
  }

  const startPos = {x: 0, y: 0, setPos: function(x,y) {this.x = x; this.y =y;}};
  const canvasClient = {x: canvas.offsetLeft, y: canvas.offsetTop};

  canvas.onmousedown = (e) => {
    startPos.setPos(e.clientX, e.clientY);
    console.log(startPos);
    document.onmousemove = e => {
      cxt.clearRect(0, 0, canvasW, canvasH);
      console.log(e);
    }

    document.onmouseup = () => {document.onmousemove = null;}
  }
}());