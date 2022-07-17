//// update <canvas> width and height properties to accomodate for css rescaling
// returns a 2D context



function setupCanvas(canvas, gl = false, dpr = 4) {
  // Get the device pixel ratio, falling back to 1.

  // Get the size of the canvas in CSS pixels.

  var rect = canvas.getBoundingClientRect();
  // console.log(rect);
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  var ctx = null;
  if(!gl){
    ctx = canvas.getContext('2d');

    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
  }
  else{
    ctx = canvas.getContext('webgl');

    if(!ctx)
      ctx = canvas.getContext('experimental-webgl');
  }


  return ctx;
}



class Frames {
  constructor(){
    this.now = null;
    this.last = (new Date).getTime();
    this.dt = null;
  }

  static reqs = {};

  static new(key,fn,interval=0){

    Frames.reqs[key] = Frames.reqs[key] || {anim: !interval};

    if(!interval){
      Frames.reqs[key].id = requestAnimationFrame(fn);
      Frames.reqs[key].anim = true;
    }
    else
      Frames.reqs[key].id = setInterval(function(){
        Frames.clock(key, 0);
        fn();
        Frames.clock(key, 1);
      }, interval);






  }
  static clear(key){

    if(!Frames.reqs[key].anim)
      clearInterval(Frames.reqs[key].id);
    else
      cancelAnimationFrame(Frames.reqs[key].id);

    Frames.reqs[key].now = (new Date).getTime();

    // Frames.reqs[key].dt = (now - Frames.reqs[key].last);
  }

  static clock(key, relay){

    if(!relay)
      Frames.reqs[key].now = (new Date).getTime();
    else {
      if(Frames.reqs[key].now && Frames.reqs[key].last) {
        Frames.reqs[key].dt = (Frames.reqs[key].now - Frames.reqs[key].last)/1000;
        Frames.reqs[key].last = Frames.reqs[key].now;
      }
      else if(!Frames.reqs[key].last)
        Frames.reqs[key].last = (new Date).getTime();
    }
  }

  static dt(key){
    return Frames.reqs[key].dt;
  }
}


class Site {

  constructor(){
    this.nav = null;
    this.loaded = false;

  }

  // static contentWrapper = $('#content_wrapper');
  static ctxs = {};
  static Init(){
    Site.wrapper = document.getElementById('site_wrapper');
    Site.contentWrapper = $('#content_wrapper');
    // Site.ctxs['bsod'] = setupCanvas();
    // Site.efct = {
    //   'bsod': new BSOD(),
    // }

    Site.InitLogger();

    // Site.width = window.width;

    // Navigator.Init();
    // Site.navigator.Init();
    // console.log('init');/

    // $('body').append('<script type="text/javascript" src="../js_common/locals/utils/SiteManagement.js"></script>');
    // Navigator.Init();
    // this.nav.Init();


    //     -----     loop through and initialize all effects
    // for(var e in Site.efct){
      // Site.efct[e].Init();
    // }



    //set a timeout function and save it to a unique id
    // ---------- Frames.new('site-update', Site.Update, 1000/60);


    // Set request an animation frame for the draw fn.
    /////// possibly adivide the request among smaller draw requests for each effect draw fn.
    // ---------- Frames.new('site-draw', Site.Draw);

    // document.addEventListener('mousemove', (e) => {
    //   Site.log('mousePos-xy',[e.pageX, e.pageY]);
    // });

    Site.init = true;
    // Site.Resize();
  }

  static Update(dt){


    // Initialize the navigator only after the script is loaded and the navigator object is created;
    // if(Site.navigator)
      // Site.navigator.Init(dt);

    // console.log(Frames.dt('site-update'));


    // Frames.clear('site-update');


    // t.last = t.now;
    // r.main = requestAnimationFrame(Site.Update);

    $('.component').each(function(){
      this.classList.remove('component');

      let comp = new Component(this);
      comp.resized = randomString(3);
      Site.components[comp.uid] = comp;
    });

    $('.glcnv').not('.set').each(function(){
      this.classList.add('set');
      Site.gl = setupCanvas(this, true);
    });

    $('.cnv').not('.set').each(function(){
      this.classList.add('set');

      Site.ctxs[this.dataset['efct']] = setupCanvas(this, false);
    });

    // Loop through and update all effects.
    //
    // for(var e in Site.efct){
      // Site.efct[e].Update();
    // }
  }

