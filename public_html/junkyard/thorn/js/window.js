
// tab handle
// tab handle + windows
// window option -- type
// window option -- minimize
// window option -- restore
// window option -- close
// window resize handles
// window parent is a panel thats either floating or docked




class Widgit {
  constructor(cat, datapts, layout){

    this.category = cat.split('-');
    this.dps = datapts;
    this.layout = layout;
    this.modified = null;
  }

  Init(win){
    this.bind();

    // this.$ = $('<div class="widgit-container"></div>')[0];
    // win.$.append(this.$);
    // this.$.append($('<div>'+this.category[this.category.length - 1]+'</div>')[0]);

    for(var p in this.dps)
    {
      var dp = this.dps[p];

      var dpobj = $('<div class="data-point"></div>')[0];

      var type = p.split('-');

      if(type[1] = 'drag')
      {
        console.log(dp);
        var dpDrag = $('<div class="dp-drag"></div>');
        dpobj.append(dpDrag[0]);

        if(type[0] = 'int')
        {
          dpobj.append();
          dpobj.addEventListener('mousedown', function(){
            // console.log(this.modified);
          });
        }

      }
      // dpobj[0].append(dp.$);
      win.widgits.push(dpobj);
    }
    // this.$.append(dpobj);
  }

  bind(){
    this.modified = editor.subject;
    for(var c in this.category){

      if(!(this.category[c] in this.modified))
        this.modified[this.category[c]] = {};

      this.modified = this.modified[this.category[c]];
    }

    for(var p in this.dps)
    {
      var dp = this.dps[p];

      // for()
      // if(p)
    }
  }

  show(){
    // this.$.style.opacity = 1;
  }

  hide(){
    // this.$.style.opacity = 0;
  }
}

class Panel extends CanvObj {
  constructor(rect){
    super(rect, [0]);
    // this.$ = null;
    this.float = true;
    this.windows = [];
    this.docked = false;
    this.id = null;
    this.rect = rect;
    this.taskBar = $('<div class="panel-task-bar"></div>');
  }

  // Init(parent = editor.wrapper, rect){
  //
  //   var body = this.$ = $('<div class="edtr-panel scl-normal"></div>');
  //   parent[0].append(body[0]);
  //
  //   body[0].style.position = 'absolute';
  //   body[0].style.top = rect.y + 'px';
  //   body[0].style.left = rect.x + 'px';
  //   body[0].style.width = rect.w + 'px';
  //   body[0].style.height = rect.h + 'px';
  //
  //   if(rect.cntr)
  //   {
  //     body[0].style.top = ( (window.outerHeight/2) - (rect.h/2) ) + 'px';
  //     body[0].style.left = ( (window.outerWidth/2) - (rect.w/2) ) + 'px';
  //     // console.log(window.outerWidth);
  //   }
  //
  //
  //   var taskBar = this.taskBar;
  //   body[0].append(taskBar[0]);
  //
  //   var move = this.move = $('<div class="rsiz-tab move">...</div>');
  //   // var tabs
  //   var min = this.min = $('<div>_</div>');
  //   var restore = this.restore = $('<div>[]</div>');
  //
  //
  //
  //   taskBar[0].append(move[0]);
  //   // taskBar[0].append(tabs[0]);
  //   taskBar[0].append(min[0]);
  //   taskBar[0].append(restore[0]);
  //
  //
  //
  //
  //   var rsiz = this.rsiz = {};
  //
  //   rsiz.left = {$: $('<div class="rsiz-tab horiz left"></div>')};
  //   rsiz.right = {$: $('<div class="rsiz-tab horiz right"></div>')};
  //   rsiz.bottom = {$: $('<div class="rsiz-tab vert bottom"></div>')};
  //   rsiz.diag = {$: $('<div class="rsiz-tab diag"></div>')};
  //
  //
  //   var left = rsiz.left.$[0];
  //   var right = rsiz.right.$[0];
  //   var bottom = rsiz.bottom.$[0];
  //   var diag = rsiz.diag.$[0];
  //
  //   var clsList = this.$[0].classList;
  //
  //   var uniform = clsList.contains('uniform');
  //   var horiz = clsList.contains('horiz');
  //   var vert = clsList.contains('vert');
  //
  //   body[0].append(left);
  //   body[0].append(right);
  //   body[0].append(bottom);
  //   body[0].append(diag);
  //
  //
  //
  //   if(uniform && horiz)
  //   {
  //     left.addEventListener('mousedown', function(e){
  //       this.classList.add('rsizing');
  //     });
  //
  //     left.addEventListener('mouseup', function(){
  //       this.classList.remove('rsizing');
  //     });
  //
  //     right.addEventListener('mousedown', function(e){
  //       this.classList.add('rsizing');
  //     });
  //
  //     right.addEventListener('mouseup', function(){
  //       this.classList.remove('rsizing');
  //     });
  //   }
  //
  //
  //   for(var w in this.windows)
  //   {
  //     this.windows[w].Init(body[0]);
  //   }
  //
  // }

