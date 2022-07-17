$.loadscript = function(url, callback){
  $.ajax({
    url:url,
    datatype: 'script',
    success: callback,
    async: true,
  });
}

var admn = false;

var userAgent = navigator.userAgent;
var chrome = userAgent.indexOf("Chrome") > -1;
var firefox = userAgent.indexOf("Firefox") > -1;
var ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1;
var safari = userAgent.indexOf("Safari") > -1;
((chrome) && (safari)) ? safari = false : safari = safari;
var opera = userAgent.indexOf("OP") > -1;
((chrome) && (opera)) ? opera = false : opera = opera;


var sysUI = new SystemUI();
var sysUX = new SystemUX();
var siteManager = new SiteManager();


$.loadscript(null, null);

$( document ).ready(function(){
  var inpts = document.getElementsByTagName("input");
  $.each(inpts,function(){

    this.addEventListener("keyup", function(e) {
      if(e.keyCode === 13){
        e.preventDefault();
        // this.closest('.submit').click();
        $(this).parents(".form").find('.submit').click();
      }
    });
  });


  SystemUI.Init();
  // SystemUX.Init();
  siteManager.Init();

  Init_Effects();

  Update();


  // $('#msvn-layer-box').toggle(function(){
  //   $(this).style.transform.scale = 1;
  // }, function(){
  //   $(this).style.transform.scale = .75;
  // });
});

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var lastUpdate = (new Date).getTime();
var now;
var deltaTime;
var reqMain;


function Update(dt){


  dt /= 1000;

  now = (new Date()).getTime();
  deltaTime = (now - lastUpdate)/1000;

  // SystemUX.Update(deltaTime);
  cancelAnimationFrame(reqMain);
  // if(ADMIN_ACCESS)
  //     Admin_Update();

  // siteManager.Update(dt);
  // NavUpdate(dt);

  // requestAnimationFrame(function(){SystemUI.Update(deltaTime);});
  // SystemUI.Update(dt);

  Effects_Update(deltaTime);

  if(admn)
    Editor.Update(deltaTime);
    // console.log('edit');

  lastUpdate = now;


  reqMain = requestAnimationFrame(Update);
}

function FixedUpdate(dt){


}

function AdminAccess(){
  admn = true;
  Editor.Init();
  // Editor.Update();
}

function fly(f){
  SiteManager.flyout(f);
  // btn.toggleClass('active');

  if(SystemUI.ismobile)
    $('#btn_hbgr')[0].classList.toggle('active');
}


var logdata = {};
var canlog = false;
// var logobj = null;

function log(key,message, ts = true){

  if(ts)
    message = message.toString();

  if(!(key in logdata))
  {
    logdata[key] = {
      message:message,
      elm: $('<li>'+ key + ': ' + message +'</li>')
    };
    // canlog = true;
    $('#mobile_log').append(logdata[key].elm);
  }
  else {
    if(logdata[key].message != message)
    {
      var message = logdata[key].message = message;
      logdata[key].elm.html(key + ': ' + message);
      // canlog = true;
    }
  }

  // if(canlog)
  // {
  //   log = $('#mobile_log');
  //   log.children(0).remove;
  //   for(var k in logdata){
  //     log.append('<li>')
  //   }
  // }

  // console.log();
}
