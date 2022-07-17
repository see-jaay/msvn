var _effectsWorker;
var tscrls = {};


function Init_Effects(){
  if(typeof(_effectsWorker) == "undefined")
  {
    _effectsWorker = new Worker('./js/workers/Effects/main-worker.js');
  }

  _effectsWorker.addEventListener('message', function(e){
    var s = e.data.state;
    switch (s) {
      case 'update':
      {

      }
      break;
      case 'tsup' :
      {
        $(tscrls[e.data.id].$).html(e.data.val);
      }
      default:

    }
  });

  _effectsWorker.addEventListener('install',function(e){
      e.waitUntil(
          Promise.all([caches.open(STATIC_CACHE_NAME),caches.open(APP_CACHE_NAME),self.skipWaiting()]).then(function(storage){
              var static_cache = storage[0];
              var app_cache = storage[1];
              return Promise.all([static_cache.addAll(CACHE_STATIC),app_cache.addAll(CACHE_APP)]);
          })
      );
  });

  _effectsWorker.addEventListener('activate', function(e) {
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




  _effectsWorker.postMessage({state: 'init'});
  // console.log(tscrls);

}

var lastdepth = 0;
function Effects_Update(dt){
  _effectsWorker.postMessage({state:'update', dt: dt});




  $('.tscrl').not('.set').each(function(){

      var id = Object.keys(tscrls).length;
      tscrls[id] = {$:this};
      var data = this.dataset['tscrl'].split('/');
      var targets = data[0].split(',');
      var timing = data[1].split(',');
      // var fclpt = this.closest('.fclpt').dataset['fclpt'];

      this.removeAttribute('data-tscrl');

      // this.dataset['uid'] =
      _effectsWorker.postMessage({state:'newtscrl', id:id, targets: targets, timing: timing, fclpt: 0});
      $(this).html(targets[0]);

      this.classList.add('set');

      // console.log(fclpt);


  });

  if(SystemUX.depth != lastdepth)
  {
    _effectsWorker.postMessage({state: 'newdepth', depth: SystemUX.depth});
    lastdepth = SystemUX.depth;
  }

  // if(SiteManager.)
}


// text scroll : change target value of text