  AddWindow(win) {
    // win.panel = this;
    this.windows.push(win);
    if(!this.tabs)
    {
      this.tabs = $('<div class="panel-tab-row"></div>')[0];
      this.taskBar[0].append(this.tabs);
    }

    this.tabs.append(win.tab[0]);
  }

  Update(dt){
    for(var i = 0; i < this.windows.length; i++)
    {
      if(this.windows[i])
        this.windows[i].Update(dt);
    }

    // if(this.windows.length == 0)
    //   this.$[0].remove();
  }
  Draw(ctx){

    super.Draw(ctx);
    // for(var w in this.windows)
    // {
    //   if(this.windows[w])
    //     this.windows[w].Draw(ctx);
    // }
    // console.log('draw');
  }
}


class ResizeTab extends CanvObj {
  constructor(location){
    super({}, 0);
    this.location = location;
  }

  Init(){
    switch (this.location) {
      case 'left': {
        this.w = 3;
        this.h = this.parent.h - 5;
        this.ox = 0;
        this.oy = 0;
      }
      break;
      case 'right': {
        this.w = 3;
        this.h = this.parent.h - 5;
        this.ox = this.parent.w - this.w;
        this.oy = 0;
      }
      break;
      case 'bottom': {
        this.w = this.parent.w - 10;
        this.h = 3;
        this.ox = 7;
        this.oy = this.parent.h - this.h;
      }
      break;
      case 'diag-right': {
        this.w = 5;
        this.h = 5;
        this.ox = this.parent.w - this.w;
        this.oy = this.parent.h - this.h;
      }
      break;
      case 'diag-left': {
        this.w = 5;
        this.h = 5;
        this.ox = 0;
        this.oy = this.parent.h - this.h;
      }
      break;
    }
  }

  mouseover(x, y){
    super.mouseover(x,y);

    if(this.hvr)
    {
      switch (this.location) {
        case 'left': {
          document.body.style.cursor = 'ew-resize';
        }
        break;
        case 'right': {
          document.body.style.cursor = 'ew-resize';
        }
        break;
        case 'bottom': {
          document.body.style.cursor = 'ns-resize';
        }
        break;
        case 'diag-right': {
          document.body.style.cursor = 'nwse-resize';
        }
        break;
        case 'diag-left': {
          document.body.style.cursor = 'nesw-resize';
        }
        break;
      }
    }
  }

  mousedown(x,y)
  {
    if(super.mousedown(x,y))
    {
      console.log('window rsize ' + this.location + ' clicked');
      this.parent.rsiz[this.location] = true;
    }
  }
  //
  // mousedown(x,y)
  // {
  //   super.mousedown();
  //
  //   if(this.hvr)
  //   {
  //     this.parent.rsiz[this.location] = true;
  //   }
  // }

  Update(dt)
  {
    if(this.location == 'right')
    {
      this.ox = this.parent.w - this.w;
      this.h = this.parent.h - 7;
    }
    else if(this.location == 'left')
    {
      this.h = this.parent.h - 7;
    }
    else if(this.location == 'bottom')
    {
      this.oy = this.parent.h - this.h;
      this.w = this.parent.w - 14;
    }
    else if(this.location == 'diag-right')
    {
      this.ox = this.parent.w - this.w;
      this.oy = this.parent.h - this.h;
    }
    else if(this.location == 'diag-left')
    {
      this.oy = this.parent.h - this.h;
    }


    super.Update(dt);
  }
  mouseup(x,y)
  {
    // if(super.mouseup(x,y))
    // {
      console.log('window rsize ' + this.location + ' un clicked');
      this.parent.rsiz[this.location] = false;

    // }
  }
}

