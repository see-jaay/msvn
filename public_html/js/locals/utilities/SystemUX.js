var lastX = null;
var lastY = null;
var touchX = null;
var touchY = null;
var tdx = 0;
var tdy = 0;
var lag = .0001;
var lagTimer = 0;


function getAllElementsFromPoint(x, y) {
    var elements = [];
    var display = [];
    var item = document.elementFromPoint(x, y);
    var lastItem;
    while (item && item !== lastItem && item !== document.body && item !== document && item !== document.documentElement) {
        elements.push(item);
        // save current style.display value
        display.push(item.style.display);
        // temporarily hide this element so we can see what's underneath it
        item.style.display = "none";
        // prevent possible infinite loop by remembering this item
        lastItem = item;
        item = document.elementFromPoint(x, y);
    }
    // restore display property
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = display[i];
    }
    return elements;
}

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches||
         evt.changedTouches; // jQuery
}


function handleTouchStart(evt) {
    // firstTouch = getTouches(evt)[0];
    touchX = lastX = evt.changedTouches[0].clientX;
    touchY = lastY = evt.changedTouches[0].clientY;
    // console.log( firstTouch.pageX);
    // console.log( firstTouch.clientX);

    // lastX = xDown;
    // lastY = yDown;
    // SystemUX.mouseevent('mousedown', {pageX:xDown, pageY:yDown});
    // log('touching', true);

};

function handleTouchEnd(evt) {
    const firstTouch = getTouches(evt)[0];

};

var dx, dy;
var timeout = null;
function handleTouchMove(evt) {

    // evt.preventDefault();

    let e = window.event;

    const firstTouch = getTouches(evt)[0];

    touchX = firstTouch.clientX;
    touchY = firstTouch.clientY;

    // let dx = lastX - firstTouch.clientX;
    // let dy = lastY = firstTouch.clientY;

    // console.log(x + ' : ' + lastX);

    // console.log(dx);

    // log('dx', evt.dx);
    // console.log(evt);



    // if(SystemUI.ismobile)
    // {
    //   if(SystemUI.landscape){
    //     handleScroll(null, dy/35);
    //   }
    //   else {
    //     handleScroll(null, dx/35);
    //   }
    // }
    // else
    //   handleScroll(null, dy/5);


    // systemUI.mouseData.movementY = dy;
    // systemUI.mouseData.movementX = dx;
    // console.log(dx/60);
    // clearTimeout(timeout);
    // timeout = setTimeout(function(){
    //   lastX = touchX;
    //   lastY = touchY;
    // }, 1000);

};


function wheelDistance(e, x = 0){
  if(!e){
    e = window.event;
  }

  let w = e.deltaY, d = e.detail;

  if(x)
    w = e.deltaX;

  if(d) {
    return -d / 3; // in case of firefox
  }
  return w / 120; // other browsers
}

