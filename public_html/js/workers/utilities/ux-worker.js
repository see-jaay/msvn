self.importScripts('../../locals/Math.js');
self.importScripts('../../workers/utilities/scroll.js');// scrll_

self.onmessage = function(e){

  var d = e.data;
  var s = d.state || d.s;

  if(s === 'init')
    var tmp = 0;
  else if(s === 'scrll-update')
  {
    var dpth = scrll_Update(d.dt);
    self.postMessage({state:'site-depth-update', depth:dpth});

  }
  else if(s === 'scrll-regis-dom')
  {
    scrll_RegisterDomain(d);
  }
  else if(s === 'scrll-handlescrll')
  {
    scrll_HandleScroll(d.delta);
    // self.postMessage({s:'log', message:d.delta});
  }
  else
    var tmp = 0;
}
