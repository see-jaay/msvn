// * = filler  element w/ unique parameters
// $ = dom element

// var branches = {
//   "home":              {data:'layers/home_branch.php', active:1}, // rootlyr [$, isActive]
//   "home.splines":      {data:'layers/splines_branch.php', active:1, count:7}, // effect [$, isActive, splineCount]
//   "shop":              {data:'layers/shop_branch.php', active:1}, // rootlyr
//   "gallery":           {data:'layers/gallery_branch.php', active: 0}, //rootlyr
//   "info":              {data:'layers/info_branch.php', active:0}, //rootlyr
//   "roadmap":           {data:'layers/roadmin_branch.php',active: 0}, //rootlyr
// };

var layerDataArr = [];
var layerData = {
  'home': {depth: 0},
  'shop': {depth: 1},
  'gallery': {depth: 2},
  'info': {depth: 3},
  'roadmap': {depth: 4},
}



// var menu_primary = {
//   'home' : {
//     dir : 'home',
//     links : {
//       'shop' : {
//         dir : 'home.shop',
//         links: {
//           'men': {
//             dir: 'home.shop.men'
//           },
//           'women': {
//             dir: 'home.shop.women'
//           },
//           'accessories': {
//             dir: 'home.shop.accessories'
//           },
//       }
//       },
//       'gallery' : {
//         dir:'home.gallery',
//         disabled: 1,
//         links: {
//
//         }
//       },
//       'info' : {
//         dir:'home.info',
//         disabled: 1,
//         links: {
//
//         }
//       },
//     }
//   }
// };

// var activeMenu = menu_primary['home'];

class Interface {

  constructor(){
    this.elements = {};
    // this. = null;
    this.FD = 0; // focal depth
    this.lastFD = null;
    this.maxFD = -1;
    this.FDscrollVel = 0;
    this.FDscrollDist = 0;
    this.FocalPoint = null;
    this.FDto = 0;

    this.FPRef = null;
  }
  Init(){
    // console.log('intui');

    // console.log($('.layer-container').children().toArray());

    document.addEventListener('wheel', function(e){
      // lsp = window.scrollY;
      var dy = e.deltaY;
      // console.log(dy/100);
      // console.log(e.deltaX/);

      // if(dy > 20)
      //   dy = 20;
      //
      // if(dy < -20)
      //   dy = -20;

      // console.log('scrolling');

      // ui.FDscrollDist += dy/1.25;

      if(Math.abs(dy) > Math.abs(ui.FDscrollVel))
        ui.FD += dy/500;
        // ui.FDscrollVel += dy/30;

      // console.log(e);
      // if(e.deltaY > this.FDscrollVel)

      ui.FDto = null;

      window.requestAnimationFrame(function(){
      //   console.log(e);
      });
    });
  }

  SetFocalLayers(lyrContainer, fr = null){
    // console.log(lyrContainer.children.toArray());
    var layers = lyrContainer.children('.lyr').toArray();

    if(!fr)
      fr = [0, layers.length];
    // var step = layers.length;
    var focalStep = (fr[1] - fr[0]) / layers.length;
    // this.focalPoint = fr[0];
    var fp = fr[0];

    for(var i = 0; i < layers.length; i++)
    {
      var layer = layers[i];
      // var focalStep = fr[1] / layers.length;
      layerDataArr.push({name:layer.dataset.name, $: layer, /*mnu$: null,*/ fr:[fp, fp+focalStep], step:focalStep});

      this.SetFocalLayers($(layer), [fp , fp+focalStep]);
      fp += focalStep;

    }
  }

  Update(dt){
    // this.FD += this.FDscrollVel/200;
    // this.FD = lerp(this.FD, this.FD + this.FDscrollDist, .01);
    // this.FDscrollDist = 0;

    // console.log(this.FDscrollVel);

    // console.log(window.scrollY);

    var closestFP = Math.round(this.FD);


    // if(Math.abs(this.FDscrollVel) < .01 && this.FDto == null)
    //   this.FD = lerp(this.FD, closestFP, .25);


    if(this.FDto != null){
      // this.FDscrollVel = 0;
      this.FD = lerp(this.FD, this.FDto, .1);

      if(this.FD < this.FDto + .01 && this.FD > this.FDto - .01)
      {
        this.FD = this.FDto;
        this.FDto = null;
      }
    }

    this.FPRef.style.left =(this.FD * 200) + 'px';

    // console.log(this.FD);

    // $('.menu.primary')[0].style.transform = "translateX(-"+((this.FD/this.maxFD) * 100)+"%)";

    // if(this.FDscrollVel < 3)
    // {
    //
    // }

    // if(this.FD > this.maxFD)
    // {
    //   this.FD = this.maxFD;
    //   this.FDscrollVel = 0;
    // }
    //
    // if(this.FD < 0)
    // {
    //   this.FD = 0;
    //   this.FDscrollVel = 0;
    // }


    if(this.FD != this.lastFD)
    {
      for(var i = 0; i < layerDataArr.length; i++)
      {
        var l = layerDataArr[i];

        if(l.$)
        {
          var blur = 0;
          var opacity = 1;
          // var scl = 1;
          if(this.FD > l.fr[0]){
            if(this.FD < l.fr[1]){
              blur = 0;
              opacity = 1;
              // console.log(l.$);
            }
            else {
              blur = Math.abs(Math.sqrt(Math.pow(this.FD - l.fr[1],2))) * 50;
              opacity = 1 - Math.abs(this.FD - l.fr[1]) * 4;
              // scl = 1 - blur;
            }
          }
          else {
            blur = Math.abs(Math.sqrt(Math.pow(this.FD - l.fr[0],2))) * 50;
            opacity = 1 - Math.abs(this.FD - l.fr[0]) * 4;
            // scl = 1 + blur;
          }

















// hard code elements as layers with data attributes and class "lyr"
// hard code menu items with classes "mnu-item"

//























          // if(scl < 0)
          //   scl = 0;

          l.$.style.opacity = opacity;
          if(opacity > .25)
            l.$.style.filter = 'blur('+ blur +'px)';

          // l.$.style.transform = 'scale('+scl+')';


          if(blur == 0)
            l.$.style.pointerEvents = 'all';
          else
            l.$.style.pointerEvents = 'none';
        }
      }
      // for(var l in layerData)
      // {
      //   var ld = layerData[l];
      //   if(ld.$)
      //   {
      //     var blur = Math.abs(Math.sqrt(Math.pow(this.FD - ld.depth,2))) * 10;
      //     var opacity = 1.5 - Math.abs(this.FD - ld.depth);
      //
      //     ld.$.style.filter = 'blur('+ blur +'px)';
      //     ld.$.style.opacity = opacity;
      //
      //     if(Math.round(blur) == 0)
      //       ld.$.style.pointerEvents = 'all';
      //     else
      //       ld.$.style.pointerEvents = 'none';
      //   }
      // }
      this.lastFD = this.FD;
    }

    //if FD is close to a focal value slow down velocity


    if(this.FDscrollVel > -1 && this.FDscrollVel < 1)
    {
      this.FDscrollVel = 0;
    }

    if(this.FDscrollVel > 0)
      this.FDscrollVel -= dt * 15;
    if(this.FDscrollVel < 0)
      this.FDscrollVel += dt * 15;

  }

