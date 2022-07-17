


//. Editor_ Provides live feedback of any modifications to site content and styling.
//    Provides simple to complex modification tools.
//    Will support live syntaxed javascript.
//    Modifies local serialized data and re-styles the site state in parallel.
//

//. Subject_ Components paired with serialized data
//    Components are html elements used for accessibility, and rendered by WGL_Functions
//    The serialized data will be localized

//. The active subject is highlighted and its data populates the editor panels/widgits.
// document.onmousemove = function(e){
//   Editor.mouse = {x: e.pageX, y: e.pageY};
//   console.log('e');
// }

class Editor {

  constructor(){

  }
// panelid.componentType.typeIndex
  static serial = {
    data: {
      utilities : [],
      components: {
        "10.1.1":{
          val:"Godschild",
          // children:["10.1.2"],
        },
        "00.2.1":{
          val: "shop",
        }
      },

      panels: {
        //00 - 09 utility panel & utility flyouts
        00: {components:["00.2.1"]},
        //10 - 19 home page panel & flyouts
        10: {name:"home",components:["10.1.1"]},
      },
      style: {
        "10.1.1": {
          left: '20rem',
          top: '20rem',
          right: '50rem',
          // fontsize: 50,
          cursor: 'pointer',
          border: '2px solid black',
          position: 'absolute',
          opacity: '20rem',
          color: '20rem',
          filter: '50rem',
          // fontsize: 50,
          'border-radius': 'pointer',
          queries: {
          },
        },
        // "10.1.2": {
        //   left: '20rem',
        //   top: '20rem',
        //   right: '50rem',
        //   // fontsize: 50,
        //   cursor: 'pointer',
        //   border: '2px solid black',
        //   queries: {
        //   },
        // },
        // "1440x2600" : {}
      },
      // events:{
      //   "00.2.1":{
      //     'mouseover':
      //   }
      // }
    },
    interface:{
      // key

    },
    add: function(type, options){

      switch(type){
        case 'page':{

        }
        break;
        case 'component':{

        }
      }
      //dataTypes (for now) :
      //buttons, effects, textfields, fonts, background effects, input fields

      //id structure = compType.
      /*  serial data structure
      site data {pages by id, styling}
      effect data {}
      component data:
        by type
        unique id:
          child ids:
          content data

      */

      // Editor.subject(this.data.site

      // var temp = document.createElement(comp);
      // temp.id = 'temp obj';
      // temp.innerHTML = "temporary object content";
      // document.getElementById('content_wrapper').appendChild(temp);
      // console.log(doe)
    },
    delete: function(){}
  }
  // static subject = {}
  static Update(dt) {
    Editor.deltaTime = Frames.dt('edtr_update');

    // console.log('eu')
    $('.input-k.set,.input-v.set').each(function(){
      // let
      let b = $(this);
      "keyup".split(" ").forEach(function(e){
        b[0].addEventListener(e, function(){
          // let data = this.dataset['mfst'];
          let data = JSON.parse(this.parentElement.dataset['mfdata']);
          let compuid = data.cuid;
          let key = this.dataset['key'];
          let type = this.dataset['type'];
          let path = this.parentElement.dataset['mpath'].split('/');
          let value = this.value;
          // console.log(value);

          if(type == "k") {
            // if(Editor.render.rename(path, key, value)){
              Editor.manifest.rename(path, key, value);
              this.dataset['key'] = value;
              this.nextSibling.dataset['key'] = value;
            // }
          }
          else if(type == "v"){
            Editor.manifest.set(path, key, value);
            // Editor.render.set('style', compUID);
          }
          Editor.render.refresh(compuid, path, key);
          // if()
        }, 0);
      });
      $(this).removeClass('set');
    });


    $('.win-infinite-unset').each(function(){
      // let children = Array.from(this.children());
      let win = this;
      // win..attribute['tabindex'] = 0;
      console.log

      win.addEventListener('wheel', (e) => {
        if(e.ctrlKey){

          e.preventDefault();


          $(win).find('.anchored:not(.tester)').each(function(){

            let dir = Math.sign(e.deltaY) < 0 ? 1 : -1;

            //pt : previous transformations
            let r = this.getBoundingClientRect();
            let pt = this.parentElement.dataset['trsfrm'] ? JSON.parse(this.parentElement.dataset['trsfrm']) : {scl:1, orgn:{x:0, y:0}, trslt:{x:-r.width/2, y:-r.height/2}};
            pt.scl = Math.round(parseFloat(pt.scl) * 100) / 100;
            // pt.trslt.x = Math.round(pt.trslt.x * 10) / 10;
            // pt.trslt.y = Math.round(pt.trslt.y * 10) / 10;
            // pt.orgn.x = Math.round(pt.orgn.x * 10) / 10;
            // pt.orgn.y = Math.round(pt.orgn.y * 10) / 10;

            // let prevscl = parseFloat(this.parentElement.dataset['scl']) || 1;
            // let prevorgn = JSON.parse(this.parentElement.dataset['orgn']) || {x:0,y:0};
            // let prevtrans = JSON.stringify(this.parentElement.dataset['trans']) || {x:0, y:0};
            let speed = 50;
            let step = dir / (speed / pt.scl);

            // console.log(pt.scl);
            let sclPrime = pt.scl + (dir / (speed / pt.scl));
            sclPrime = Math.max(0.25, Math.min(sclPrime, 400));


            let orgn = {x: e.pageX - r.left, y: e.pageY - r.top};
            let orgnPrime = {x: Math.round((orgn.x / pt.scl) *10)/10, y: Math.round((orgn.y / pt.scl) *10)/10};

            let trsltPrime = pt.trslt;

            if(orgn.x !== pt.orgn.x)
              trsltPrime.x = trsltPrime.x + (orgn.x - pt.orgn.x * pt.scl) * (1 - 1 / pt.scl);

            if(orgn.y !== pt.orgn.y)
              trsltPrime.y = trsltPrime.y + (orgn.y - pt.orgn.y * pt.scl) * (1 - 1 / pt.scl);

            trsltPrime.x = Math.round(trsltPrime.x * 10)/10;
            trsltPrime.y = Math.round(trsltPrime.y * 10)/10;
            // trsltPrime.x -= this.getBoundingClientRect().width/2;

            Object.assign(this.style, {
              transformOrigin: `${orgnPrime.x}px ${orgnPrime.y}px`,
              // transform: 'translate('+trsltPrime.x +'px, '+ trsltPrime.y + 'px)',
              transform: 'translate('+trsltPrime.x +'px, '+ trsltPrime.y + 'px) scale('+ sclPrime +')',
            });

            pt.scl = sclPrime;
            pt.orgn = orgnPrime;
            pt.trslt = trsltPrime;

            this.parentElement.dataset['trsfrm'] = JSON.stringify(pt);
          });

        }

      });

      // win.addEventListener('mousedown', (e) => {
      //   if(e.which == 2 && e.ctrlKey){
      //     console.log('reset');
      //   }
      //   $(win).focus();
      // });


      this.classList.remove('win-infinite-unset');
      this.classList.add('win-infinite');
      // this.tabindex = 0;
    });
    // $('.can-rsw').each(function(){
    $('.set-rs-w').each(function(){
      let rl = document.createElement('div');
      let rr = document.createElement('div');

      rl.classList.add('rsl', 'set-rs', 'rsw');
      rr.classList.add('rsr', 'set-rs', 'rsw');

      this.appendChild(rl);
      this.appendChild(rr);

      this.classList.remove('set-rs-w');
      // this.classList.add('rs-');
    });
    $('.set-rs-h').each(function(){
      let rt = document.createElement('div');
      let rb = document.createElement('div');

      rt.classList.add('rst', 'set-rs', 'rsh');
      rb.classList.add('rsb', 'set-rs', 'rsh');

      this.appendChild(rt);
      this.appendChild(rb);

      this.classList.remove('set-rs-h');
      // this.classList.add('rs-');
    });
    $('.set-rs').each(function(){
      this.addEventListener('mousedown', (e)=>{
        let d = {
          mx: e.pageX,
          my: e.pageY,
          cw: this.parentElement.getBoundingClientRect().width,
          ch: this.parentElement.getBoundingClientRect().height
        };

        if(this.classList.contains('rsl'))
        d.rsl = 1;
        else if(this.classList.contains('rsr'))
        d.rsr = 1;
        else if(this.classList.contains('rst'))
        d.rst = 1;
        else if(this.classList.contains('rsb'))
        d.rsb = 1;

        this.parentElement.dataset[0] = JSON.stringify(d);
        Editor.uiSubjects['resize'] = this.parentElement;
      });
      this.addEventListener('mouseup', (e)=>{
        if(Editor.uiSubjects['resize'] == this.parentElement) Editor.uiSubjects['resize'] = null;
        delete this.parentElement.dataset[0];
        // this.parentElement.dataset[0];''
      });

      this.classList.remove('set-rs');
      this.classList.add('rsw');
    });
    //   let drg = JSON.parse(this.dataset['drg']);
    //   // let r = this.getBoundingClientRect();
    //
    //   Object.assign(this.style, {width: drg.cw + (drg.mx - Editor.mouse.x)*2});
    // });

  }
  static Draw(dt){
    // ctx.beginPath();
    let ctx = Editor.ctx;
    // console.log(ctx);
    ctx.clearRect(0, 0, 10, 10);
    // ctx.fillRect(0, 0, 10, 10);
    // ctx.

    // Frames.new('edtr_draw', Editor.Draw);

  }
  static Init(parent){

    // Editor.ui = new Interface();

    // $.ajax({
    //   type:"GET",
    //   url: '../js_common/Editor/Editor.php',
    //   data:{},
    //   success: function(data)
    //   {
        Editor.wrapper = document.getElementById(parent) || document.createElement('div');
        Editor.wrapper.id = "edtr_window";

        let w = Editor.wrapper, inner = document.createElement('div'), temp = document.createElement('div');

        inner.id = "edtr_board";
        inner.classList.add('win-inner', 'anchored');
        // w.appendChild(inner);

        // Editor.wrapper.appendChild(Editor.wrapper);

        // Editor.toolBar = document.getElementById('edtr_toolbar');

        // elem id, classes, parent elm id.
        Editor.rndr = new Edtr_Panel('edtr_rndr', ['panel-wrapper','set-rs-w', 'anchored'], 'edtr_window');
        // Editor.rndr = new Edtr_Window('edtr_rndr', ['set-rs-w'], 'rndr_panel');
        // Editor.ttl_mnu = new Edtr_Menu('edtr_title_mnu', {
          // 'new site': Site.manifest[0]('vertigo','new', )
        // });
        // Editor.props = document.getElementById('edtr_props');

        // Editor.rndr.appendChild(Site.wrapper);

        // Editor.rndr.appendChild(Site.wrapper||document.createElement('div'));

        Editor.uiSubjects = {};
        document.onmousemove = function(e) {
          // console.log(Editor.uiSubjects['resize']);
          if(Editor.uiSubjects['resize'] != null){
            let s = Editor.uiSubjects['resize'];
            let r = s.getBoundingClientRect();
            let data = JSON.parse(s.dataset[0]);
            let cw = data.cw, ch = data.ch, mx = data.mx, my = data.my, px = e.pageX, py = e.pageY;
            let p = s.parentElement;
            let _t = p.dataset['trsfrm'];

            if(_t && JSON.parse(_t).scl != 1)
              return;

            if(data.rsl)
              Object.assign(s.style, {width: cw + (mx - px)*2 + 'px'});
            else if(data.rsr)
              Object.assign(s.style, {width: cw - (mx - px)*2 + 'px'});

            if(data.rst)
              Object.assign(s.style, {height: ch + (my - py)*2 + 'px'});
            else if(data.rsb)
              Object.assign(s.style, {height: ch - (my - py)*2 + 'px'});

            // console.log($(s)[0] );
            // if((data.rsl || data.rsr || data.rst || data.rsb) & s.id == 'site_wrapper'){
            //   console.log('rsz-site');
            //
            // }

            // console.log(s.style);
          }
          //
          //
          //
          // let target = e.path[0];
          // Frames.new('edtr_transform', function(){
          //   let m = Editor.mouse = {x: e.pageX, y: e.pageY};
          //
          //   if(Editor.subject && Editor.subject.canmove){
          //     let o = JSON.parse(Editor.subject.render.dataset['cmoff']);
          //     Object.assign(Editor.subject.render.style, {left: m.x-o.x, top: m.y - o.y});
          //   }
          // });
          //
          // let triggers = ['handle', 'active'];
          // if(triggers.some(c => target.classList.contains(c))){
          //   if(target.classList.contains('rs-w')){
          //     // target.parentElement.style =
          //     // console.log(target.parentElement.getBoundingClientRect());
          //     if(target.dataset[0]){
          //       let data = JSON.parse(target.dataset[0]);
          //       Object.assign(target.parentElement.style, {width: data.w - (e.pageX-data.mx)*2});
          //     }
          //
          //   }
          //   else if(target.classList.contains('rs-h')){
          //
          //   }
          // }
        };
        document.onmouseup = function(e) {
          if(Editor.subject)
            Editor.subject.canmove = false;
          if(Editor.uiSubject){
            delete Editor.uiSubject.dataset[0];
            Editor.uiSubject = null;
          }

          let target = e.path[0];
          let triggers = ['handle'];


          if(triggers.some(c => target.classList.contains(c))){
            // console.log('click')
            target.classList.remove('active');
            delete target.dataset[0];
          }
        };
        document.onmousedown = function(e) {
          let target = e.path[0];
          let triggers = ['handle'];


          if(triggers.some(c => target.classList.contains(c))){
            // console.log('click')
            target.classList.add('active');
            target.dataset[0] = JSON.stringify( {mx:Editor.mouse.x, w: target.parentElement.getBoundingClientRect().width} );
            // target.dataset['wdth']
          }
        }
    //   }
    // })

    // let w = Editor.wrapper;
    // let tb = Editor.toolBar = document.createElement('div');

    // w.style = "position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none";
    // w.classList.add('edtr-wrapper');

    // tb.classList.add('edtr-toolbar');


    // let s = Editor.wrapper.win_style = document.createElement('div');
    // Editor.styPan = Editor.newToolPanel('style');
    // Editor.compPan = new Edtr_Panel('comp');
    // s.style = "position: absolute; width: 300px; height: 500px; top: 5rem; right: 2rem; border: black 2px solid; pointer-events: all;";

    let win_comps = Editor.win_components = document.createElement('div');
    let win_style = Editor.win_style = document.createElement('div');
    let win_effects = Editor.win_effects = document.createElement('div');
    let win_content = Editor.win_content = document.createElement('div');

    win_comps.classList.add('edtr-window', 'primary');
    win_style.classList.add('edtr-window', 'primary');
    win_style.id = "win_style";
    win_effects.classList.add('edtr-window', 'primary');
    win_content.classList.add('edtr-window', 'primary');

    // win_comps.style = win_style.sty




    // Editor.manifest[0]('savant', 'save', JSON.stringify(Editor.serial.data) );
    // Editor.serial.add("div");
    // Editor.manifest[0]('savant', 'load');
    Editor.manifest[0]('null', 'delete');

    // Editor.wrapper.appendChild(win_style);
    // Editor.wrapper.appendChild(tb);
    // Editor.wrapper.appendChild(win_comps);

    // document.body.appendChild(Editor.wrapper);
    // Editor.rLayer = Rndr.layers.add('edtr', Editor.wrapper);
    // Editor.ctx = Editor.rLayer.ctx;
    Navigator.editorOverride = true;
    // Editor.manifest('savant', 'load');
    Frames.new('edtr_update', Editor.Update, 500);

    Site.Init(Editor.rndr);
    // Frames.new('edtr_draw', Editor.Draw);

    // Frames.new('edtr_draw', Editor.Draw);
  }

