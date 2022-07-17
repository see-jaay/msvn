class ObjectPool {
  constructor(objects){
    this.objects = {};
  }

  Init(){
    for(var o in this.objects)
    {
      this.objects[o].Init();
    }
  }

  Update(dt)
  {
    for(var o in this.objects)
    {
      this.objects[o].Update(dt);
    }
  }

  Draw(ctx)
  {
    for(var o in this.objects)
    {
      this.objects[o].Draw(ctx);
    }
  }

  set(key, $, val){
    if(!$)
    {
      this.objects[key] = val;
      // val.Init();
    }
    else {
      var obj = new UIObj($);
      this.objects[key] = obj;
    }

    return this.objects[key];
  }

  get(key){
    return this.objects[key];
  }

}

class NavHist extends UIObj {
  constructor(elm){
    super(elm);
    this.page = null;
    this.prevPage = null;
    this.path = [];
  }

  Init(){
    super.Init();
  }

  Load(pname){
    // do {
    //   this.path.push(page);
    // } while(page.root);
    this.path.push(pname);

    console.log(this.path);
  }

  Update(dt){
    super.Update(dt);
  }


  Draw(ctx){
    super.Draw(ctx);

  }


}

class Page {
  constructor(name, $) {
    this.root = null;
    this.$ = $;
    this.pages = [];
    this.name = name;
    // this.file = file;
    this.objpool = new ObjectPool();
  }

  Load(){
    // var objects = $('.obj');
    var file = this.file;

    $.ajax({
      type:'POST',
      url: '../../includes/pages/' + file,
      data: {},
      beforeSend: null,
      success: function(data){
        SiteManager.contentWrapper.html(data);
      }

    });

    // for(var i = 0; i < objects.length; i++){
    //   this.objpool.set(objects[i].dataset('name'));
    // }
  }

  AddPage(name){
    var p = new Page(name, file);
    this.pages.push(p);
    p.root = this;
  }

  Update(dt)
  {
    for(var s in this.subjects){
      this.subjects[s].Update(dt);
    }
  }
}


class SiteManager {
  constructor(){
    this.utilities = new ObjectPool();
    // this.pages = {'home': new Page('home', 'home.php')};
    this.currentPage = 'home';
    this.contentWrapper = $('#content_wrapper');
    this.ismobile = false;
  }


  Init(){
    // this.pool.utilities.
    // this.scrollbar = this.utilities.set('scrollbar', '#site_scroller');
    // this.scrollbar.track = this.utilities.set('track', '#scrll_track');
    // this.scrollbar.bar = this.utilities.set('bar', '#scrll_bar > line');
    // this.scrollbar.barmsk = this.utilities.set('bar', '#scrll_bmsk > .msk-bar > line');

    // this.hbgr = this.utilities.set('hbgr', '#mobile_menu');

    this.navHistory = this.utilities.set('navref', null, new NavHist('#navref'));
    // this.navref

    this.utilities.Init();


    // this.drwfns();

    // console.log(window.innerWidth);

    $('.navdest').not('.dis').each(function(){
      $(this)[0].addEventListener('click', function(){
        // SiteManager.LoadPage(this.dataset['dest']);
        window.location.hash = this.dataset['dest'];
        // navby = true;
      });
      // console.log(this.dataset['dest']);
    });



    SiteManager.contentWrapper = $('#content_wrapper');
    SiteManager.LoadPage('home');


    var flyouts = $('.flyout');


    flyouts.each(function(){
        var flyout = SiteManager.flyouts[this.dataset['fly']] = {};
        flyout.$ = this;
    })

    // console.log(SiteManager.flyouts);
  }

  static LoadPage(pname){

    // if(0)
    $.ajax({
      type: "POST",
      url: '../../includes/pages/'+ pname + '.php',
      data: {},
      enctype: 'multipart/form-data',
      beforeSend: function(){
        SystemUX.fpKeys = [];
        SystemUX.depth = 0;
        SystemUX.depthTo = 0;
        SystemUX.focalPoints = {};
      },
      success: function(data){


        console.log('append content disabled. SiteManager.js Line 201-203.');
        // var elm = $(data);
        // $(SiteManager.contentWrapper[0]).html('');
        // $(SiteManager.contentWrapper[0]).append(elm);


        // $(SiteManager.contentWrapper[0]).append('<div class="scroller-wrapper"><div class="scroll-block">scroll block</div></div>');


        $('#loading_screen').delay(3000).fadeOut();
        // SystemUX.animscrll = true;
        // SystemUI.layouts.lays = SystemUI.layouts.rts = [];
      },
      async: false,
    });


  }

