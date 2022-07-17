



req_anim = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
cancel_anim = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var _main_worker;


var canvas, ctx;

var mouseData = {x: 0, y:0, click:false, downTime:0};
var keybinds = {};


var drawReq;
$(document).ready(function(){

  if(typeof(_main_worker) == "undefined"){
    _main_worker = new Worker('./js/workers/main_worker.js');
  }


  _main_worker.addEventListener('message', (e) => {
    var s = e.data.state;
    switch(s) {
      case 'update':
      break;
      case 'draw':
      Draw(e.data.demo, e.data.data);
      break;
    }
  });

  // worker adjustment to fix unknown problem lol
  {
  _main_worker.addEventListener('install',function(e){
      e.waitUntil(
          Promise.all([caches.open(STATIC_CACHE_NAME),caches.open(APP_CACHE_NAME),self.skipWaiting()]).then(function(storage){
              var static_cache = storage[0];
              var app_cache = storage[1];
              return Promise.all([static_cache.addAll(CACHE_STATIC),app_cache.addAll(CACHE_APP)]);
          })
      );
  });

  _main_worker.addEventListener('activate', function(e) {
      e.waitUntil(
          Promise.all([
              self.clients.claim(),
              caches.keys().then(function(cacheNames) {
                  return Promise.all(
                      cacheNames.map(function(cacheName) {
                          if (cacheName !== APP_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
                              console.log('deleting',cacheName);
                              return caches.delete(cacheName);
                          }
                      })
                  );
              })
          ])
      );
  });
}

  canvas = document.getElementById("demo_canvas");
  ctx = setupCanvas(canvas,1);
  // ctx = canvas.getContext('2d');
  // console.log(canvas.getBoundingClientRect().width);

  // console.log(canvas.width);


  // canvas.addEventListener("click", function(e){
  //   _main_worker.postMessage({state:'action', demo:activeDemo, action:'click', data:{x:e.clientX, y:e.clientY}});
  // });

  // Masking.Init();
  _main_worker.postMessage({
    state:"init",
    data:{
      canvas:{
        width: canvas.width,
        height: canvas.height
      }
    }
  });

  document.addEventListener('mousedown', function(e){
    mouseData.mousedown = true;
    mouseData.mouseup = false;
    mouseData.downx = e.pageX;
    mouseData.downy = e.pageY;
  });

  document.addEventListener('mouseup', function(e){
    mouseData.mouseup = true;
    mouseData.mousedown = false;
    mouseData.upx = e.pageX;
    mouseData.upy = e.pageY;
  });

  document.addEventListener('mousemove', function(e){
    mouseData.x = e.pageX;
    mouseData.y = e.pageY;


    // $('#two').css({
    //   'top': e.pageY + 'px',
    //   'left': e.pageX + 'px',
    // });



  });
  document.addEventListener('keydown', function(e){ keybinds[e.code] = true; });
  document.addEventListener('keyup', function(e){ keybinds[e.code] = false; });

  Update();
});


var updateReq, lastNow;

var activeDemo = '';

function Update(now){
  cancel_anim(updateReq);

  if(!lastNow) lastNow = now;
  let dt = (now - lastNow)/1000;


  calc_mouseData(dt);

  // if(Masking.init)
  Masking.Update(dt);

  Renderer.Update(dt);

  _main_worker.postMessage(
    {
      state:'update',
      dt: dt,
      demo: activeDemo,
      data:{
        canv: { w: canvas.width, h: canvas.height },
        mouseData:mouseData,
        keybinds:keybinds,
      }
    }
  );

  // DrawTest();


  // console.log(canvas.width/50);


  updateReq = req_anim(Update);
  lastNow = now;
  calc_mouseData(dt, true);
}


function Draw(demo, data){
  // console.log(demo + 'draw');

  cancel_anim(drawReq);

  drawReq = requestAnimationFrame(function(){
    switch(demo){
      case 'cgol':
      cgol_draw(ctx, data);
      break;
      case 'vdyn':
        ctx.putImageData(data,0,0);
      break;
      default:
      break;
    }
  });
}

function DrawTest(data){
  // ctx.clearRect(0,0,canvas.width, canvas.height);

  // let img = new ImageData(data.width, data.height);
  // img.data.set(data.img);
  ctx.clearRect(0,0,canvas.width, canvas.height)

  // roundRect(ctx, 0,0, 200, 200, 20, 'black', false);
  // ctx.putImageData(img, 0, 0);
  //
  //
  //
  // ctx.save();
  // ctx.globalCompositeOperation = 'xor';
  //
  //
  //
  //
  // ctx.beginPath();
  // ctx.moveTo(0,0);
  // ctx.lineWidth = 10;
  // ctx.bezierCurveTo(36, 10, 60, 100, 200, 200);
  // ctx.stroke();
  //
  //
  // // ctx.beginPath();
  // // ctx.moveTo(0,0);
  // // ctx.lineWidth = 5;
  // // ctx.bezierCurveTo(36, 10, 60, 100, 200, 200);
  // // ctx.stroke();
  //
  // ctx.restore();
  //
  // ctx.globalCompositeOperation = 'destination-out';
  //
  // ctx.beginPath();
  // ctx.moveTo(60,0);
  // ctx.lineWidth = 18;
  // ctx.lineTo(0, 60);
  // ctx.stroke();
  //
  // ctx.restore();
  //
  // ctx.globalCompositeOperation = 'xor';
  //
  // ctx.beginPath();
  // ctx.moveTo(60,0);
  // ctx.lineWidth = 10;
  // ctx.lineTo(0, 60);
  // ctx.stroke();
  //
  // // ctx.beginPath();
  // // ctx.moveTo(60,0);
  // // ctx.lineWidth = 5;
  // // ctx.lineTo(0, 60);
  // // ctx.stroke();

}