  static render = {
    data : {},
    refresh : function(uid, path, key){
      // console.log(this.data[uid]);
      if(!uid){
        for(var c in Editor.render.data){
          // Editor.render.data[c].style = Editor.serial.data.style[c];
          // console.log(Editor.render.data[c].style);
          Object.assign(Editor.render.data[c].style, Editor.serial.data.style[c]);
        }
        return;
      }
      for(var c in this.data){
        Editor.render.data[c].style[key] = Editor.serial.data.style[uid][key];
      }
      // if(uid && path)
      // console.log(this.data[uid].style[path[path.length - 1]]);
      // Object.assign(this.data[uid].style[path[path.length-1]], Editor.manifest.find(path));
      // else
        // for(var)
        // else
          // for(var c in this.data)
            // Object.assign(this.data[c].style, Editor.serial.data[grp][c]);
      // }
    },
    rename : function(path, key, val){

      // console.log(key);
      // console.log(Object.keys($('body')[0].style).indexOf(key)+1);
      // if(!Object.keys($('body')[0].style).indexOf(key)+1)
      //   return false;
      // // console.log(this.data[path[path.length-1]].style);
      // // console.log(val);
      //
      // console.log(this.data[path[path.length-1]].style);
      // // Object.assign(this.data[path[path.length-1]], [val]: this.data[path[key]])
      // return true;
    },
    bloom : function(_m = Editor.serial.data, _key = null, path = [], data = {}){
      if(!_key){
        for(let content in _m){
          let c = this.bloom(_m, content);
          $(Site.contentWrapper[0]).append(c);
        }
      }else {
        switch(_key){
          case 'components': {
            let comps = _m[_key];
            for(let comp in comps){
              let c = document.createElement('div');
              c.innerHTML = comps[comp].val;
              // c.style = Editor.serial.data.style[comp];
              // console.log(comps[comp]);

              this.data[comp] = c;

              for(var ch in comps[comp].children){
                let child = this.bloom(_m[_key], _key);
                c.appendChild(child);
              }
              // console.log(this.data);
              return c;
            }

          }
          break;
          default:
          break;
        }
      }

    },


  }
  static manifest = {

    0:function(theme, action, serial, url){
      $.ajax({
        type: "POST",
        url: "includes/manifest_data/manifest.php",
        data: {action:action,theme:theme, ser: serial},
        async: false,

        success: function(data){

          data = JSON.parse(data);
          try{
            if(data && data.action == "load"){
              Editor.serial.data = data.data;
              Editor.manifest.bloom(data.data);
              Editor.render.bloom(data.data);
              Editor.manifest.b();
              Editor.render.refresh();


            }
            else if(data && data.action == 'delete'){
              console.log(data.data);
            }
          }
          catch(err){
            // console.log(data);
            console.log(err);
          }

        },

        error: function(p1, p2, p3){
          console.log('manifest.php error');
        }
      });
    },

    1: {
      components: {
        "10.1.1":{
          content:"Godschild",
          style: {
            left: '12rem',
            top: '15rem',
            right: '50rem',
            // fontsize: 50,
            cursor: 'pointer',
            border: '2px solid black',
            position: 'absolute',
            opacity: '20rem',
            color: '20rem',
            filter: '50rem',
            // fontsize: 50,
            borderRadius: 'pointer',
            queries: {
            },
          },
          type: 'div'
          // children:["10.1.2"],

        },
        "00.1.1":{
          style:{
            width: '100%',
            height: '20rem',
            border: 'black solid 2px',
          },
          components:{
            "uid1": {content: "shop", type: 'li'},
            "uid2": {content: "nfts", type: 'li', style: {
              background: 'red',
              border: 'black 2px dashed',
              'border-radius': '5px',
              width: '50px',
              height: '100px',
              position: 'absolute'
            }},
          },
          type:'ul'
        }
      },
    },

    set: function(path, key, value){
      this.find(path)[key] = value;
      console.log(key + " : " + this.find(path)[key]);

    },
    set2: function(path, key, value){
      this.find2(path)[key] = value;
      // this.find2(path) = value;
      // console.log(key + " : " + m[key]);

    },


    rename: function(path, key, newkey) {
      if(key == newkey)
        return;
      let subject = this.find(path);
      // console.log(subject);
      delete Object.assign(subject, {[newkey]: subject[key]} )[key];
      console.log(newkey + " : " + this.find(path)[newkey]);
    },
    rename2: function(path,key,newkey) {
      if(key == newkey)
        return;
      let subject = this.find2(path);
      // console.log(subject);
      delete Object.assign(subject, {[newkey]: subject[key]} )[key];
      // console.log(newkey + " : " + subject[newkey]);
    },


    add: function(){},
    delete: function(){},


    find: function(path){
      let pi = 0, subject = Editor.serial.data;
      while( pi < path.length){
        if(pi == path.length - 1){
          // console.log(path[pi]);
          return subject[path[pi]];
        }

        subject = subject[path[pi]];
        pi++;
      }
    },
    find2: function(path){
      let pi = 0, subject = Editor.manifest[1];
      while( pi < path.length){
        if(pi == path.length - 1){
          // console.log(path[pi]);
          return subject[path[pi]];
        }

        subject = subject[path[pi]];
        pi++;
      }
    },
    // given a manifest file/object :
    // recursively loop through all nodes/properties and maintain reference to the path from head to leaf.
    // each node will generate a relevant element that binds input to the provided manifest
    bloom: function(_m = Editor.serial.data, _key = null, _path = [], data = {}){

      // console.log(p);
      // let elm = document.createElement(elmtype);
      // if(Object.keys(data).length)
      //   data = JSON.parse(data);

      if(!_key)
        for(var key in _m){
          let path = _path.concat(key);
          switch(key){
            case 'style' : {
              let inner = document.createElement('div');

              // inner.classList.add(['inner-wrapper']);
              // inner.dataset['mpath'] = path.concat(prop).join('.');

              // field.classList.add('');
              // let inner = document.createElement('div');
              // inner.innerHTML = 'style block';
              // let handles = Editor.manifest.bloom(path + )
              let m = _m[key];
              // path = path.concat(prop);
              // inner.innerHTML = key;

              for(var key in m){
                // path = path.concat(key);
                Object.assign(data, {cuid:key});
                inner.appendChild(this.bloom(m[key], key, path, data));
              }
              // for(let prop in m){
              // let inner = document.createElement('div');
              // inner.innerHTML = comp;
              // let p2 = [pg].concat(prop);
              // if(m[prop])
                // inner.appendChild(this.bloom(m, prop,path));

              Editor.wrapper.win_style.innerHTML = "";
              Editor.wrapper.win_style.appendChild(inner);
              // console.log(inner);
              return inner;
            }
            break;
            case 'queries':
            break;
            case 'utilities':
            break;
            case 'panels':
            break;
            default :{
              // for(var prop in m){
              //
              // }
            }
            break;
          }
          // this.bloom(m[pg], [pg]);
        }
      else {

        // let m = _m[_key];
        // let pth = path.split('.');
        // let pos = p[p.length - 1];
        let container = document.createElement('div');
        switch(_key){

          // case 'queries' : {
          //
          // }
          // break;
          // case (_key.split('.').length >= 3) : {
          //   console.log(_key);
          // }
          // break;
          default : {
            // console.log(_path.indexOf('style')+1)
            if(_path.indexOf('style')+1 && _key.split('.').length >= 3) {
              container.innerHTML = _key;
              // container.dataset['mpath'] =
              _path = _path.concat(_key);
              // console.log(_path + " : " + _key);
              // console.log(data);
              for(var __key in _m){
                // console.log(_m[__key], __key, _path);
                container.appendChild(this.bloom(_m[__key], __key, _path, data));

                // let handleWrap = document.createElement('div');
                // let key = document.createElement('input'), val = document.createElement('input');
                //
                // key.dataset['mpath'] = val.dataset['mpath'] = _path;
                // key.dataset['key'] = val.dataset['key'] = __key;
                //
                // key.value = __key;
                // val.value = _m[__key];
                // // handleWrap.append(_path);
                // handleWrap.appendChild(key);
                // handleWrap.appendChild(val);
                // container.appendChild(handleWrap);
              }

              // return document.createElement("div");
            } else if(Object.keys($('body')[0].style).indexOf(_key)+1){
              // console.log(_path);

              let hw = document.createElement('div');
              hw.classList.add('input-kv-wrapper');
              hw.dataset['mpath'] = _path.join('/');
              hw.dataset['mfdata'] = JSON.stringify(data);

              let key = document.createElement('input'), val = document.createElement('input');

              key.dataset['key'] = val.dataset['key'] = _key;

              key.dataset['type'] = 'k';
              val.dataset['type'] = 'v';

              key.classList.add('input-k', 'set');
              val.classList.add('input-v', 'set');

              key.value = _key;
              val.value = _m;

              // if(_m.length)

              hw.appendChild(key);

              // let valGrp = document.createElement('div');
              // valGrp.class = valgr
              // for(var v in _m.split(' ')){
              //   val = document.createElement('span');
              //   val.dataset['key'] = ;
              //   val.classList.add('value');
              //   valGrp.appendChild(val);
              // };
              hw.appendChild(val);

              container.appendChild(hw);
              // key.onchange = console.log(key.val);
            }/*
            if(p[p.length - 2] == 'style'){
              for(var prop in m){
                let handleWrapper = document.createElement('div');

                let keyHandle = document.createElement('input');
                keyHandle.dataset['mfst'] = ["key", p.join(',')].join('/');
                keyHandle.dataset['mfst.key'] = prop;
                keyHandle.classList.add('newbind');
                // keyHandle.dataset
                let valueHandle = document.createElement('input');
                valueHandle.dataset['mfst'] = ["val", p.join(',')].join('/');
                valueHandle.dataset['mfst.key'] = prop;
                valueHandle.classList.add('newbind');




                // modify value of property [key]... delete Object.assign(obj, [newkey], oldkey)[oldkey];
                // let keypath =
                keyHandle.value = prop;
                valueHandle.value = m[prop];


                handleWrapper.appendChild(keyHandle);
                handleWrapper.appendChild(valueHandle);
                // keyHandle.addEventListener('keyup', function(){console.log(prop)});

                container.appendChild(handleWrapper);
              }
              // handle.innerHTML = pos;
              // field.appendChild(handleWrapper);

            }
            */
          }
          break;
        }
        return container;


        // if(m && parray[parray.length - 1] == 'style'){
        //   let w = document.createElement('div');
        //   w.innerHTML = 'style object';
        //
        //   Editor.wrapper.styl.appendChild(w);
        //
        //   // console.log(m);
        // }
      }

    },
    b : function(m = Editor.manifest[1], path = [], _data = {}){
      // console.log(data);
      if(!path.length)
      // loop through data groups
      for(var dg/*data group*/ in m/*manifest*/){
          if(dg == 'components'){
            this.b(m[dg], path.concat(dg));
          }
          else if(dg == 'style'){

          }
        }
      else {
        // console.log(data);
        let key = path[path.length-1];
        if(key == 'components'){
          // console.log(m);
          for(var c in m){
            let p = path.concat(c), component = m[c],
            data = {render : this.render(component, p), cpath: p};
            // let render = data;

            for(var prop in component){
              let p2 = p.concat(prop);
              this.b(component[prop], p2, Object.assign(data, {uicomp:Editor['win_'+prop]}));
            }

            component.render = data.render;

            // if there is a parent object, append rendered object to parent.
            if (_data.render) _data.render.appendChild(data.render);
            // if no parent, append to body for now.
            else document.body.appendChild(data.render);

          }
        }else if(key == 'style'){

          // console.log(m);
          m.uicomp = _data.uicomp = document.createElement('div');
          m.uicomp.classList.add('inner-wrapper');
          // _data.bind
          for(var k in m){
            // if(!Object.keys($('body')[0].style).indexOf(k))
              // continue;
            let p = path.concat(k), data = {};
            // let p = path.concat(k);
            // if(Object.keys(m[k]).length > 1)
            //   data = Object.assign{key, val: m[key]};
            // let keydata = {key: k};
            // let valdata = {key: k, val: m[k]};

            if(_data.uicomp && Object.keys($('body')[0].style).indexOf(k)+1)
              _data.uicomp.appendChild(Editor.manifest.bind.kv(_data.cpath, path[path.length-1], k));
          }

          // if()
        }
      }

      // return {render:null, interface: null}
      // console.log(path);
      // console.log(data);
    },



    render:function(m, path){
      // console.log(m.type);
      let component = document.createElement(m.type || 'div');
      // for(var component)
      component.innerHTML = m.type;
      let comp = Editor.manifest.find2(path);
      component.dataset['uid'] = path[path.length-1];

      // break
      // if(comp.style)
        // console.log(comp.style)
      Object.assign(component.style, comp.style);

      // component.onclick = function(e){
      //   // console.log(path);
      //   Editor.highlight(path);
      //   e.stopPropagation();
      // }
      component.onmousedown = function(e){
        // console.log('down');
        Editor.highlight(path);
        comp.canmove = true;
        this.classList.add('canmove');
        // let r = this.getBoundingClientRect();
        // let p = this.parentElement;
        // while(p && p.style.position == 'absolute' && (p.style.left || p.style.top)){
        //   r.x += p.getBoundingClientRect().x;
        //   r.y += p.getBoundingClientRect().y;
        //   p = p.parentElement;
        // }
        // let x = this.
        this.dataset['cmoff'] = JSON.stringify({x:e.pageX - this.offsetLeft, y:e.pageY - this.offsetTop, canmove:1});
        // this.canmove = 1;
        e.stopPropagation();
      };
      component.onmouseup = function(e){
        // console.log('up');
        comp.canmove = false;
        this.classList.remove('canmove');
        this.dataset['cmoff'] = '';

        e.stopPropagation();
      };
      // component.onmousemove = function(e){
      //   // console.log(this.classList);
      //   // if(this.classList.contains('canmove')){
      //   //   // console.log(this.getBoundingClientRect().left);
      //   //   // let o = JSON.parse(this.dataset['cmoff']);
      //   //   // this.style.left =  + e.pageX-o.x + 'px';
      //   //   // console.log(this.getBoundingClientRect().left, e.movementX);
      //   // }
      //     // console.log('canmove');
      //
      //   // e.stopPropagation();
      // }
      return component;
      // return comp;
    },



    bind:{
      kv:function(cpath, gkey, k){
        let w = document.createElement('div');
        w.classList.add('kv-wrapper');
        w.dataset['bind'] = JSON.stringify({cpath, gkey, k});
        let kin = document.createElement('input'),
            vin = document.createElement('input');

        kin.classList.add('key');
        vin.classList.add('val');

        kin.value = k;
        vin.value = Editor.manifest.find2(cpath.concat(gkey))[k];

        let kbind = {t:'k'}, vbind = {t:'v'};

        kin.dataset['bind'] = JSON.stringify(kbind);
        vin.dataset['bind'] = JSON.stringify(vbind);

        kin.onkeyup = vin.onkeyup = function(){
          // console.log(this);
          let bind = JSON.parse(this.dataset['bind']);
          let wrprBind = JSON.parse(this.parentElement.dataset['bind']);
          let cpath = wrprBind.cpath;
          let gkey = wrprBind.gkey;
          let key = wrprBind.k;
          // let m = Editor.manifest.find2(path);


          if(bind.t == "k"){
            Editor.manifest.rename2(cpath.concat(gkey), key, this.value);
            this.parentElement.dataset['bind'] = JSON.stringify(Object.assign(wrprBind, {k:this.value}));

            // let valBind = JSON.parse(this.nextSibling.dataset['bind']);
            // this.nextSibling.dataset['bind'] = JSON.stringify(Object.assign(valbind, {k:this.value}));
          }
          else{
            Editor.manifest.set2(cpath.concat(gkey), key, this.value);
            this.dataset['bind'] = JSON.stringify(Object.assign(bind,{v:this.value}));
            // console.log(bind.k);
            // Editor.manifest.refresh(pathp);
          }

          Editor.manifest.refresh(cpath);
        }

        w.appendChild(kin);
        w.appendChild($('<span>:</span>')[0]);
        w.appendChild(vin);
        return w;
      },
    },

    refresh: function(path){
      let comp = Editor.manifest.find2(path);
      let r = comp.render;

      for(var k in comp.style){
        r.style[k] = comp.style[k];
      }
      // console.log(comp.style);
      // comp.render.style = comp.style;
    }



  }
  static interface = {
    bind:{
      kv:function(keyData, valData){

      }
    }
  };