  static Draw(){
    // Frames.clock('site-draw', 0);

    for(var e in Site.efct){
      if(!Site.ctxs[e]) continue;
      Site.efct[e].Draw(Site.ctxs[e]);
    }



    // Frames.clock('site-draw', 1);
    // Frames.new('site-draw', Site.Draw);

  }

  static compTypes = {
    ct: {},
    1:function(m){
      this.ct[1] = this.ct[1] + 1 || 1;

      let temp = document.createElement('h1');
      temp.innerHTML = m.comp.val;

      for(var s in m.style.queries.all){

        Editor.interface.bind();

        let e_cont = document.createElement('div');

        let key = document.createElement('input');
        key.value = s;
        let val = document.createElement('input');
        val.value = m.style.queries.all[s];

        e_cont.appendChild(key);
        // e_cont.appendChild('<span>:</span>');
        e_cont.appendChild(val);
        e_cont.style = "width: 40%;";
        // if(i == 1;['left','right','top','bottom'].indexOf(s) > 0){
        //   temp.style.position = 'absolute';
        // }

        temp.style[s] = m.style.queries.all[s];
        // let edtrHndl = document.createElement('div');
        Editor.wrapper.styl.appendChild(e_cont);
      }

      // for(var key in m.events){
      //   temp.addEventListener(key,(e) => {
      //     m.events[key]();
      //   });
      // }
      return temp;
    },
    2:function(comp, styles, fns){}
  }
  static bloom(manifest){
    for(var c in manifest['components']){
      let m = {
        comp: manifest['components'][c],
        style: manifest['style'][c],
        // events: manifest['events'][c]
      }

      //loop through manifest properties (recursive) and
      //generate interface components according to the current path


      let id = c.split('.');
      let temp = Site.compTypes[id[1]](m);
      m.comp.elm = temp;
      document.body.appendChild(temp);
    }
  }

  static Resize(){
    // for(var c in Site.components){
    //   let comp = Site.components[c];
    //   comp.rect = comp.elm.getBoundingClientRect();
    //   comp.drawRect = {
    //     // x:,
    //     y: comp.rect.y * (comp.rect.y/window.innerHeight),
    //     // w:,
    //     // h:,
    //   }
    //   comp.resized = randomString(3);
    // }
    //
    // for(var cv in Site.ctxs){
    //   Site.ctxs[cv] = setupCanvas(Site.ctxs[cv].canvas);
    // }

    Rndr.resize();

    // Dimensions.resize();
  }


  static InitLogger(){
    Site.logData = {logger: $('#logger')};
  }
  static log (key, value) {
    if(Site.logData && Site.logData.hasOwnProperty(key))
    {
      Site.logData[key].val = value;
      $(Site.logData[key].elm).html(key + '        :        ' + value);
    }
    else {
      Site.logData[key] = {val: value, elm: null};
      let elm = document.createElement('div');
      Site.logData['logger'].append(elm);
      Site.logData[key].elm = elm;

      $(Site.logData[key].elm).html(key + '        :        ' + value);
    }
  }
  static clearLog(key){
    Site.logData[key].elm.remove();
    delete Site.logData[key];
  }
}

Site.nav = null;
Site.loaded = false;
Site.pages = {};
Site.components = {};  // uid:component pairs keep track of every visible component on the site.


///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////

// The SiteNav handles dynamic updates to html content blocks
// It also Handles search queries and dynamically loading results




///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////
///// --------------------------------------------------------------------------------------- /////






function genUID(set){
  let gen = randomString(8);
  do {
    gen = randomString(8);
  } while(set.hasOwnProperty(gen));

  return gen;
}

class Component {
  constructor(elm){
    // console.log(elm.getBoundingClientRect())
    // console.log($(elm)[0]);
    this.uid = $(elm)[0].dataset['uid'] || genUID(Site.components); // globalized unique ID as
    $(elm)[0].dataset['uid'] = this.uid;
    // this.elmid = null;
    this.elm = elm;
    this.rect = elm.getBoundingClientRect();

    let effects = this.elm.dataset['effs'].split(',');

    for(var e in effects){
      Site.efct[effects[e]].Register(this);
    }

  }

  Update() {
    // if(this.elm)
      // this.rect = this.elm.rect();

    // Site.log('component-'this.uid)
  }
}


class Layout {
  constructor() {

  }
}













































// Feb 27 2022 -
    // I just set up the site obj components container with unique ids.
    // next I need to register the component in the components of the corresponding Effect
    // or add the effect as a modifier.

    // Next objective: save element rect data, and render rect bounds, and test render accuracy
