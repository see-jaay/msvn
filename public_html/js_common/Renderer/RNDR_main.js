/*

Renderer Functions

RndrLayers
    - Generate canvas layers according to Render Groups from Editor UI,
      to live site decals and effects.

RndrPaths
    - Basic-complex functions that augment any given point data
      to generate stylized paths/borders and shapes

RndrAscii & RndrScript - (GDSCHLD)
    - Grid of cells by font size
    - Components should wrap any text overlapping its bounds
    - Groups will catalogue letters and words in

*/

/*
Render Subject Queue


 */

 function setupCanvas(canvas, gl = false, dpr = 4) {
   // Get the device pixel ratio, falling back to 1.

   // Get the size of the canvas in CSS pixels.

   var rect = canvas.getBoundingClientRect();
   // console.log(rect);
   // Give the canvas pixel dimensions of their CSS
   // size * the device pixel ratio.
   canvas.width = rect.width * dpr;
   canvas.height = rect.height * dpr;

   var ctx = null;
   if(!gl){
     ctx = canvas.getContext('2d');

     // Scale all drawing operations by the dpr, so you
     // don't have to worry about the difference.
     ctx.scale(dpr, dpr);
   }
   else{
     ctx = canvas.getContext('webgl');

     if(!ctx)
       ctx = canvas.getContext('experimental-webgl');
   }


   return ctx;
 }

 class Rndr {
  static layers = {
    0:{},
    add: function(name, parent, gl = 0){
      this[0][name] = new Rndr_Layer(name, parent, gl);
      return this[0][name];
    },
    delete: function(){
      delete this[0][name];
    },
    get: function(name){
      return this[0][name];
    }

  }

  static resize(){
    // for(var )
    for(var l in this[0]){
      this[0][l].resize();
    }
  }
}

const rndr = function() {
  this.layers = {
    0:{},
    add: function(name, parent, gl = 0){
      this[0][name] = new Rndr_Layer(name, parent || document.body, gl);
      return this[0][name];
    },
    delete: function(){
      delete this[0][name];
    },
    get: function(name){
      return this[0][name];
    }
  }



  let resize = function(){
    let lyrs = this.layers[0];
    for(var l in lyrs){
      lyrs[l].resize();
    }
  }

  return {
    layers:this.layers,
    resize,

  }
}



class Rndr_Layer {
  constructor(name, parent, gl = 0){
    // this.name = name;
    // this.gl = gl;
    this.q = [];

    this.canvas = document.createElement('canvas');
    Object.assign(this.canvas.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
    });
    this.canvas.dataset['gl'] = gl;

    parent.appendChild(this.canvas);
    this.r = this.canvas.getBoundingClientRect();
    this.ctx = setupCanvas(this.canvas);
  }
  draw(){
    this.clear();

    for(var fn in this.q){
      this.q[fn](this.ctx);
      delete this.q[fn];
    }
  }
  clear(){
    this.ctx.clearRect(0,0,this.r.w, this.r.h);
  }
  resize(){
    this.ctx = setupCanvas(this.canvas);
    this.r = this.canvas.getBoundingClientRect();
    // this.resized = new Promise((resolve, reject) => {
    //   resolve(this.r);
    // }).ascii();

  }

  enq(fn){
    this.q.push(fn);
  }
}

export {setupCanvas, rndr as default};