  Update(dt){
    this.utilities.Update(dt);

    SiteManager.activeFlyout = $('.flyout.show').length;

    var bar = this.scrollbar.bar.$;
    var barmsk = this.scrollbar.barmsk.$;


    // if(SystemUI.ismobile){
    //   bar.style.width = 100/SystemUX.fpKeys.length + '%';
    //   if(!this.barctrl && SystemUX.depthTo >= SystemUX.fpKeys[0] && SystemUX.depthTo <= SystemUX.fpKeys[SystemUX.fpKeys.length - 1])
    //   {
    //     // bar.style.left = (this.scrollbar.track.rect.width - this.scrollbar.bar.rect.width) * (SystemUX.depthTo / SystemUX.fpKeys[SystemUX.fpKeys.length - 1]);
    //     bar.style.transform = 'translate(' + (this.scrollbar.track.rect.height - this.scrollbar.bar.rect.height) * (SystemUX.depthTo / SystemUX.fpKeys[SystemUX.fpKeys.length - 1]) + ',50%)';
    //
    //     // bar.style.top = "50%";
    //   }
    //
    //
    // }
    // else {

    if(false)
    {

    }
    else {

      // var firstKey = 0;
      // var lastKey = SystemUX.scrllrng;
      // var d2 = SystemUX.depth;
      // var barlenper = 100/SystemUX.fpKeys.length;
      // var lastKey = SystemUX.scrollBlock.scrollHeight;
      // var d2 = SystemUX.scrollBlock.scrollTop;
      // var barlenper =100/SystemUX.scrollBlock.itemCt;
      // bar.setAttribute('y1', (100-barlenper)*(d2/lastKey)  + '%');
      // bar.setAttribute('y2', ((100-barlenper)*(d2/lastKey) + barlenper) + '%');
      //
      // barmsk.setAttribute('y1', (100-barlenper)*(d2/lastKey) + '%');
      // barmsk.setAttribute('y2', (((100-barlenper)*(d2/lastKey)) + barlenper + 2)  + '%');

      // console.log(d2);

      // if(SystemUX.fpKeys.length && SystemUX.scrollBlock.itemCt)
      // {
      //   if(this.scrollbar.shown == false)
      //   {
      //     $(this.scrollbar.$).show();
      //     this.scrollbar.shown = true;
      //   }
      //
      //   //
      //   // if(d2 < 0)
      //   // {
      //   //   bar.setAttribute('y1', lerp(bar.getAttribute('y1').slice(0,-1),  0, .2, .1)  + '%');
      //   //   bar.setAttribute('y2', lerp(bar.getAttribute('y2').slice(0,-1),  barlenper, .2,.1)  + '%');
      //   //
      //   //   barmsk.setAttribute('y1', lerp(barmsk.getAttribute('y1').slice(0,-1),0, .2,.1) + '%');
      //   //   barmsk.setAttribute('y2', lerp(barmsk.getAttribute('y2').slice(0, -1),barlenper + 2, .2,.1)  + '%');
      //   // }
      //   // else if (d2 > lastKey) {
      //   //   bar.setAttribute('y1', lerp(bar.getAttribute('y1').slice(0,-1),  (100-barlenper), .2, .1)  + '%');
      //   //   bar.setAttribute('y2', lerp(bar.getAttribute('y2').slice(0,-1),  (100-barlenper) + barlenper, .2,.1)  + '%');
      //   //
      //   //   barmsk.setAttribute('y1', lerp(barmsk.getAttribute('y1').slice(0,-1),  (100-barlenper), .2,.1) + '%');
      //   //   barmsk.setAttribute('y2', lerp(barmsk.getAttribute('y2').slice(0, -1),  (100-barlenper) + barlenper + 2, .2,.1)  + '%');
      //   // }
      //   // else {
      //   //   bar.setAttribute('y1', lerp(bar.getAttribute('y1').slice(0,-1),  ((100-barlenper)*(d2/lastKey)), .2, .1)  + '%');
      //   //   bar.setAttribute('y2', lerp(bar.getAttribute('y2').slice(0,-1),  ((100-barlenper)*(d2/lastKey)) + barlenper, .2,.1)  + '%');
      //   //
      //   //   barmsk.setAttribute('y1', lerp(barmsk.getAttribute('y1').slice(0,-1),  (100-barlenper)*(d2/lastKey), .2,.1) + '%');
      //   //   barmsk.setAttribute('y2', lerp(barmsk.getAttribute('y2').slice(0, -1),  ((100-barlenper)*(d2/lastKey)) + barlenper + 2, .2,.1)  + '%');
      //   // }
      //
      //
      //     // bar.setAttribute('y1',((100-barlenper)*(d2/lastKey)) + '%');
      //     // bar.setAttribute('y2',(((100-barlenper)*(d2/lastKey)) + barlenper) + '%');
      //     //
      //     // barmsk.setAttribute('y1',(100-barlenper)*(d2/lastKey) + '%');
      //     // barmsk.setAttribute('y2', (((100-barlenper)*(d2/lastKey)) + barlenper + 2) + '%');
      // }
      // else {
      //   // this.scrollbar.$.hide();
      //   if(this.scrollbar.shown)
      //   {
      //     $(this.scrollbar.$).hide();
      //     this.scrollbar.shown = false;
      //   }
      // }
    }
  }