class Window extends CanvObj {
  constructor(name, rect, widgits)
  {
    super(rect, [5]);
    this.name = name;
    this.parent = null;
    // this.move =
    this.rsiz = {};
    this.minw = 40;
    this.br = 4;
  }

  Init(){

    super.append(new ResizeTab('left'));
    super.append(new ResizeTab('right'));
    super.append(new ResizeTab('bottom'));
    super.append(new ResizeTab('diag-right'));
    super.append(new ResizeTab('diag-left'));

    // this.close = new Button();


    super.Init();
    if(!this.parent)
    {
      this.parent = new Panel(this.rect);
      this.parent.append(this);
    }
  }

  mouseenter(){
    super.mouseenter();
  }

  mouseleave(){
    super.mouseleave();
  }

  mouseover(x,y){

    // this.parent.hvrChild = false;
    super.mouseover(x,y);

    // if(this.hvr){
    //   if(x > this.x - 5 && x < this.x + 5) {
    //     //left tab
    //     // console.log('left tab hvr');
    //     this.parent.hvrChild = true;
    //     document.body.style.cursor = 'ew-resize';
    //   }
    //   else if(x > this.r - 5 && x < this.r + 5)
    //   {
    //
    //   }
    //   else {
    //     this.parent.hvrChild = false;
    //     // console.log(this.parent);
    //     // document.body.style.cursor = 'default';
    //   }
    // }



  }

  Update(dt)
  {
    super.Update(dt);

    var x = editor.mouse.pageX;
    var y = editor.mouse.pageY;

    if(this.rsiz['right'])
    {
      this.w = (this.parent.x - this.x) + x;
    }
    else if(this.rsiz['left'])
    {
      this.ox = x;
      this.w = this.r - x;
    }
    else if(this.rsiz['bottom'])
    {
      this.h = (this.parent.y - this.y) + y ;
    }
    else if(this.rsiz['diag-left'])
    {
      this.ox = x;
      this.w = this.r - x;
      this.h = (this.parent.y - this.y) + y ;
    }
    else if(this.rsiz['diag-right'])
    {
      this.w = (this.parent.x - this.x) + x ;
      this.h = (this.parent.y - this.y) + y ;
    }

    // if(this.w < this.minw)
    // {
    //   if(this.rsiz['left'])
    //   {
    //     this.ox -= 1;
    //     this.w = this.minw;
    //   }
    //   else if(this.rsiz['right']){
    //     this.w = this.minw;
    //   }
    // }
  }

  Draw(ctx)
  {
    // console.log('draw window');

    // ctx.clearRect(this.x, this.y, this.w, this.h);

    // ctx.strokeStyle = 'dark gray';
    // ctx.lineWidth = '3';
    // ctx.rect(this.x, this.y, this.w, this.h);
    // ctx.stroke();

    ctx.clearRect(this.x, this.y, this.w, this.h);

    ctx.save();

    let region = new Path2D();
    region.rect(this.x, this.y, this.w, this.h);
    ctx.clip(region);


    ctx.font = "30px Arial";
    ctx.fillText("Hello World", this.x, this.y + 30);



    super.Draw(ctx);

    ctx.restore();


    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();


    //
    //
    // ctx.clearRect(this.x, this.y, this.br * 2, this.br * 2);
    // ctx.clearRect(this.x + this.w - 5, this.y, this.br * 2, this.br * 2);
    // ctx.clearRect(this.x, this.y, this.br * 2, this.br * 2);
    // ctx.clearRect(this.x + this.w - this.br * 2, this.y + this.h - this.br * 2, this.br * 2, this.br * 2);



  }
}


function NewWindow(name, rect, widgits){
  if(name in editor.windows)
  {

  }
  else {
    // var pan = editor.NewPanel();
    var pan = editor.NewPanel(rect);
    var win = new Window(name, rect, widgits);

    pan.append(win);
    // pan.AddWindow(win);
    // pan.Init(editor.wrapper, rect);

    editor.windows[name] = win;

  }
}
