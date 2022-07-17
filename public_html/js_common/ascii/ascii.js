import mth from '../Math/main.js';
import {sizeof} from '../Utils/assesments.js';
import _events, { evt_manager} from '../Events/events_main.js';

import {setupCanvas} from '../Renderer/RNDR_main.js';


var math = new mth();
// var events = new _events();


// main ascii object
const ascii = function(layer, rndr) {


  // array of cells with render instructions
  this.map = [];
  // render layer ( canvas, ctx )
  this.rl = rndr.layers.add('ascii_layer', layer);
  // render layer . ctx
  this.ctx = this.rl.ctx;
  this.properties = {};

  this.worker = new Worker("../js_common/ascii/ascii-worker.js");
  this.worker.addEventListener('message', (e)=>{
    let s = e.data.state;

    if(s === 'draw') { frames.temp('ascii.draw', this.draw(), 'reqonce')}
    else if(s === 'trsComplete'){}

  });

  let setmap = (m) => this.map = m;
  let filltemp = () => {}
  let update = (dt) => {


    // this.rl.resized.nq({
    //   console.log('resized');
    // }));
    // onevent(this.rl.resized);
    // this.rl.resized.then(()=>{
    //   console.log('resized');
    // });

    let message = {
      state:'update',
      dt: dt,
      props: this.properties || {r: this.rl.r, cell: this.cellprops}
    };
    this.worker.postMessage(message);

    // this.rl.resized = false;
  }
  let init = (data = {cell:{w: 10, h: 10}}) => {
    Object.assign(this.properties, {r:this.rl.r});
  }

  let draw = this.draw = (ctx = this.ctx, canv = this.ctx.canvas) => {

    ctx.clearRect(0,0, canv.width, canv.height);

    let color = [0,0,0].map(() => math.rand(100,200).toint()).join(',');
    ctx.fillStyle = 'rgba(' + color + ', 1)';
    ctx.fillRect(0,0,50,50);
  }

  let resize = () => {
    this.ctx = setupCanvas(this.ctx.canvas);
  }

  // let onevent = (promise) {
  //   promise.then(()=>{
  //     console.log('resized');
  //   })
  // }

  return {
    init, update, draw, resize,
    setmap: m => setmap(m),
    newProps: (props) => Object.assign(this.properties, props),
  }
}






var cmdwork;
const fillTemp = (cCount, rCount) => {
  let map = "";

  for(var y = 0; y < rCount; y++){
    for(var x = 0; x < cCount; x++){
      map += "0";
    }
  }

  cmdwork.postMessage({
    state: 'wave',
    point: {
      x: cCount * 0.5,
      y: rcount * 0.1,
      sig: 10,
    }
  })

  return map;
}
const set = (cw = 2, ch = 2) => {
  if( !$('#cmd_canvas').length )
    $('body').append('<canvas id="cmd_canvas" class="transition-canvas">');

  let c = document.getElementById("cmd_canvas");

  c.style['z-index'] = 20;

  let ctx = setupCanvas(c);
  [ctx.fontSize, ctx.fontFamily, ctx.strokStyle, ctx.lineWidth] = [12, "Courier_Prime_Code", 'rgb(50,150,0)', .04];

  // mcolCount =
  cmdwork.postMessage({
    state:'init',
    columns: Math.ceil(c.width/cw),
    rows: Math.ceil(c.height/ch),
    cellWidth: cw,
    cellHeight: ch
  });


  const p = new pool();
  p.setmap();
  p.draw();

}
const setListeners = () => {
  document.addEventListener("mousemove", (e) => {
    // cmdwork.postMessage({
    //   state:"wave",
    //   point: {
    //     // x: math.floor(e.pageX/)
    //   }
    // })

  });
}



let init  = function (cellWidth, cellHeight) {

  if (typeof(cmdwork) === 'undefined'){

    cmdwork = new Worker("../js_common/CMD_text_effect/CMD-worker.js");
    cmdwork.addEventListener('message', (e)=>{
      let s = e.data.state;

      switch (s) {
        case 'draw': {
          pool().setmap(e.data.map);
        } break;
        case 'cellsFilled' : {
          let j = 0;
        } break;
      }

    });

    set(cellWidth, cellHeight);
    setListeners();

  }
}


let cmdDraw = (dt) => {
  // console.log(dt);
}

let update = () => {
  // console.log('cmd update');
}

export {ascii as default, init, update}