  drwfns(){
    //scrollbar track
    this.scrollbar.track.Draw = function(ctx) {

    }
      // this.hbgr.drwfn(function(ctx,r){
      //   if(SystemUI.ismobile){
      //     ctx.clearRect(r.x, r.y, r.width, r.height);
      //     ctx.beginPath();
      //     ctx.lineCap = 'round';
      //     ctx.lineWidth = 3;
      //     ctx.moveTo(r.x + 4, r.y + 4);
      //     ctx.lineTo (r.x + r.width - 10, r.y + 4 );
      //     ctx.lineWidth = 3;
      //     ctx.moveTo(r.x + 8, r.y + 8);
      //     ctx.lineTo(r.x + r.width - 2, r.y + 8);
      //     ctx.stroke();
      //   }
      // });


    this.scrollbar.track.drwfn(function(ctx, r){

      if(!SystemUI.ismobile){
        ctx.clearRect(r.x + (r.width/2) - 3, r.y - 5, 6, r.height + 10);
        ctx.beginPath();
        ctx.globalAlpha = .15;
        ctx.moveTo(r.x + (r.width/2), r.y);
        ctx.lineTo(r.x + (r.width/2), (r.y + r.height));
        ctx.stroke();
      }
      else {
        ctx.clearRect(r.x - 5, r.y + (r.height/2), r.width + 10, 6);
        ctx.beginPath();
        ctx.globalAlpha = .15;
        ctx.moveTo(r.x, r.y + (r.height/2));
        ctx.lineTo(r.x + r.width, r.y + (r.height/2));
        ctx.stroke();
      }
    });
    // scrollbar bar/tab
    this.scrollbar.bar.drwfn(function(ctx, r){
      if(!SystemUI.ismobile){
        ctx.globalAlpha = 1;
        ctx.clearRect(r.x + (r.width/2) - 3, r.y - 5, 6, r.height + 10);
        ctx.beginPath();
        ctx.lineWidth = 2.35;
        ctx.moveTo(r.x + (r.width/2), r.y);
        ctx.lineTo(r.x + (r.width/2), r.y + r.height);
        ctx.stroke();
        ctx.lineWidth = 2.25;
      }
      else {
        ctx.globalAlpha = 1;
        ctx.clearRect(r.x - 5, r.y + (r.height/2) - 3, r.width + 10, 6);
        ctx.beginPath();
        ctx.lineWidth = 2.35;
        ctx.moveTo(r.x , r.y + (r.height/2));
        ctx.lineTo(r.x + r.width, r.y + (r.height/2));
        ctx.stroke();
        ctx.lineWidth = 2.25;
      }
    });

    this.navHistory.drwfn(function(ctx, r){
      // ctx.globalAlpha = 1;
      // ctx.clearRect(r.x, r.y, r.width, r.height);
      // ctx.beginPath();
      // ctx.fillStyle = 'black';
      // ctx.fillRect(r.x, r.y, r.width, r.height);
      // ctx.fill();
      // ctx.
    });
    this.setdfns = false;
  }

  static flyout(fly){
    this.flyouts[fly].$.classList.toggle('show');
    // this.flyouts[fly].$.style.opacity = 1;
  }

  updateHistory(pname){

  }

  go(query){

  }

  setPage(key, $, val){
    this.pages[key] = new Page($);
  }

  getPage(key){
    return this.pages[key];
  }
}

SiteManager.contentWrapper = null;
SiteManager.pages = {};
SiteManager.activeFlyout = false;
SiteManager.flyouts = {
  'mnu':{
    visible: 0,
    $:null
  }
};
