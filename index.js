(function(){
  var canvas = document.querySelector("#test");
  var cxt = canvas.getContext("2d");
  const canvasW = 180;
  const canvasH = 180;
  const img = new Image();

  const initCanvasImg = (imgObj, {canvasW, canvasH}) => {
    const drawObj = {w: 0, h: 0, x: 0, y: 0};

    if (imgPos.w > imgPos.h) {
      drawObj.w = canvasW;
      drawObj.h = imgPos.h *drawObj.w / imgPos.w;
    } else {
      drawObj.h = canvasH;
      drawObj.w = imgPos.w * drawObj.h / imgPos.h;
    }
    return {...drawObj, setPos: function(x,y) {
        this.x = x;
        this.y = y;
      }};
  }

  const imgPos = {x: 0, y: 0};
  let drawObj = {};
    img.src = 'http://images.shejidaren.com/wp-content/uploads/2018/10/035212qNc.jpg';
    img.onload = () => {
    imgPos.w = img.width;
    imgPos.h = img.height;

    drawObj = initCanvasImg(imgPos, {canvasW, canvasH});
    cxt.drawImage(img,0,0, drawObj.w, drawObj.h);
  }

  const startPos = {x: 0, y: 0, setPos: function(x,y) {this.x = x; this.y =y;}};
  const endPos = {x: 0, y: 0};
  const canvasOffset = {x: canvas.offsetLeft, y: canvas.offsetTop};

  canvas.onmousedown = (e) => {
    startPos.setPos(e.clientX - canvasOffset.x, e.clientY - canvasOffset.y);
    console.log(startPos.x, startPos.y);
    document.onmousemove = e => {
      cxt.clearRect(0, 0, canvasW, canvasH);
      cxt.drawImage(img,e.clientX - (canvasOffset.x + startPos.x) + endPos.x,e.clientY - (canvasOffset.y + startPos.y) + endPos.y,  drawObj.w, drawObj.h);
      startPos.setPos(e.clientX - (canvasOffset.x + startPos.x) + endPos.x, e.clientY - (canvasOffset.y + startPos.y) + endPos.y);
    }

    document.onmouseup = (e) => {
      document.onmousemove = null;
      endPos.x = e.clientX - canvasOffset.x;
      endPos.y = e.clientY - canvasOffset.y;
    }
  }
}());