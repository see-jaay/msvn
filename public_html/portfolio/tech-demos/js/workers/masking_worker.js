
class Rect {
  constructor(rect, style){
    this.imgData = [];
    this.rect = rect;
    this.style = style;
  }

  Draw() {
    // console.log(this.style.color);
    let clr = this.style.color;
    let wid = this.style.width;
    let rad = this.style.radius;

    let w = this.rect.width;
    let h = this.rect.height;
    for(let i = 0; i < (w*h)*4; i+=4){
      let x = (i/4) % w;
      let y = (i/4) / w;

      //along boundary of rect with border width considered
      if( (((x <= wid && x >= 0) || (x <= w && x >= (w - wid))) || ((y <= wid && y >= 0) || (y <= h && y >= (h - wid))))){


          if(x <= rad && y <= rad){
            //draw border radius top left
            let d = Math.sqrt(Math.pow(rad - x, 2) + Math.pow(rad - y, 2));
            // console.log(d);
            if(d < rad && d > wid)
            {
              this.imgData[i] = clr[0];
              this.imgData[i + 1] = clr[1];
              this.imgData[i + 2] = clr[2];
              this.imgData[i + 3] = clr[3] || 255;
            }
          }
          else if(x >= w - rad && y <= rad){
            //draw border radius top right

          }
          else if(x >= w - rad && y >= h - rad){
            //draw border radius bottom right

          }
          else if(x <= rad && y >= h - rad){
            //draw border radius bottom left


          }
          else {
            //draw borders
            this.imgData[i] = clr[0];
            this.imgData[i + 1] = clr[1];
            this.imgData[i + 2] = clr[2];
            this.imgData[i + 3] = clr[3] || 255;
        }
      }
    }
    self.postMessage({state:'draw', data: {width:w, height:h,img:this.imgData}});
  }
}

class Masking {
  constructor(){
    this.rects = {};
    this.col = [];
  }

  static Update(dt){
    this.cols = [];
    for(var i = 0; i < Object.keys(this.rects).length; i++){
      this.cols.push(new Array());
    }
    for(var i = 0; i < Object.keys(this.rects).length; i++){
      for(var j = 0; j < Object.keys(this.rects).length; j++){
        if(i != j){
          let r1 = this.rects[i];
          let r2 = this.rects[j];
          if( r1.rect.x < r2.rect.x + r2.rect.width &&
              r1.rect.x + r1.rect.width > r2.rect.x &&
              r1.rect.y < r2.rect.y + r2.rect.height &&
              r1.rect.y + r1.rect.height > r2.rect.y  ){

            this.cols[i].push(j);

          }
        }
      }
    }
    // console.log(this.rects);
    self.postMessage({state:'colls',cols: this.cols});
  }

  static updateRect(ndx = -1, rect){
    // console.log(rect);

      if(ndx in this.rects)
      {
        this.rects[ndx].rect = rect;
        // this.rects[ndx].changed = true;
      }
      else
        this.rects[ndx] = {rect: rect};

  }
}
Masking.rects = {};


self.onmessage = function(e) {
  let s = e.data.state;

  switch(s){
    case 'update':
      Masking.Update(e.data.dt);
    break;
    case 'updateRect':
      Masking.updateRect(e.data.ndx, e.data.rect);
    break;
    default:
    break;
  }
}
