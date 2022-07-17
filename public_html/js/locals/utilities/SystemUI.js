class UIObj {
  constructor(elm){
    this.$ = $(elm)[0];
    this.id = null;
    this.rect = {};
    this.children = {};
    this.mouseover = false;
  }

  Init()
  {
    // this.rect.x = this.elm
    this.rect = $(this.$)[0].getBoundingClientRect();
    // $(this.$)[0].style.transition = 'all .2s linear';
    // $(this.$)[0].style.transitionDuration = '1s';
    this.id = Object.keys(SystemUI.uiObjects).length;
    SystemUI.uiObjects[this.id] = {rect:this.rect, drwfn: null};

    for(var c in this.children)
      this.children[c].Init();

    // console.log(SystemUI.uiObjects);
  }

  Update(dt) {
    this.rect = $(this.$)[0].getBoundingClientRect();
    SystemUI.get(this.id).rect = this.rect;

    for(var c in this.children)
    {
      this.children[c].Update(dt);
    }

  }

  drwfn(fn){
    SystemUI.uiObjects[this.id].drwfn = fn;
  }
  Draw(ctx){

  }

  get(key) {
    return this.children[key];
  }
  set(key, elm){
    var obj = new UIObj(elm);
    this.children[key] = obj;
    obj.parent = this;
    return obj;
  }

  pointInRect(x,y)
  {
    return (x >= this.rect.x && x <= this.rect.x + this.rect.width && y >= this.rect.y &&  y <= this.rect.y + this.rect.height);
  }

  mousedown(x,y){
    for(var c in this.children)
    {
      var obj = this.children[c];

      if(obj.pointInRect(x,y))
        obj.mousedown(x,y);
    }
  }

  mouseup(x,y){
    for(var c in this.children)
    {
      var obj = this.children[c];

      if(obj.pointInRect(x,y))
        obj.mouseup(x,y)
    }
  }
}

class SystemUI {

  static resize() {
    this.ctx = setupCanvas(this.canvas);
    // console.log(window.devicePixelRatio);
    this.ismobile = window.devicePixelRatio > 1.25;

    window.setTimeout(function(){
      SystemUI.ctx.canvas.style.opacity = 1;
    }, 250);

    var p = 0;

    if(this.ismobile)
    {
      if(window.innerHeight > window.innerWidth)
      {
        p = window.innerHeight * 2;
        SystemUI.landscape = false;
      }
      else
      {
        p = window.innerWidth * 2;
        SystemUI.landscape = true;
      }
    }
    else
    {
      if(window.innerHeight > window.innerWidth)
      {
        // SystemUI.landscape = false;
        p = window.innerHeight * 2;
      }

      else
      {
        // SystemUI.landscape = true;
        p = window.innerWidth/1.9;
      }

    }


    var fs = p / window.devicePixelRatio / 45;

    // if(this.ismobile)
    // {
    //   if(window.innerHeight > window.innerWidth)
    //     fs = p / (window.devicePixelRatio) / 45;
    //   else
    //     fs = p / (window.devicePixelRatio)/45;
    // }


    $(':root').css({
      'font-size': fs,
    });

  }

  static setUI(key, $ = null, val){
    if(!$)
      this.uiObjects[key] = val;
    else {
      var obj = new UIObj();
      this.uiObjects
    }
  }

  static get(id){
    return this.uiObjects[id];
  }

  constructor(){
  }

  static Init(){
    this.canvas = $('#UICanvas')[0];
    this.ctx = setupCanvas(this.canvas);
    // SystemUI.setUI('scrollbar', null, new ScrollBar());
    // ObjectContainer.set('scrollbar', null, new ScrollBar());
    for(var o in this.uiObjects)
      this.uiObjects[o].Init();

    $(window).resize(function(){
      // SystemUI.ctx.canvas.style.opacity = 0;
      SystemUI.resize();
      // SystemUI.ctx.canvas.style.opacity = 1;
    });
    SystemUI.resize();
    SystemUI.layouts = new MSVNLayouts();

    this.ismobile = window.innerWidth < 425;


    $('#search_bar > input').focusin(function(){
      // $(this).parent().css('z-index', '21');
      $('#utilities_wrapper').css('z-index', 3);
      $('#utilities_wrapper').children().not('#search_bar').fadeOut();
      // $(this).parent().show();
      flyout('search');
    });
    //
    $('#search_bar > input').focusout(function(){
      flyout('search');
      $('#utilities_wrapper').children().not('#search_bar').fadeIn();
      // $('#utilities_wrapper').css('z-index', 1);
      // $(this).parent().css('z-index', 3);
    });

  }

  static Update(dt){
    // for(var o in this.uiObjects){
    //   var obj = this.uiObjects[o];
    //   // if(obj.pointInRect(this.mouseData.pageX, this.mouseData.pageY))
    //   //   obj.mouseover = true;
    //   // else
    //   //   obj.mouseover = false;
    //
    //   obj.Update(dt);
    // }

    // this.Draw(this.ctx);
    // console.log('uiUp');
    // console.log('system ui update');

    // for(var l in SystemUI.logs){
    //   if(SystemUI.logs[i].change)
    //
    // }

    // console.log($('.rect-test')[0].getBoundingClientRect());

    var of2 = $('.outrfrm-2');

    for(var i = 0; i < of2.length; i++){

      $(of2[i]).append('<div class="outer-frame-2">' +
        '<svg width="100%" height="100%">'+
          '<mask class="of2msk" id="of2msk'+i+'">'+
            '<rect class="r1" width="100%" height="100%" style="fill:white;" x="0" y="0"></rect>'+
            '<rect class="r2" width="100%"></rect>'+
            '<rect class="r3" width="100%"></rect>'+
            '<rect class="r4" width="100%"></rect>'+
          '</mask>'+
          '<g mask="url(#of2msk'+i+')">'+
            '<line class="l1" x1="0%" x2="100%" y1="0%" y2="0%"></line>'+
            '<line class="l2" x1="100%" x2="100%" y1="0%" y2="100%"></line>'+
            '<line class="l3" x1="0%" x2="100%" y1="100%" y2="100%"></line>'+
            '<line class="l4" x1="0" x2="0" y1="0%" y2="100%"></line>'+
            '</g>'+
        '</svg>'+
        '<div class="pnldpt">' + of2[i].dataset['frmdes'] + '</div>'+
      '</div>');

      of2[i].classList.remove('outrfrm-2');
      // console.log(of2[f]);
    }

    SystemUI.Draw();
  }

  static Draw(){

    let ctx = SystemUI.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(var o in this.uiObjects) {
      var obj = this.uiObjects[o];

      // if(obj.drwfn)
        // obj.drwfn(ctx, obj.rect);
    }

    SystemUI.layouts.Draw(ctx);
      // console.log(this.uiObjects[o].drwfn);
      // console.log(this.uiObjects);
  }

  static Log(key, value){
    if(!(key in SystemUI.logs))
    {
      SystemUI.logs[key] = {};

    }

    SystemUI.logs[key].val = value;
    SystemUI.logs[key].change = true;
  }

}

SystemUI.canvas = null;
SystemUI.ctx = null;
SystemUI.uiObjects = {};
SystemUI.logs = {};
SystemUI.layouts = null;