var blockImgData = null, blockHvrImgData = null;
var grdImgData = null;
var gridImage = null;
var cs;
var w;
var h;

function cgol_draw(ctx, data){
  // console.log(data);
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  if(!(blockImgData && grdImgData)){

    w = data.width;
    h = data.height;
    cs = data.cs;

    blockImgData = ctx.createImageData(data.cs, data.cs);
    blockHvrImgData = ctx.createImageData(data.cs, data.cs);

    grdImgData = ctx.createImageData(1, 1);

    for(var i = 0; i < blockImgData.data.length; i+=4) {

      blockImgData.data[i] = 0;
      blockImgData.data[i + 1] = 0;
      blockImgData.data[i + 2] = 0;
      blockImgData.data[i + 3] = 255;

      blockHvrImgData.data[i] = 0;
      blockHvrImgData.data[i + 1] = 0;
      blockHvrImgData.data[i + 2] = 0;
      blockHvrImgData.data[i + 3] = 100;
    }



    for(var i = 0; i < grdImgData.data.length; i+=4)
    {
      grdImgData.data[i] = 0;
      grdImgData.data[i + 1] = 0;
      grdImgData.data[i + 2] = 0;
      grdImgData.data[i + 3] = 100;

     }


     for(var i = 0; i < data.width * data.height; i++)
     {
       ctx.putImageData(grdImgData, Math.round(i % w) * cs, Math.round(i / w) * cs);
     }

     grdImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
     gridImage = canvas.toDataURL();
     canvas.style.backgroundImage = 'url('+gridImage+')';

  }


  // console.log(data);
  // console.log(imgdata);


  // display mouse pos as block

  // ctx.globalComouseDataiteOperation = 'destination-in';

  // ctx.drawImg(grdImgData, 0, 0);
  for(var i = 0; i < w * h; i++)
  {
    if( data.ca[i] == 1)
      ctx.putImageData(blockImgData, Math.floor(i % w) * cs, Math.floor(i/w) * cs);

    if( data.ca[i] == 2)
      ctx.putImageData(blockHvrImgData, Math.floor(i % w) * cs, Math.floor(i/w) * cs);
  }


  // ctx.putImageData(blockHvrImgData, Math.floor(mouseData.x/cs)*cs, Math.floor(mouseData.y/cs)*cs);



  // for(var i = 1; i < data.height; i++)
  // {
  //   for(var x = 1; x < data.width; x++){
  //     ctx.fillStyle = "rgba(0,0,0,.4)";
  //     ctx.fillRect(x * cs, i * cs, 1, 1);
  //   }
  // }
  // console.log(Math.floor(1000 / (canvas.width/10)));
}



function load_demo(demo) {
  activeDemo = demo;
  $('body').css('background-image','');
  $('#wgl_demo_canvas').css('opacity','0');
  $('#demo_canvas').css({
    'opacity':0,
    'background': 'none'});


  if(demo == 'mask')
  {
    $('body').css('background-image','url(https://t3.ftcdn.net/jpg/02/26/54/98/240_F_226549800_JcTsSD70la5lDHAuo1MWRmBpECmJTH8d.jpg)');
    $('#demo_canvas').css('opacity','1');
    Masking.Init();
  }
  else if(demo == 'rend'){
    $('#wgl_demo_canvas').css('opacity','1');

    Renderer.Init();
  }
  else if(demo == 'cgol'){
    $('#demo_canvas').css('opacity','1');
  }



  _main_worker.postMessage({state:'init_demo', demo: activeDemo, data:{cw:canvas.width, ch:canvas.height}});

  //load the demos corresponding options into the options panel
  let options = $('#demo_ui');
  $.ajax({
    type: "POST",
    url: 'options/'+ activeDemo + '_options.php',
    data: {},
    beforeSend: function(){
    },
    success: function(data){
      var elm = $(data);
      options.html('');
      options.append(elm);

      var optionInputs = document.querySelectorAll('[name=demo-option]');

      for (var input of optionInputs) {
        input.addEventListener("change", function(evt) {
          _main_worker.postMessage({state:'set_options', demo:activeDemo, option:{name:input.dataset['name'], value:input.value}});
        });
      }

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('post error: ' + errorThrown);
    },
    async: true,
  });



}

function action(act){
  _main_worker.postMessage({state:'action', demo:activeDemo, action:act});
}


function calc_mouseData(dt, delta = false){
  if(!delta){

    if(mouseData.mousedown)
        mouseData.downTime += dt;


  }
  else {
    if(mouseData.mouseup)
      mouseData.downTime = 0;

    mouseData.mouseup = false;
    // mouseData.mouseDown = false;
  }
}
