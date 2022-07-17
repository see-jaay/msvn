var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var admn = false;

var userAgent = navigator.userAgent;
var chrome = userAgent.indexOf("Chrome") > -1;
var firefox = userAgent.indexOf("Firefox") > -1;
var ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1;
var safari = userAgent.indexOf("Safari") > -1;
((chrome) && (safari)) ? safari = false : safari = safari;
var opera = userAgent.indexOf("OP") > -1;
((chrome) && (opera)) ? opera = false : opera = opera;

$( document ).ready(function(){
  // Site.Init();
});

window.onload = function(){
  // Site.Init();
};