var scrollTimeout = null;
var initScroll = false;
function handleScroll(e, dy = 0, dt){

  // console.log(e);

  // if(e.pageX != SystemUX.scrollBlock.style.left || e.pageY != SystemUX.scrollBlock.style.top){
  //   SystemUX.scrollBlock.style.left = e.pageX;
  //   SystemUX.scrollBlock.style.top = e.pageY;
  // }

  // if(!initScroll){
  //   $('#scroll_box').css({
  //     'pointerEvents': 'all',
  //     opacity: 1
  //   });
  //   initScroll = true;
  // }
  //
  // clearTimeout(scrollTimeout);
  // scrollTimeout = window.setTimeout(function(){
  //   $('#scroll_box').css({
  //     'pointerEvents': 'none',
  //     opacity: 0
  //   });
  //   initScroll = false;
  //
  // }, 100);
  //
  // console.log($(window).scrollTop());

  if(false)
  {
    let delta = dy || -wheelDistance(e);
    // SystemUX.scrolldist += Math.abs(delta)||0;
    SystemUX.depthTo += e.deltaY;
    SystemUX.scroll_site(wheelDistance(e));
    console.log(e.deltaY);
    // console.log(e.deltaY);
    // console.log(SystemUX.scrolldist);
  }
  else {

      // let delta = dy || -wheelDistance(e);

      // console.log(e.target);


      if(!SystemUX.ignorescroll && $('.flyout.show').length == 0)
      {
        if(e.deltaY > 0 && SystemUX.depth < SystemUX.scrllrng)
          SystemUX.depth += e.deltaY * deltaTime * 25;
        else if(e.deltaY < 0 && SystemUX.depth > 0)
          SystemUX.depth += e.deltaY * deltaTime * 25;
      }

      // SystemUX.depth += e.deltaY;
      // console.log(SystemUX.depth);
      // console.log(window.scrollY);


      if(!SystemUX.ignorescroll && $('.flyout.show').length == 0 && 0)
      {
        SystemUX.ignorescroll = true;



        let delta = dy || -wheelDistance(e);
        SystemUX.scrolldist += Math.abs(delta)||0;

        // console.log(SystemUX.scrolldist);


        if(SystemUI.ismobile)
        {

          if(/*Math.abs(delta) >= .49*/ SystemUX.scrolldist >= 2)
          {
            SystemUX.scroll_site(delta*1.5, false);
            // SystemUX.scrolldist = 0;

          }
          else
          {
            SystemUX.scroll_site(delta * 5, true);
            // SystemUX.scrolldist = 0;
          }
        }else {
          if(/*Math.abs(delta) >= .65*/ SystemUX.scrolldist >= 10)
          {
            SystemUX.scroll_site(delta*5, false);
            // SystemUX.scrolldist = 0;
          }
          else
          {
            SystemUX.scroll_site(delta * 5, true);
            // SystemUX.scrolldist = 0;
          }
        }

        // console.log('scrolling');


        // if(SystemUX.scrlltimetout !== null)
        // {
          //   clearTimeout(SystemUX.scrlltimeout);
          // }
          // SystemUX.scrlltimeout = setTimeout(SystemUX.correctScroll(), 700);
        }

  }
}




let _UXWorker;

class SystemUX {

  constructor(){

  }


  //site scrolling



