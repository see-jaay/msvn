var depth = 0;
var depthTo = 0;
var focalPoints = {};
var fpi = 0;
var fpkeys = []; //
var closestFP = 0; // do i need this?
var corrDelay = .5; // delay before each correction  // do i need this?
var corrTimer = 0; // correction timer counter
var corr = true; //correct scroll?
var scrllmax = 0;

var lastdy = 0;
var canscroll = true;

function scrll_Update(dt) {

  if(depth > depthTo - .4 && depth < depthTo + .4)
  {
    canscroll = true;
    ignorescroll = false;
  }

  corrTimer += dt;

  //
  // //lerp to depth  or  animate scroll
  if(depth != depthTo)
    depth = lerp(depth, depthTo, .14);


  // truncate lerp transition at the end
  if(Math.abs(depthTo - depth) < .1)
    depth = depthTo;


  // //restrict depth between scroll domain
  (depth > fpkeys[fpkeys.length-1]) ? depth = fpkeys[fpkeys.length-1] : depth = fpkeys[0];
  // //restrict depthTo between scroll domain
  (depthTo > fpkeys[fpkeys.length-1]) ? depthTo = fpkeys[fpkeys.length-1] : depthTo = fpkeys[0];
  //
  // //explain this SOON
  for(var i = 0; corr && corrTimer > corrDelay && i < fpkeys.length; i++){
    var distFromPrev = 0; distToNext = 0;
    var key = fpkeys[i];

    if(i > 0)
      distFromPrev = Math.abs(fpkeys[i-1] - key);
    if(i < fpkeys.length - 1)
      distToNext = Math.abs(fpkeys[i+1] - key);


    if(depthTo >= key - (distFromPrev/2) && depthTo <= key + (distToNext/2)) {
      depthTo = key;
      corr = false;
      lasdty = 0;
    }
  }

  return depth;
}



function scrll_RegisterDomain(data) {

  if(data.rd)
  {
    for(var k in data.fpkeys){
      fpkeys.push(data.fpkeys[k]);
    }
  }
  else{
    fpkeys = data.fpkeys;
  }

  scrllmax = data.scrllmax;

  // self.postMessage({s:'log', message: data});

}

function scrll_HandleScroll(delta) {

  if(Math.abs(delta) >= .6)
    scrll_site(delta, true);
  else
    scrll_site(delta * 5, false);

}



function scrll_site(dy, fullscroll){
  if(fullscroll){
    if(dy >= 0)
      depthTo++;
    else
      depthTo--;
  }
  else {
    if(Math.abs(dy) > lastdy){
      lastdy = Math.abs(dy);
      depthTo += dy/50;
      corr = true;
      corrTimer = 0;
    }
  }
}
