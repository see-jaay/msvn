$.loadscript = function(url, callback = null) {
  $.ajax({
    url:url,
    datatype: 'script',
    success: callback,
    async: true,
  })
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




//// TODO:
var siteManager = null;
$.loadscript('../../js_common/locals/utils/SiteManager.js', Init('sm'));

// m = module = function specific code
// initializing code by loading the script then intializing its data only after the script is fully loaded
function Init(m){
  if(m == 'sm'){
    let sminit = true;
    console.log('sm loaded');

    // siteManager = new SiteManager();
    // siteManager.Init();
  }
  else{

  }
}







var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


var lastUpdate = (new Date).getTime();
var now;
var deltaTime;
var reqMain;


function Update(dt){

  cancelAnimationFrame(reqMain);

  console.log('update main');

}