  //dynamically set the menu options for each layer type
  //this helps with animating the hanging options
  //
  SetFD(fd){
    this.FDto = fd;
    this.FDscrollVel = 0;
  }
  SetLayout(type = 'root'){

    var mnu = $('.menu.primary');
    var lis = mnu.children().toArray();
    // var dir = this.mnu_pri.dir.split('.');
    // var links = this.mnu_pri.links;
    // activeMenu = menu;
    // console.log(dir);

    if(type == 'root')
    {
      //temporary ifstmt to check for values
      if(!lis.length){
        console.log('generate menu');

        // if(dir[0] == 'home')
        //   $('#content_wrapper').append('<div id="home_title" class="title ctr-hor ctr-vert">MACHSEVN</div>');
        // else
        //   for(var li in dir)
        //   {
          //     if(li == 0)
          //       mnu.append('<li>'+dir[li]+'</li> >');
          //     else
          //       mnu.append('<li>'+div[li]+'</li> >');
          //   }

          if(dir.length <= 1)
          $('#content_wrapper').append('<div id="home_title" class="title ctr-hor ctr-vert">MACHSEVN</div>');
          else
          for(var li in dir){
            var arrow = '';
            if(li < dir.length - 1)
            arrow = '>';

            mnu.append('<li>' + dir[li] + ' ' + arrow + ' </li>');
          }

          for(var li in links){
            var l = links[li].split('.');
            var before = '';
            var cls = '';

            if(dir.length <= 1 && li == 0)
            before = 'machsevn';

            if(l[1] == 'dis')
            cls += ' disabled';

            mnu.append('<li class="'+cls+'" onclick="hsh(\''+l[0]+'\')"><span>[</span><div>'+before+'.'+l[0]+'</div><span>]</span></li>');
          }
        }
        else {
          for(var li in lis){
            console.log(lis[li]);
          }
        }
    }
    else if(type == 'layer-scroll')
    {

      this.SetFocalLayers($('#content_wrapper'));
      console.log(layerDataArr);


      for(var i = 0; i < layerDataArr.length; i++){
        var lyr = layerDataArr[i];

        var mnuItemCls = '';
        if(lyr.$.classList.contains('disabled'))
          mnuItemCls += ' disabled';

        var mnuItem = null;
        // console.log(layers[l].dataset.lyr);
        if(name == 'home')
          mnuItem = $('<li class="center-text"  onclick="ui.SetFD('+i+');">home</li>');
        if(name != 'home')
          mnuItem = $('<li class="'+mnuItemCls+'" onclick="ui.SetFD('+i+');">'+lyr.name+'</li>');

        mnu.append(mnuItem);
        lyr.mnu$ = mnuItem[0];
      }

      this.FPRef = $('<div id="fpref">&#x25b2;</div>')[0];
      mnu.append(this.FPRef);




      var layers = $('#content_wrapper').children().toArray();
      for(var l in layers)
      {
        var layer = layers[l];
        var name = layer.dataset.name;
        //
        // var cs = layer.children('.layer-box').toArray();
        // for(var c in cs){
        //   cs[c].style.left = randomFlt(0, 700) + 'px';
        //   cs[c].style.top = randomFlt(0, 200) + 'px';
        //
        // }

        // layer.style.left = randomFlt(0, 700) + 'px';
        // layer.style.top = randomFlt(0, 200) + 'px';
        // layer.style.background = 'rgba(0,0,0,.1)';



        layerData[name].$ = layer;

        var mnuItemCls = '';
        if(layer.classList.contains('disabled'))
        {
          if(layer.classList.contains('lyr'))
            layer.remove();
        }
        else {
          this.maxFD = layerData[name].depth;
        }

        // console.log(layers[l].dataset.lyr);
        // if(name == 'home')
        //   mnu.append('<li class="center-text">home</li>');
        // if(name != 'home')
        //   mnu.append('<li class="'+mnuItemCls+'">'+name+'</li>');
        // console.log(layerData[name]);
      }

      // this.maxFD = layerData[this.maxFD].depth + ;
    }

    // console.log('ui set menu : ' + menu);

  }
}
