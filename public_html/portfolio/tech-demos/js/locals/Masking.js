DOMRectReadOnly.prototype.isEqual = function(rect){
  for(v in rect){
    if (this[v] != rect[v])
      return false;
    else
      continue;
  }
  return true;
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.save();

  if(fill)
    ctx.fillStyle = fill;
  if(stroke)
    ctx.strokeStyle = stroke;

  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill)
    ctx.fill();
  if (stroke)
    ctx.stroke();

  ctx.restore();

}


class Masking {
  constructor(){
    this.elements = [];
    this.rects = [];
    this.worker;
    this.canv = null;
    this.ctx = null;
  }

  static Init(){
    if(typeof(this.worker) == "undefined"){
      this.worker = new Worker('./js/workers/masking_worker.js');
    }

    this.canv = document.createElement('canvas');

    $('footer').append(this.canv);
    this.canv.id = 'maskCanv';

    this.ctx = this.canv.getContext('2d');

    this.worker.addEventListener('message', (e) => {
      let s = e.data.state;

      switch(s) {
        case 'draw':
          DrawTest(e.data.data);
        break;
        case 'colls':
          Masking.RenderMasks(e.data.cols);
        break;
        default:
        break;
      }
    });


    for(let i = 0; i < this.elements.length; i++){
      Masking.elements[i].remove();
    }
    Masking.elements = [];
    Masking.rects = [];

    // window.addEventListener('resize', function(){
    //   console.log('resize')
    // });


  }

  static Update(dt){

    var maskElms = document.querySelectorAll('.bord-elm:not(.bord-set)');

    for(let i = 0; i < maskElms.length; i++)
        Masking.AddElm(maskElms[i]);

    for(let i = 0; i < Object.keys(this.elements).length; i++) {
      let elm = this.elements[i];
      let r = this.rects[i];

      if(!r.isEqual(elm.getBoundingClientRect())) {
        this.rects[i] = elm.getBoundingClientRect();
        this.rects[i].br = parseFloat(getComputedStyle(elm).getPropertyValue('border-radius'));
        this.worker.postMessage({state:'updateRect', ndx: i, rect: this.rects[i]});
      }
    }

    if(typeof(this.worker) != "undefined")
      this.worker.postMessage({state:'update', dt: dt});

    // if(localStorage.getItem('mask1'))
      // console.log(localStorage.getItem('mask1'));

  }

  static AddElm(elm){

    let ndx = Object.keys(this.elements).length;
    this.elements.push(elm);
    // elm.setAttribute('mask-ndx', ndx);/

    // Get Style Property
    // let get = (prop) => {
    //   return getComputedStyle(elm).getPropertyValue(prop)
    // };

    // let style = {
    //   width: get("--brdr-width") || 1,
    //   color: get("--brdr-color") || '0,0,0',
    //   radius: get("--brdr-radius") || 1,
    // };

    // console.log(elm, style);

    this.rects.push($(elm)[0].getBoundingClientRect());
    this.rects[ndx].br = parseFloat(getComputedStyle(elm).getPropertyValue('border-radius'));

    this.worker.postMessage({state:'updateRect', ndx: ndx, rect: this.rects[ndx]});


    elm.classList.add('bord-set');
  }

  static RenderMasks(overlaps){
    if(ctx){
      ctx.save();
      for(let i = 0; overlaps.length && i < overlaps[0].length; i++)
      {
        let ndx = overlaps[0][i];
        let r = this.rects[0];
        let rc = this.rects[ndx];
        // console.log();

        this.canv.width = r.width + 1;
        this.canv.height = r.height + 1;

        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);

        //render mask for each overlapping element
        roundRect(this.ctx, rc.x - r.x -3, rc.y - r.y -3, rc.width + 6, rc.height + 6, rc.br + 3, 'rgba(0,0,0,.9)', false);


        this.ctx.globalCompositeOperation = 'xor';
        roundRect(this.ctx, 0, 0, r.width+1, r.height+1, 0, 'black', false);

        this.ctx.restore();
        let mask = this.canv.toDataURL("image/png");

        // console.log(this.elements[0].style);
        this.elements[0].style.webkitMaskImage = 'url('+mask+')';
        // localStorage.setItem('mask1', JSON.stringify(mask));
      }

      if(overlaps.length && !overlaps[0].length)
        this.elements[0].style.webkitMaskImage = '';

    }
  }

}

Masking.elements = [];
Masking.rects = [];
Masking.worker;