  static Init(){


    // this.depth = 0;
    // this.depthTo = 0;
    // this.focalPoints = {};
    // this.fpi = 0;
    // this.fpKeys = [];
    // this.closestFP = 0;
    let pshort = SystemUX.pshort = 3;
    if(SystemUI.ismobile)
      pshort = SystemUX.pshort = 1;

    SystemUX.scrollBlock = document.getElementById('scroll_block');
    SystemUX.scrollBlock.scrllHeights = {};



    // Worker Setup //
    {

      if(typeof(_UXWorker) == "undefined")
        {
          _UXWorker = new Worker('./js/workers/utilities/ux-worker.js');
        }

        _UXWorker.addEventListener('message', function(e){
          let s = e.data.state || e.data.s;

          if(s === 'update')
          {}
          else if(s === 'tsup')
          {
            $(tscrls[e.data.id].$).html(e.data.val);
          }
          else if(s === 'site-depth-update')
          {
            // SystemUX.depth = e.data.depth;
            // console.log(e.data.depth);
          }
          else if(s === 'log')
          {
            // console.log(e.data.message);
          }
        });

        _UXWorker.addEventListener('install',function(e){
            e.waitUntil(
                Promise.all([caches.open(STATIC_CACHE_NAME),caches.open(APP_CACHE_NAME),self.skipWaiting()]).then(function(storage){
                    let static_cache = storage[0];
                    let app_cache = storage[1];
                    return Promise.all([static_cache.addAll(CACHE_STATIC),app_cache.addAll(CACHE_APP)]);
                })
            );
        });

        _UXWorker.addEventListener('activate', function(e) {
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
    /// Worker Setup //

    let fclpts = $('.fclpt').not('.set');
    for(let i = 0; i < fclpts.length; i++)
    {
      this.AddFP(fclpts[i], $(fclpts[i])[0].dataset['fclpt']);
      fclpts[i].classList.add('set');
    }



    window.addEventListener('wheel', handleScroll);
    // let last_known_scroll_position = 0;
    // let ticking = false;
    // window.addEventListener('scroll', function(e) {
    //   last_known_scroll_position = window.scrollY;
    //
    //   if (!ticking) {
    //     window.requestAnimationFrame(function() {
    //       console.log(last_known_scroll_position);
    //       ticking = false;
    //     });
    //
    //     ticking = true;
    //   }
    // });


    // SystemUX.scrollBlock.addEventListener('wheel', function(){
    //   SystemUX.scrollBlock.lstScrollTop = SystemUX.scrollBlock.scrollTop;
    // });


    document.addEventListener('mousemove', function(e){

      {
        // SystemUX.mouseevent('move', e);
        // SystemUX.mouseData.movementX = e.movementX;
        // SystemUX.mouseData.movementY = e.movementY;

        // console.log(e.path);

        // for(var i = 0; i < e.path.length; i++)
        // {
        //   var pth = e.path[i];
        //   var cls = pth.classList;
        //
        //   // if(pth != SystemUX.lastpth)
        //   // {
        //     if(cls && (cls.contains('input-field') || e.path[i].tag == 'button' || cls.contains('btn')))
        //     {
        //       // console.log(cls);
        //       break;
        //     }
        //     else if(cls && cls.contains('scrllabl')){
        //       // SystemUX.lastscrllabl = pth;
        //       break;
        //     }
        //     else {
        //       // $('#scroll_box').removeClass('active');
        //     }
        //   // }
        // }

        // $('#scroll_box').css({
        //   'top': e.clientY + 'px',
        //   'left': e.clientX + 'px'
        // });

        // console.log(e);
      }

      // var sb = SystemUX.scrollBlock;
      //
      // sb.style.left = e.pageX;
      // sb.style.top = e.pageY;
      //
      //
      //
      // var items = getAllElementsFromPoint(e.pageX, e.pageY);
      // var output = [];
      // var scrllabl = null;
      // for (var i = 0; i < items.length; i++) {
      //     output.push(items[i].tagName);
      //
      //     if(items[i].classList.contains('scrllabl'))
      //     {
      //       scrllabl = items[i];
      //
      //       if(!(scrllabl.id in sb.scrllHeights)){
      //         if(scrllabl.classList.contains('dpth-field'))
      //         {
      //           // sb.style.height = scrllabl.getBoundingClientRect().height/scrllabl.children.length;
      //           sb.scrllHeights[scrllabl.id] = scrllabl.getBoundingClientRect().height * scrllabl.children.length;
      //           sb.itemCt = scrllabl.children.length;
      //
      //         }
      //       }
      //       else {
      //         sb.children[0].style.height = parseFloat(sb.scrllHeights[scrllabl.id]);
      //       }
      //     }
      //
      //     if(items[i].tagName == 'INPUT'){
      //       // sb.classList.remove('active');
      //       // itsms[]
      //       sb.style.cursor = 'text';
      //       break;
      //     }
      //     else if(items[i].tagName == 'BUTTON' || items[i].classList.contains('btn')){
      //       sb.style.cursor = 'pointer';
      //       break;
      //     }
      //     else {
      //
      //       // sb.classList.add('active');
      //       sb.scroll(0, sb.lstScrollTop);
      //       sb.style.cursor = 'default';
      //     }
      // }
    });

    // document.addEventListener('mousedown', function(e){
    //     SystemUX.mouseevent('mousedown', e);
    // });
    //
    // document.addEventListener('mouseup', function(e){
    //     SystemUX.mouseevent('mouseup', e);
    // });

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    // document.addEventListener('touchstart', function(e){
    //   // console.log(e);
    //   SystemUX.touchData.event = e;
    //   SystemUX.touchData.touchStart = true;
    // }, false);
    //
    // document.addEventListener('touchend', function(e){
    //   SystemUX.touchData.event = e;
    //   SystemUX.touchData.touchStart = false;
    //   SystemUX.touchData.touchEnd = true;
    // }, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    SystemUX.init = true;
  }

  static correctScroll(dt){

  }

  static AnimateScroll(dt){

    if(false)
    {

    }
    else {
      let fplen = Object.keys(this.focalPoints).length;


      // console.log(dpth);
      let pshort = SystemUX.pshort;

      for(let f in this.focalPoints)
      {
        let dpth = Math.round(fplen-1) * (this.depth / this.scrllrng);
        let fpt = this.focalPoints[f][0];

        let dir = [0,0];
        if(fpt.dataset['dir'])
          dir = fpt.dataset['dir'].split(',');
        // console.log(fpt.dataset['dir']);
        // let pt = parseFloat(fpt.dataset['fclpt']);
        // console.log(f);
        // console.log('fp:' + f + ' : ' + (this.depth-f));
        // console.log(f + ' - ' + this.depth);
        if(f == dpth)
          {
            fpt.style.filter = 'blur(0px)';
            fpt.style.opacity = 1;
            fpt.style.pointerEvents = 'all';
            // fpt.style.transform = 'scale(1)';
            // fpt.style.transition = 'transform 1s ease-in';
            // fpt.style.transitionTimingFunction = 'ease-out';

            fpt.style.transform = 'translate(0px, 0px)';
            // fpt.focus();

          }
        else {
            // let del = (1 + (Math.abs(f - dpth)*.01));
            let opct = 1 - (.2 * Math.round(Math.abs(dpth-f)));
            let blr =  5 * Math.round(Math.abs(f - dpth));
            // let ty =  (((f - dpth) * (window.innerHeight/pshort))) + (Math.pow((f-dpth) * 10, 2) * (f-dpth) );

            let ty = (((f - dpth) * (window.innerHeight/pshort))) + ((Math.pow(Math.abs(f-dpth),2.72/1.5)/15) * window.innerHeight);
            if(f-dpth < 0)
              ty = (((f - dpth) * (window.innerHeight/pshort))) - ((Math.pow(Math.abs(f-dpth),2.72/1.5)/15) * window.innerHeight);


            // fpt.style.transitionDelay = del + 's';

            // if(f == 0)
              // console.log(Math.pow(Math.abs(f-dpth),2.72/1.5)/10);

            fpt.style.opacity = opct;

            if(1 - Math.abs(dpth-f)/100 > .1)
              fpt.style.filter = 'blur('+blr+'px)';

            fpt.style.pointerEvents = 'none';

            let scl = 1-(1 * ((f - dpth)/Object.keys(this.focalPoints).length/3 ));

            // fpt.style.transitionTimingFunction = 'ease-in';
            if(!SystemUI.ismobile)
            {
              fpt.style.transform = 'translateY('+ty+'px)';
              // fpt.style.transform = 'translate(-' + (((f - dpth) * (window.innerWidth/pshort/10)) * dir[0]) + 'px,-' + (((f - dpth) * (window.innerHeight/pshort)) * dir[1]) + 'px)  scale('+ (1 + (.2 * (f-dpth) )) + ')';
              // fpt.style.transform = 'scale('+ (1 + (.01 * Math.round(f-dpth) )) + ')';

            }
            else
            {
              // fpt.style.transform = 'translateX('+ (((f - dpth) * (window.innerWidth/pshort))) * dir[0] +'px)';
              // fpt.style.transform = 'translateY('+ (((f - dpth) * (window.innerWidth/pshort))) * dir[1] +'px)';

              fpt.style.transform = 'translate(' + (((f - dpth) * (window.innerWidth/pshort)) * dir[0]) + 'px,' + (((f - dpth) * (window.innerHeight/pshort)) * dir[1]) + 'px)';

            }
            // if(this.animscrll){
            // }


            // fpt.style.transform = 'scale('+ this +')';
        }
      }
    }
  }




  static Update(dt)
  {








    tdx = touchX - lastX;
    tdy = touchY - lastY;

    // log('dx', tdx);
    // log('dy', tdy);

    // if(Math.abs(tdx) > 0)
    // {
    //   SystemUX.depth += -tdx * 3.5;
    // }

    // handleScroll(null, tdy, false);

    // console.log(SystemUX.scrollBlock.scrollTop);


    if(false)
    {
    }
    else {


      let fclpts = $('.fclpt').not('.set');
      let keys = [];

      // register the scroll domain at any given time
      for(let i = 0; i < fclpts.length; i++)
      {
        let elm = $(fclpts[i])[0];
        let fpVal = parseFloat(elm.dataset['fclpt']);

        this.AddFP(fclpts[i], fpVal);
        this.fpKeys.push(fpVal);

        if(i == fclpts.length-1)
        {
          let keys = this.fpKeys;
          this.fpKeys = keys = keys.sort();
          this.scrllMax = keys[keys.length- 1] + Math.abs(keys[keys.length - 1] - keys[keys.length-2]);

          SystemUX.scrllrng = this.fpKeys.length * (window.innerHeight/1.5);
          // _UXWorker.postMessage({s:'scrll-regis-dom', fpkeys:this.fpKeys, rd:registeredDomain});
        }
        let ty =  ((i * (window.innerHeight/SystemUX.pshort))) + Math.pow(i*4,2) *1.5;

        fclpts[i].style.transform = 'translateY('+ty+'px)';

        fclpts[i].classList.add('set');

      }


      if(this.depth > this.scrllrng)
      this.depth = this.scrllrng;
      else if(this.depth < 0)
      this.depth = 0;



      // if(this.animscrll)
      // {

      if(this.animscrll)
      {
        // window.requestAnimationFrame(function(){
          if(!admn)
            SystemUX.AnimateScroll(0);

          SystemUX.animscrll = true;
        // })
      }
        this.animscrll = false;
      // }
    }

    lastX = touchX;
    lastY = touchY;
  }

  static scroll_site(dy, gradient){
    this.animscrll = true;
      if(gradient)
      {
        if(Math.abs(dy) > this.lastdy){
          this.lastdy = Math.abs(dy);
          this.depthTo += dy/50;
        }

        // this.ignorescroll = true;

      }
      else
      {
          if(dy > 0)
          {
            // this.fpi++;
            this.depthTo++;
            // this.depthTo = this.fpKeys[this.fpi];
            // this.canscroll = false;
            // this.ignorescroll = true;
            // window.navigator.vibrate(20);
            // this.AnimateScroll(this.depthTo);
          }

          else if(dy < 0)
          {
            // this.depthTo = this.fpKeys[this.fpi];
            this.depthTo--;
            // this.AnimateScroll(this.depthTo)
            // window.navigator.vibrate(20);
          }
        }

      this.corr = true;
      this.corrTimer = 0;
      // this.canscroll = false;
  }

  static AddFP(e, fp) {
    if(fp in this.focalPoints)
    {
      this.focalPoints[fp].push(e);
    }
    else{
      this.focalPoints[fp] = [];
      this.focalPoints[fp].push(e);
    }
  }


  static mouseData() {
    return this.mouseData;
  }

  static mouseData(prop, val)
  {
    this.mouseData[prop] = val;
  }

  static mouseevent(type, e){
    switch (type) {
      case 'move':
      {
        for(let o in this.uiObjects)
        { }
      }
      break;
      case 'mousedown':
      {
        for(let o in this.uiObjects)
        {
          let obj = this.uiObjects[o];

          if(obj.pointInRect(e.pageX, e.pageY))
            obj.mousedown(e.pageX, e.pageY);
        }
      }
      break;
      case 'mouseup':
      {
        for(let o in this.uiObjects)
        {
          let obj = this.uiObjects[o];

          if(obj.pointInRect(e.pageX, e.pageY))
            obj.mouseup(e.pageX, e.pageY);
        }
      }
      break;
    }
  }


}

SystemUX.touchData = {};
SystemUX.mouseData = {};
SystemUX.init = false;

SystemUX.depth = 0;
SystemUX.lastDepth = 0;
SystemUX.depthTo = 0;
// SystemUX.dpth = 0;
SystemUX.focalPoints = {};
SystemUX.fpi = 0;
SystemUX.fpKeys = [];
SystemUX.closestFP = 0;
SystemUX.scrollbar = null;
SystemUX.corrDelay = .1;
SystemUX.corrTimer = 0;
SystemUX.corr = false;
SystemUX.dt = 0;

SystemUX.lastdy = 0;
SystemUX.canscroll = true;
SystemUX.scrolldist = 0;
SystemUX.animscrll = true;
SystemUX.scrllrng = 0;
SystemUX.pshort = 0;


SystemUX.lastpth = null;
