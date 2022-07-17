



function setupCanvas(canvas, dpr = 1) {
  // Get the device pixel ratio, falling back to 1.
  
  // console.log(dpr);
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function int2ab(arr)
{
  var buf = new ArrayBuffer(arr.length * 4); // 4 bytes for each float
  var bufView = new Float32Array(buf);
  for(var i = 0, arrLen = arr.length; i < arrLen; i++) {
    bufView[i] = arr[i];
  }
  return buf;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}