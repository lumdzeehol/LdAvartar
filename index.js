(function(){
  var canvas = document.querySelector("#test");
  var cxt = canvas.getContext("2d");
  const canvasW = 180;
  const canvasH = 180;
  const img = new Image();

  const initCanvasImg = (imgObj, {canvasW, canvasH}) => {
    const obj = {width: 0, height: 0, x: 0, y: 0};
    if (imgObj.width > imgObj.height) {
      obj.width = canvasW;
      obj.height = imgObj.height *obj.width / imgObj.width;
    } else {
      obj.height = canvasH;
      obj.width = imgObj.width * obj.height / imgObj.height;
    }
    return obj;
  }

  let avartar;
  img.src = 'http://images.shejidaren.com/wp-content/uploads/2018/10/035212qNc.jpg';
  img.onload = () => {
    const {width, height} = initCanvasImg(img, {canvasW, canvasH});

    avartar = new Avartar({img,width, height});
    cxt.drawImage(avartar.img,0,0, avartar.width, avartar.height);
    drawMask(cxt);
  }
  const canvasOffset = {x: canvas.offsetLeft, y: canvas.offsetTop};

  function drawMask(canvasContext) {
    maskWidth = 40;
    canvasContext.fillStyle = 'rgba(128,128,128, .7)';
    canvasContext.fillRect(0,0,canvasW, maskWidth);
    canvasContext.fillRect(canvasW - maskWidth, maskWidth, maskWidth, canvasH - maskWidth);
    canvasContext.fillRect(0, canvasH - maskWidth, canvasW - maskWidth, maskWidth);
    canvasContext.fillRect(0, maskWidth, maskWidth, canvasH - maskWidth * 2);
  }

  canvas.onmousedown = (e) => {
    avartar.setClickPoint(
      e.clientX - canvasOffset.x - avartar.offset.x, 
      e.clientY - canvasOffset.y - avartar.offset.y
    );
    console.log(avartar.clickPoint)
    document.onmousemove = e => {
      cxt.clearRect(0, 0, canvasW, canvasH);
      // cxt.drawImage(img,e.clientX - (canvasOffset.x + startPos.x) + endPos.x,e.clientY - (canvasOffset.y + startPos.y) + endPos.y,  drawObj.w, drawObj.h);
      // cxt.drawImage(img,e.clientX - (canvasOffset.x + startPos.x) + endPos.x,e.clientY - (canvasOffset.y + startPos.y) + endPos.y,  drawObj.w, drawObj.h);
      cxt.drawImage(
        img, 
        e.clientX - canvasOffset.x - avartar.clickPoint.x ,
        e.clientY - canvasOffset.y - avartar.clickPoint.y ,
        avartar.width,
        avartar.height
      );
      drawMask(cxt);
    }



    document.onmouseup = (e) => {
      document.onmousemove = null;
      avartar.setOffset(
        e.clientX - canvasOffset.x - avartar.clickPoint.x,
        e.clientY - canvasOffset.y - avartar.clickPoint.y
      )  
      console.log(avartar.offset)
    }
  }


  class Avartar {
    img;
    width; // 宽度
    height; // 高度
    offset; // 距离canvas边框的距离

    clickPoint; // 点击事件距离图片边框的距离

    constructor({img,width,height}) {
      this.img = img;
      this.offset = {};
      this.offset.x = 0;
      this.offset.y = 0;
      this.width = width;
      this.height = height;
      this.clickPoint = {};
    }

    setOffset(x, y) {
      this.offset.x = x;
      this.offset.y = y;
    }
    
    setClickPoint(x, y) {
      this.clickPoint.x = x;
      this.clickPoint.y = y;
    }

    dragTo(x, y) {

    }

  }



}());