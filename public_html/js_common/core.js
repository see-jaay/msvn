
// import rndr from
// import setupCanvas from '../js_common/Renderer/RNDR_main.js';
// import {setupCanvas} from '../js_common/Renderer/RNDR_main.js';
import ascii_main, {init as ascii_init, update as ascii_update} from '../js_common/ascii/ascii.js';
import _core, {frames as frames_main} from '../../testing/js/local/core.js';
import render_main from './Renderer/RNDR_main.js';
import _events from './Events/events_main.js';



/*
// let cmd = '../js_common/CMD_text_effect/CMD.js';
// let core = '../../testing/js/local/core.js';

// import(cmd).then(module => {
//   // var cmd = module.cmdInit();
//   let _ = module;
//
//   console.log(_.cmdInit());
//   // var update = cmd.update();
// });
// let main = async function(axs) {
//   const {default: core, frames} = await import('../../testing/js/local/core.js');
//   console.log(axs);
//   await core.Init();
// }
// import(core).then({default: _core, frames} => core );


// import cmdInit from '../js_common/CMD_text_effect/CMD.js';
// import Frames from ''
// .then(init());
*/

/*  Contents (kinda)...(needs work)

** Editor Data **
  local manifest



** Editor Layout structure **

Render panel
  is panable xy
  is zoomable
  viewport
    is scalable x
    component rendered elements

Header bar
  subject variables
  subject state modi

Tool bar
  buttons that initialize tool functionality

Properties panel
  dropdown for each property group (ex. style, transforms, modifiers)
    panel for each




** Site Structure **

manifest data / html files
dom tree taged by relative component uid



*/

const rndr = new render_main();
const frames = new frames_main();
const ascii = new ascii_main(null, rndr);



const update = (dt) => {
  ascii.update(dt);


}

const init = async (axs) => {
  ascii.init();
  ascii.newProps({
    cell: {w:10, h: 10},
  });
  frames.new('update', update, 1000/60);
};


window.addEventListener('resize', e => {
  ascii.resize(e);
});

window.addEventListener('mousemove', e => {
  ascii.draw();
});


export {init as default};
