class CanvObj {
  constructor(rect, padding = [0])
  {
    this.id = null;
    this.hvr = false;
    this.hvrChild;
    this.padding = padding;
    this.parent = null;
    this.cntr = false || rect.cntr;
    this.ox = rect.x;
    this.oy = rect.y;
    this.w = rect.w;
    this.h = rect.h;
    this.borderRadius = 0;
    this.border = false;
    // this.r = this.x + this.w;
    // this.b = this.y + this.h;
    // var xs =
    this.parent = null;
    this.children = {};

    this.canvasSet = false;

    CanvObj.newInstance();
    this.id = '~' + CanvObj.getInstance();
  }

  Init(){
    if(this.padding.length == 1)
      this.padding = [this.padding, this.padding, this.padding, this.padding];
    else if(this.padding.length == 2)
      this.padding = [this.padding[0], this.padding[1], this.padding[0], this.padding[1]];
    else if(this.padding.length > 2)
      this.padding = [this.padding[0], this.padding[1], this.padding[2], this.padding[3] || 0];


    if(this.cntr)
    {
      this.ox = (window.innerWidth /2) - this.w/2;
      this.oy = (window.innerHeight /2) - this.h/2;
    }

    // if(this.parent)
    // {
    //   this.ox = (window.innerWidth /2) - this.w/2;
    //   this.oy = (window.innerHeight /2) - this.h/2;
    // }

    for(var c in this.children)
      this.children[c].Init();

    // this.space = {};
    this.occupancy = {};
  }

  Update(dt){

    // if(this.parent)
    // {
    //   this.x = this.parent.x + this.ox;
    //   this.x = this.parent.y + this.oy;
    // }
    this.x = this.ox;
    this.y = this.oy;

    if(this.parent)
    {
      this.x = this.parent.x + this.ox;
      this.y = this.parent.y + this.oy;
    }

    this.r = this.x + this.w;
    this.b = this.y + this.h;

    for(var c in this.children)
    {
      this.children[c].Update(dt);
    }
    // console.log(this.r);
    // if(!this.ctxSet)
    // {
    //   if(this.parent)
    //   {
    //     this.ctx = this.parent.ctx;
    //     this.ctxSet = true;
    //   }
    //   else
    // }
  }

  contains(x,y)
  {
    return (x >= this.x && x <= this.r && y >= this.y &&  y <= this.b);
  }
  mouseenter(){

    if(this.parent)
      this.parent.hvrChild = true;

    this.hvr = true;
    // this.hvrChild = false;

    // console.log('mse enter');
  }
  mouseleave(){
    if(this.parent)
      this.parent.hvrChild = false;

    this.hvr = false;
    // this.hvrChild = false;
    // console.log('mse leave');

    for(var c in this.children){
      this.children[c].mouseleave();
    }

  }


  mousedown(x, y){
    if(this.contains(x,y))
    {
      for(var c in this.children)
      {
        this.children[c].mousedown(x,y);
      }


      return true;
    }
  }

  mouseup(x, y){

    if(this.contains(x,y))
    {
      for(var c in this.children)
      {
        this.children[c].mouseup(x,y);
      }

      return true;
    }
  }

  mouseover(x, y)
  {
    if(this.contains(x,y)) {
      if(!this.hvr)
        this.mouseenter();

      for(var c in this.children)
      {
        this.children[c].mouseover(x, y);
      }



      if(!this.hvrChild){
        document.body.style.cursor = 'default';
        // console.log('mouse inside' + this.id);
      }

      // return true;
    }
    else {
      if(this.hvr)
        this.mouseleave();
    }


    // return true;
  }

  Draw(ctx){

    // ctx.clearRect(this.x, this.y, this.w, this.h);

    // let region = new Path2D();
    // ctx.rect(this.x, this.y, this.w, this.h);
    // ctx.clip();
    // region.rect(40, 50, 100, 50);

    for(var r in this.children)
    {
      this.children[r].Draw(ctx);
    }
    // this.DrawDebug(ctx);

  }

  DrawDebug(ctx){
    // ctx.clearRect(this.x, this.y, this.w, this.h);
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'red';
    if(this.hvr){
      ctx.strokeStyle = 'white';
    }
    if(this.hvrChild)
      ctx.strokeStyle = 'green'
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();

    for(var c in this.children)
    {
      this.children[c].DrawDebug(ctx);
    }

    // console.log(ctx);

    // console.log('canvObj Draw debug');

    // console.log('draw window debug');/
    // console.log(ctx);
      // ctx.rect()
      // var ls = ctx.strokeStyle;
      // ctx.strokeStyle = ls;
    // }
  }

  append(obj){
    // obj.id = this.children.length;
    this.children[obj.id] = obj;
    obj.parent = this;
    // console.log(this.instances);
    // obj.Init();
    return obj;
  }



  static instances = 0;
  static getInstance() {
    return this.instances;
  }
  static newInstance() {
    this.instances++;
  }
  // static
}