  static highlight = function(path){
    let comp = Editor.manifest.find2(path);

    if(Editor.subject == comp)
      return;
    Editor.subject = comp;

    for(var prop in comp){
      let win = Editor['win_'+prop];
      if(win && comp[prop].uicomp){
        win.innerHTML = '';
        win.appendChild(comp[prop].uicomp);
      }
    }
  }

  // static bloom(manifest = Editor.serial.data){
  //
  // }

  static setPanel(name, data){
    // new RegExp(/(?<!<)\b\w+\b/g)
  }

  static getComponent(){

  }
}


class Interface {
  constructor(){

  }

  bind(){

  }
}
class Edtr_Window {
  constructor (uid, classList = [], parentId) {
    this.wrapper = document.getElementById(uid)|| document.createElement('div');
    this.inner = document.createElement('div');

    this.wrapper.id = uid;
    classList.forEach((c)=>{
      this.wrapper.classList.add(c);
    });
    this.wrapper.classList.add('edtr-window');


    this.inner.classList.add('inner');

    // this.resize = {}
    // if(data.hrzRS)
    //   Object.assign(this.resize,{l:document.createElement('div'), r:document.createElement('div')});
    // if(data.vertRS)
    //   Object.assign(this.resize,{t:document.createElement('div'), b:document.createElement('div')});
    //
    // // this.resize = {
    // //   l:document.createElement('div'),
    // //   r:document.createElement('div'),
    // //   t:document.createElement('div'),
    // //   b:document.createElement('div')
    // // };
    // let rl = this.resize.l, rr = this.resize.r, rt = this.resize.t, rb = this.resize.b;
    // rl.classList.add?.('r-l');
    // rr.classList.add?.('r-r');
    // rt.classList.add?.('r-t');
    // rb.classList.add?.('r-b');
    // // rl.style = rr.style = rt.style = rb.style = {cursor}
    //
    // // let rsw = [rl, rr];
    // // rsw.foreach(r => Object.assign(r.style, {position:'absolute', width: '0.2rem', height: '100%', cursor: 'ew-resize'}));
    // this.wrapper.appendChild(rl);
    // this.wrapper.appendChild(rr);
    // this.wrapper.appendChild(rt);
    // this.wrapper.appendChild(rb);
    this.wrapper.appendChild(this.inner);
    // Editor.wrapper.appendChild(this.wrapper);
    document.getElementById(parentId).appendChild(this.wrapper);

  }
}

