self.importScripts('Canvas2.js');
self.importScripts('CGOL.js');
self.importScripts('Vines.js');
self.importScripts('Rendering.js');
// self.importScripts('Masking.js');



var localData = {};
var mouseData = {};
var keybinds = {};
var ctx = null;

self.onmessage = function(e) {
  var s = e.data.state;

  switch(s) {
    case 'init':
    self.init(e.data.data);
    break;
    case 'init_demo':
    self.initDemo(e.data.demo, e.data.data);
    case 'update':
    {
      // console.log(e.data);
      self.update(e.data.dt, e.data.demo, e.data.data);
    }
    break;
    case 'get_options':
    self.getOptions(e.data.demo);
    case 'set_options':
    self.setOptions(e.data.demo, e.data.option);
    break;
    case 'action':
    self.action(e.data.demo, e.data.action, e.data.data);
    break;
    default:
    break;
  }
}

self.init = function(data) {
  ctx = new Canvas2(data.canvas);
}

self.initDemo = function(demo, data) {

  switch(demo){
    case 'cgol':
      cgol_init(data);
      break;
    case 'rend' :
      // Renderer.Init();
      break;
    default:
    break
  }
}

self.setOptions = function (demo, option){

  // console.log(demo + ' set opt');

  switch(demo){
    case 'cgol':
      cgol_setOption(option.name, option.value);
      break;
  }
}

self.getOptions = function(demo){
  $.ajax({
    type: "POST",
    url: '../../options/'+ demo + '_options.php',
    data: {},
    enctype: 'multipart/form-data',
    beforeSend: function(){
    },
    success: function(data){
      self.postMessage({state:'set_options', demo: demo, data: data});
    },
    async: false,
  });
}

self.update = function(dt = 0, demo, data) {


  if(localData != data){
    localData = data;
    mouseData = data.mouseData;
    keybinds = data.keybinds;
  }
  // console.log(dt);
  switch(demo){
    case 'cgol':
    cgol_update(dt, data);
    break;
    case 'vdyn':
      VineArt.Update(dt, data);
    break;
    case 'brdrs':
      // Borders.Update(dt, data);
    break;
    case 'rend':
      // Renderer.Update(dt);
    default:
    break;
  }
}

self.action = function(demo, act, data){
  switch(demo){
    case 'cgol':
      cgol_action(act, data);
    break;
  }
}