class Edtr_Panel {
  // elem id, classes, parent elm id.
  constructor(uid, classList, parentId){

    let wrpr = this.wrpr = document.getElementById(uid) || document.createElement('div');
    wrpr.id = uid;
    classList.forEach((c)=>{ wrpr.classList.add(c); });


    // let pnl = this.panel = document.createElement('div');
    // let hndl = this.handle = document.createElement('div');

    // Object.assign(wrpr.classList, classes);
    // wrpr.classList.add('panel-wrapper');
    // pnl.classList.add('panel-container');
    // pnl.innerHTML = name + ' panel';
    // hndl.classList.add('panel-handle');
    // hndl.innerHTML = name;

    // hndl.onclick = function(){
    //   let pnl = this.parentElement;
    //
    //   let othrmx = $('.panel-wrapper.max');
    //   let othrmn = $('.panel-wrapper.min');
    //
    //   pnl.classList.add('min');
    //   pnl.classList.toggle('max');
    //
    //   if(othrmx.length && othrmx[0] != pnl) othrmx[0].classList.remove('max');
    //   if(othrmn.length && othrmn[0] != pnl) othrmn[0].classList.remove('min');
    //
    // }

    // wrpr.appendChild(this.handle);
    // wrpr.appendChild(this.panel);

    document.getElementById(parentId).appendChild(wrpr);
    // this.panel.style = {right: '3rem'};
    return wrpr;
  }

  append(comp){
    // this.wrpr.appendChild()
  }
}


class Edtr_Tool {}


// $(document).ready(Editor.Init());
