var LIVE_EDIT = false;

var SAVE = false;

class Subject {
  constructor(type, ovrr = null) {
    this.type = type;
    this.globalPath = 'root';
    this.localPath = 'root';
    // this.id = null;
    this.parent = null;
    this.next = null;
    this.prev = null;
    this.children = {};
    this.properties = {};
    this.childTypes = {};

    if(ovrr)
    {
      this.type = ovrr['type'];
      this.id = ovrr['id'] || null;
      this.parent = ovrr['parent'] || null;
      this.next = ovrr['next'] || null;
      this.prev = ovrr['prev'] || null;
      this.children = ovrr['children'] || {};
      this.properties = ovrr['properties'] || {};
      this.$ = ovrr['$'];
    }
  }

  append(subject){

    var index = 0;
    if(subject.type in this.childTypes){
      index = this.childTypes[subject.type];
      this.childTypes[subject.type] += 1;
    }
    else
    {
      this.childTypes[subject.type] = 1;
    }

    subject.localPath = subject.type + '-' + index;
    subject.globalPath = this.globalPath + '/' + subject.localPath;

    this.children[subject.localPath] = subject;

    if(index)
    {
      this.children[subject.type + '-' + (index - 1)].next = subject.globalPath;
      subject.prev = this.children[subject.type + '-' + (index - 1) ].globalPath;
    }
    subject.parent = this.globalPath;
  }

  get(path)
  {
    var gp = path.split('/');
    // var path = gp[gp.length-1];

    if(!(gp[0] in this.children))
      return this;

    var child = this.children[gp[0]];

    for(var i = 0; i < gp.length; i++)
    {

      child = child.get(gp[i]);

      if(i == gp.length - 1)
      return child;
    }

    return child;
  }


  // Update()

  setProp(path, val)
  {
    var path = path.split('-');
    var property = this.properties;
    for(var i = 0; i < path.length; i++)
    {
      if(!(path[i] in property))
      {
        if(i == path.length - 1)
          property[path[i]] = val;
        else
          property = property[path[i]] = {};
      }
      else {
        property = property[path[i]];
      }
    }

    property = val;
  }

}








class Editor {

  // TODO: display pages and recursive child elements
  // TODO: enable modification of element positions, content, styles.

  // BE SURE TO use CSS transform property instead of setting position as left, top etc.
  // same for scale and rotation.

  constructor (state) {

		this.isInit = false;

    this.panel = null;
    this.wrapper = null;
    this.editorSite = null;
    this.liveSite = null;

    this.panelPages = {};

    this.canvasSet = false;

    this.canvObj = new CanvObj({x:0,y:0, w: window.innerWidth, h:window.innerHeight}, [5]);

		this.session = [
      {
        "type": "pg",
        "title": "home page",
        "path": "pg-0",
        "display":true,
				"style":
        {
          'color':'black'
        },
        "content":[
          {
            "type":"elm",
            "path": "pg-0/elm-0",
            "class":["e1","center", "global"],
            "id":"e0000000",
            "transform":{
              "pos":{"x":"0", "y":"0", "z":0},
              "scale":{"w":"200", "h":"70"}},
            "style":{
              0:{
              }
            },
            "js":"",
            "content": [{
              "type":"text",
              "path":"pg-0/elm-0/txt-0",
              "value":"hello worl",
            },
            {
              "type":"elm",
              "path": "pg-0/elm-0/elm-0",
              "class":["e1","center", "global"],
              "id":"e0000000",
              "transform":{
                "pos":{"x":"0", "y":"0", "z":0},
                "scale":{"w":"200", "h":"70"}},
              "style":{
                0:{
                  "position":" absolute",
                  "left":"50%",
                  "top":"50%",
                  "transform":"translate(-50%,-50%)",
                  "background":"blue",
                }
              },
              "js":"",
              "content": [{
                "type":"text",
                "path":"pg-0/elm-0/elm-0/txt-0",
                "value":"hello worl",
                "style":{
                  0:{
                    "background":"white"
                  }
                }
              },
              {
                "type":"text",
                "path":"pg-0/elm-0/elm-0/txt-1",
                "value":"hello worlds",
              }],
            }],
          }
        ],
        "links":[]
      },
      {
        "type": "pg",
        "title": "shop page",
        "path": "pg-1",
        "display":false,
        "style":
        {
          "position":"absolute",
          "background": "blue",
          "text-color": "white",
          "width": "200px",
          "height": "200px",
          "left":"100px",
          "top": '200px'
        }
      }
    ];
    this.subject = new Subject('root');

    this.panelElements = {};
    this.displayElements = {};

    this.mpHistory = [];

    this.mode = null;
    this.panels = [];

    this.windows = {};

    this.rsizHandles = [];


    //tool bar parameters
    /*
      isToggled
      propt when

    */


    // this.layout =

    // this.edtr_

  }


  Init(site_data = null){


    this.LoadStyling();

    if(site_data)
      this.siteData = new Subject('root',site_data);
    else
      this.siteData = new Subject('root');

    // console.log(this.siteData);

    var root = this.subject;

    root.append(new Subject('pg'));

    var pg = root.get('pg-0');
    pg.append(new Subject('div'));
    pg.append(new Subject('div'));
    pg.append(new Subject('img'));
    pg.append(new Subject('div'));
    pg.append(new Subject('div'));
    pg.append(new Subject('img'));

    // pg.setProp('style-background', 'blue');

    var div = root.get('pg-0/div-0');


    div.append(new Subject('txt', 'div element'));

    div.setProp('transform-position-x', 20);
    // div.setProp('style-position', 'absolute');

    // console.log(root);

    this.wrapper = $('#edtr_wrapper');

    // NewWindow('Subject', {cntr: true, x: 0, y: 0, w: 400, h: 400}, {
    //   'id': new Widgit('', {}),
    // });

    this.canvObj.append( new Window('Subject', {cntr: true, x: 0, y: 0, w: 400, h: 400}, {
      'id': new Widgit('', {}),
    }));

    this.canvObj.append( new Window('Transform', {cntr: false, x: 0, y: 0, w: 400, h: 400}, {
      'id': new Widgit('', {}),
    }));

    // this.NewWindow('info',{x: window.innerWidth() * .25, y:, w:, h:, }, {});

    // this.NewWindow('transform', [
    //   new Widgit('transform-position',{'x':'flt','y':'flt','z':'flt'}, 'grp-3x1'),
    //   new Widgit('transform-rotation',{'x':'flt','y':'flt','z':'flt'}, 'grp-3x1'),
    //   new Widgit('transform-scale',{'x':'int-drag','y':'int-drag'}, 'grp-2x1'),
    // ]);

    var siteDisplayObj = $('<div id="edtr_site_display" class="edtr-window scl-uniform-x"></div>');
    var toolBarObj = $('<div id="edtr_toolbar"></div>');
    var selectedInfo = $('<div class="edtr-selected-info"></div>');


    this.siteDisplay = {};
    this.toolbar = {
      modes : {
        'select' : {},
        'transform' : {},

        // TRANSFORM : "transform",
        // COLOR : "color",
        // BACKGROUND : "background",
        // STYLE : "style",
        // JAVASCRIPT : "javascript",
        // TEXT : "select",
        // SELECT : "select",
        // SELECT : "select",
      }
    }
    //toolbar
    // this.tbar = {};

    this.siteDisplay.$ = siteDisplayObj[0];
    this.toolbar.$ = toolBarObj[0];
    this.wrapper[0].append(this.siteDisplay.$);
    this.wrapper[0].append(this.toolbar.$);

    // this.editorSite = $('<div class="inner">site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site site </div>');

    // this.liveSite = $('#site_wrapper > .live-site-wrapper');

    this.editorSite = $('<div class="inner pg active"></div>');
    this.siteDisplay.$.append(this.editorSite[0]);
    this.siteDisplay.$.append($('<div class="rsiz-tab left horiz fat"><span>||</span></div>')[0]);
    this.siteDisplay.$.append($('<div class="rsiz-tab right horiz fat"><span>||</span></div>')[0]);
    this.siteDisplay.$.append(selectedInfo);

    this.editorSite[0].addEventListener('mousemove', function(e){
      // console.log(e.path);
      // this.highlighted = e.path;

      if(editor.mode == 'select')
      {
        // console.log(e.path);
      }
    });

    document.addEventListener('keydown', function(e){
      if(editor.mode == 'select')
      {
        if(e.code == 'ArrowUp')
          editor.selectionIndex++;
        else if(e.code == 'ArrowDown')
          editor.selectionIndex--;
      }
    });



    // console.log(this.windows['site_display'].$);


    this.pgSetActive();

    var modes = this.toolbar.modes;

    for(var mode in modes){
      var m = modes[mode];

      // t[2] = new Window();
      if(m != null)
      {

        m.handle = $('<div class="edtr-tool" data-name="'+mode+'"></div>')[0];
        this.toolbar.$.append(m.handle);

        m.handle.addEventListener('mouseenter', function(){
          this.classList.add('hvr');
        });

        m.handle.addEventListener('mouseleave', function(){
          this.classList.remove('hvr');
        });

        m.handle.addEventListener('click', function(){
          editor.SetMode(this.dataset["name"]);
        });
      }

      if(mode == 'select'){
        m.handle.append('select mode');
      }
      else
      {
        // if(mode == 'background'){
        //   t.handle.append('[ ]');
        //   // t.window = this.windows[mode];
        // }

        // this.wrapper[0].append(t.window.$);
      }

      // this.wrapper[0].append(t.window);


    }

    document.addEventListener('mousemove', function(e){
      if(editor.active)
      {
        // console.log('mouse position .. x: ' + e.pageX + ' y: ' + e.pageY);
        editor.mouseevent('move', e);
      }
    });

    document.addEventListener('mousedown', function(e){
      if(editor.active)
      {
        editor.mouseevent('mousedown', e);
      }
    });

    document.addEventListener('mouseup', function(e){
      if(editor.active)
      {
        editor.mouseevent('mouseup', e);
      }

      // console.log('mouseup');
    });

// this.DisplayPage(this.activePage || 'pg-0');
    this.InitUI();
    this.canvObj.Init();


    console.log(this.canvObj);


    this.isInit = true;

    // this.windows['site_display'].InitResize('rsiz-horiz-scl-uniform');
  }

  mouseevent(type, e)
  {
    if(type == 'move') {
      this.canvObj.mouseover(e.pageX, e.pageY);
    }
    else if(type == 'mousedown') {
      this.canvObj.mousedown(e.pageX, e.pageY);
    }
    else if(type == 'mouseup') {
      this.canvObj.mouseup(e.pageX, e.pageY);
    }
    this.mouse = e;
  }

  Update(dt){

    if(this.active && this.isInit)
    {
      this.canvObj.Update(dt);
      if(!this.canvasSet)
      {
        this.uiCanvas.width = window.innerWidth;
        this.uiCanvas.height = window.innerHeight;
        this.uiCtx = setupCanvas(this.uiCanvas);
        this.canvasSet = true;
      }
      this.DrawUI();

      if(this.newChange)
      {
        this.RenderEditorSite();
        this.UpdateMainPanel();
        this.newChange = false;
      }

      for(var p in this.panels)
      {
        this.panels[p].Update(dt);
      }
      UpdateListeners();
    }

    // editor.cursor = null;
	}









  SetMode(name){

    var lastMode = this.toolbar.modes[editor.mode];
    var mode = this.toolbar.modes[name];

    if(lastMode)
    {
      lastMode.handle.classList.remove('show');
      lastMode.set = false;
    }

    if(mode)
    {
      mode.handle.classList.add('show');
      mode.set = false;
    }

    editor.mode = name;
  }
  InitUI(){

    this.uiHolder = $('<div class="inner edtr-siteui-wrapper" style="position:absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>');
    this.wrapper.append(this.uiHolder);
  //
    this.uiCanvas = document.createElement('canvas');
    this.uiHolder[0].append(this.uiCanvas);
    this.uiCanvas.width = window.innerWidth;
    this.uiCanvas.height = window.innerHeight;
  //
    // this.uiControls = $('<div class="edtr-siteui-ctrls"></div>');
    this.uiHolder.append(this.uiControls);
  //
    this.uiCtx = setupCanvas(this.uiCanvas);
  //
    this.initui = true;

  //
  //   this.siteRatio = 0;
    // this.siteRatio = this.siteWrapper[0].width;
  }
  InitUICtrls(){

    // elmBlock.addEventListener('mouse-enter'

    this.elmCtrls = {};

    var left = this.elmCtrls.left = $('<div class="handle-left ctrl-mv-x"><div>');
    var right = this.elmCtrls.right = $('<div class="handle-right ctrl-mv-x"><div>');
    var top = this.elmCtrls.top = $('<div class="handle-top ctrl-mv-y"><div>');
    var bottom = this.elmCtrls.bottom = $('<div class="handle-bottom ctrl-mv-y"><div>');
    var diag = this.elmCtrls.diag = $('<div class="handle-diag ctrl-scl-diag"><div>');
    var block = this.elmCtrls.block = $('<div class="handle-block ctrl-mv-xy"></div>');

    this.uiControls.append(left[0]);
    this.uiControls.append(right[0]);
    this.uiControls.append(top[0]);
    this.uiControls.append(bottom[0]);
    this.uiControls.append(diag[0]);
    this.uiControls.append(block[0]);

    this.elmCtrls.left[0].addEventListener('mousemove', function(e){
      // console.log(this.classList);
      if(this.classList.contains('mv')){
        this.style.left = e.pageX + 'px';
        // console.log('mv x');
      }
    })

    for(var c in this.elmCtrls)
    {
      this.elmCtrls[c][0].addEventListener('mousedown',function(e){
        this.classList.add('mv');
      });

      this.elmCtrls[c][0].addEventListener('mouseup',function(e){
        this.classList.remove('mv');
      });

      // this.elmCtrls[c][0].addEventListener('mouseleave',function(e){
      //   this.classList.remove('mv');
      // });

    }



  }





















  NewWindow(name, widgits)
  {
    if(name in this.windows) {
      // this.windows[name].panel.$[0].style.display = 'inherit';
    }
    else {

      var pan = this.NewPanel({cntr: true,x: 0, y:0, w: 230, h:400});
      var win = new Window(name, null, widgits);

      pan.append(win,[]);

      pan.AddWindow(win);
      // pan.Init(this.wrapper,{cntr: true, x: 0, y: 0, w: 400, h: 400});

      this.windows[name] = win;
    }
  }

  // NewWindow(name, $, parent, rect){
  //
  //   // console.log($);
  //   for(var i = 0; i < this.windows.length; i++)
  //   {
  //     if(name == this.windows[i].name)
  //     {
  //
  //     }
  //     console.log('Window - NewWindow() - ! + a window with this name already exists + !');
  //     return;
  //   }
  //
  //   var win = new Window(name, body, rect);
  //
  //   win.Init();
  //
  //   // this.rsizHandles.push(win.InitResize());
  //   this.windows[name] = win;
  // }

  NewPanel(rect){

    var p = new Panel(rect);
    p.id = this.panels.length;

    this.canvObj.append(p, []);
    this.panels.push(p);
    return p;
  }




















  DrawUI(){


    this.uiCtx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);
    this.canvObj.Draw(this.uiCtx);
    // this.canvObj.DrawDebug(this.uiCtx);

    // document.body.style.cursor = editor.cursor;


    // console.log(this.uiCtx);

    // if(this.highlight)
    // {
    //   var sub = this.GetObj(this.highlight[this.highlightIndex].dataset.path);
    //
    //   var left = sub['style'][this.siteRatio]['left'];
    //   var top = sub['style'][this.siteRatio]['top'];
    //   var width = sub['style'][this.siteRatio]['width'];
    //   var height = sub['style'][this.siteRatio]['height'];
    //
    //   if(left != undefined && top != undefined && width != undefined && height != undefined) {
    //     this.uiCtx.beginPath();
    //     this.uiCtx.rect(left, top, width, height);
    //     this.uiCtx.stroke();
    //   }
    // }

    // for(var p in this.panels)
    // {
    //   this.panels[p].Draw(this.uiCtx);
    // }
  }

  HighlightSelection(){
    // // this.highlighted =
    // this.highlighted = arrPath;
    // this.highlightIndex = 0;
    //
    // var dataPath = this.highlight[this.highlightIndex].dataset.path.split('/');
    // var type = dataPath[dataPath.length - 1].split('-');
    //
    // while(type[0] != 'elm')
    // {
    //   this.highlightIndex += 1;
    //
    //   console.log(this.highlightIndex);
    //   dataPath = this.highlight[this.highlightIndex].dataset.path.split('/');
    //   type = dataPath[dataPath.length - 1].split('-');
    // }
  }
  LoadStyling(){
    var panelWrapper = $("#edtr_main_panel");
    this.panel = $("#edtr_main_panel > .inner");

    $.ajax({
      type:'POST',
      url: './includes/editor.php',
      success: function(data){
        panelWrapper.append(data);
      }
    });
  }
  Enter(){
    this.UpdateMainPanel();
    // this.siteWrapper.append(this.editorSite);
    // this.liveSite.remove();
    // this.siteWrapper.append(this.editorSite);

    if(this.uiCanvas == undefined)
      this.InitUI();

    // this.siteWrapper.append(this.uiCanvas);

    this.active = true;

    // console.log(this.siteData);
    // this.RenderEditorSite();
    this.canvasSet = false;
  }
  Exit(){
    // $.ajax({
    //   type: "POST",
    //   url: 'includes/site_data.php',
    //   data: {action:'save', data: JSON.stringify(editor.siteData).replace(/"/g, "'")},
    //   success: function(data)
    //   {
    //     console.log(data);
    //   }
    // });

    this.active = false;
    this.highlighted = null;
  }

  RenderEditorSite(){
    if(this.activePage){

      // this.editorSite.html(this.activePage['name']);

      var html = '';

      for(el in this.activePage['>'])
      {
        html += el['id']
      }

    }
  }

	UpdateMainPanel() {
    // var subjectDetail = SubjectDetail(this.subject);
    //
    // if(this.mpNavup)
    //   this.mpHistory.pop();
    // else
    //   this.mpHistory.push(subjectDetail);
    //
    //
    //
    // // if not equal, data in the subject was updated
    // if(this.mpHistory[this.mpHistory.length - 1] == subjectDetail)
    // this.wrapper.html(this.mpHistory[this.mpHistory.length - 1]);
    // else
    // {
    // this.wrapperPanel.html(subjectDetail);
    //   this.mpHistory[this.mpHistory.length - 1] = subjectDetail;
    // }



	}

  // RenderEditorUIHandles




  UpdateUICtrls(){

    if(this.subject['type'] == 'elm')
    {
      var left = this.elmCtrls.left[0];
      var right = this.elmCtrls.right[0];
      var top = this.elmCtrls.top[0];
      var bottom = this.elmCtrls.bottom[0];

      var style = this.subject['style'][this.siteRatio];

      // console.log(style);

      if(!left.classList.contains('mv'))
        left.style.left = style['left'] + 'px';

      if(!right.classList.contains('mv'))
        right.style.left = parseFloat(style['left']) + parseFloat(style['width']) + 'px';

      top.style.left = style['left'] + 'px';
      bottom.style.left = style['left'] + 'px';

      left.style.top = style['top'] + 'px';
      right.style.top = style['top'] + 'px';
      top.style.top = style['top'] + 'px';
      bottom.style.top = parseFloat(style['top'])  + parseFloat(style['height']) + 'px';

      top.style.width = style['width'] + 'px';
      bottom.style.width = style['width'] + 'px';

      left.style.height = style['height'] + 'px';
      right.style.height = style['height'] + 'px';

        // this.uictrlsync = true;
    }
    else
    {
      // var left = this.elmCtrls.left[0];
      // var right = this.elmCtrls.right[0];
      // var top = this.elmCtrls.top[0];
      // var bottom = this.elmCtrls.bottom[0];
      //
      // left.style.display = 'none';
      // right.style.display = 'none';
      // top.style.display = 'none';
      // bottom.style.display = 'none';

    }
  }

  LiveEdit(root, edtrRep, data, index)
  {

  }
  Edit(path) {

    this.subject = this.GetObj(path);

    if(this.subject['type'] == 'pg')
    {
      // this.DisplayPage(root);
    }

    this.UpdateMainPanel();
  }
  GetObj(path, getParent) {

    var path = path.split('/');

    if(getParent)
      path.pop();


    for(var p in path)
      path[p] = path[p].split('-');


    var subject = this.session;

    for(var obj in path)
      subject = this.GetTypeInSubject(subject, path[obj][0])[path[obj][1]];

    return subject;

  }
  PanelObj(path){
    return this.panelElements[path];
  }
  AddPanelObj(path, obj){
    // this.panelElements[path] = obj;

    return this.panelElements[path] = obj;
  }

  GetTypeInSubject(subject, type) {

    while(!Array.isArray(subject))
    {
      subject = subject['>'];
    }

    var objs = [];

    for(var obj in subject){
      if(subject[obj]['type'] == type)
        objs.push(subject[obj]);
    }

    return objs;
    // var objs = [];
  }
  GetObjsOfType(type) {
    var objs = [];
    for(var i = 0; i < this.session.length; i++)
    {
      if(this.session[i]['type'] == type);
      {
        objs.push(this.session[i]);
      }
    }
    // console.log(objs);
    return objs;
  }
  GetObjByID(id){

  }
  NavUp(path) {
    this.subject = this.GetObj(path, 1);

    // if(this.GetObj(path))
    this.mpNavup = true;
    this.UpdateMainPanel();
    this.mpNavup = false;
  }


  RenderPage() {

    // var sub = this.activePage;
    //
    // if(!sub['_$'])
    // {
    //   sub['_$'] = $('<div class="pg active">page object</div>');
    //   var content = sub['content'];
    //   var style = sub['style'][0];
    //
    //   this.editorSite.html(sub['_$']);
    //
    //   for(var i = 0; content && i < content.length; i++){
    //     sub['_$'].append(RenderElement(content[i]));
    //   }
    //
    //   for(var s in style)
    //   {
    //     sub['_$'][0].style[s] = style[s];
    //   }
    // }

    var sub = this.activePage;

    if(!sub.elm)
    {
      sub.elm = $('<div class="pg active">page object</div>')[0];

      var children = sub.children;
      var style = sub.properties['style'];

      this.editorSite.html('');
      this.editorSite.append(sub.elm);

      for(var c in children)
        sub.elm.append(RenderElement(children[c]));

      for(var s in style)
        sub.elm.style[s] = style[s];
    }

  }

  Add(){

  }

  pgSetActive(path = 'pg-0'){


    // var pgs = this.GetTypeInSubject(this.session, 'pg');
    //
    // for(var i = 0; i < pgs.length; i++){
    //   if(pgs[i]['display'] == true)
    //   {
    //     pgs[i]['display'] = false;
    //     break;
    //   }
    // }
    // var active = this.GetObj(path)
    // active['display'] = true;
    //
    // this.activePage = active;

    // var pgs = this.subject.SubjectOfType('pg');

    if(this.activePage)
      this.activePage.properties['style-display'] - 'none';

    this.activePage = this.subject.get(path);

    this.RenderPage();

  }

  getProperty(){

    // var prop = property.split('-');
    // var sub = this.subject[property.split('-')];

    // if(prop[0] in this.subject){
    //   var sub = this.subject[prop[0]];
    //   if(prop[0] == 'style')
    //   {
    //       return sub[this.siteRatio][prop[1]];
    //   }
    // }
    // console.log(this.subject);

    // return 'property value';


  }

  setProperty(property, value){

    var prop = property.split('-');
    // var sub = this.subject[prop[0]];

    if(prop[0] in this.subject){
      var sub = this.subject[prop[0]];
      if(prop[0] == 'style')
      {
        if(this.siteRatio in sub){
          sub[this.siteRatio][prop[1]] = value;
        }
        else
        {
          this.siteRatio = 0;
          sub[this.siteRatio] = {};
          sub[this.siteRatio][prop[1]] = value;
        }
      }
    }
    // var index = property['index'];

    // this.subject[prop][index] = value;
  }

}

function DropDown(title, subject, type){

  dropdown = $('<div class="edtr-dropdown-wrapper"></div>');

  var handleHTML = '';
  handleHTML += '<div class="edtr-dropdown-handle">'; //handle
  handleHTML += '<div class="handle-arrow">&#9654</div>';
  handleHTML += '<div class="handle-title">'+title+'</div>';
  handleHTML += '</div>'; //handle

  dropdown.append($(handleHTML));

  var content = $('<div class="edtr-dropdown-content"></div>');
  dropdown.append(content);

  var contentObjs = null;
  if(type == 'pg')
    content.append(PageList(subject));
  else if(type == 'elm')
    content.append(ElementList(subject));
  else if(type == 'style')
    content.append(prop_Style(subject));
  else if(type == 'class')
    content.append(ClassList(subject));

  return dropdown;
}

function PageList(subject){

  var listObj = $('<div class="edtr-pagelist-wrapper"></div>');

  for(var i = 0; i < subject.length; i++) {

    sub = subject[i];

      var html = '';
      html += '<div class="edtr-page" data-root="'+''+'">'; //pg

        html += '<div class="page-handle">';//handle

          html += '<div class="page-title" onclick="editor.pgSetActive(\''+sub['path']+'\')">'+ sub['title'] + '</div>';
          html += '<div class="page-selected"> <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle cx="50" cy="50" r="45"/> </svg> </div>';

          html += '<div class="page-options">'; //options
            html += '<div class="adm-button node-prompt-edit" onClick="editor.Edit(\''+sub['path']+'\');">Edit</div>';
          html += '</div>'; //options

        html += '</div>';//handle

      html += '</div>'; //pg

    listObj.append($(html));
  }
  return listObj;
}
function ElementList(subject){

  // console.log(subject);

  pillContainer = $('<div class="edtr-elm-pill-container"></div>');

  for(var i = 0; i < subject.length; i++){
    sub = subject[i];
    pillHtml = '<div class="edtr-pill cont-elm-brick" onClick="editor.Edit(\''+sub['path']+'\')" data-path="'+sub['path']+'">';
    pillHtml += '#' + sub['id'] + ' ';

    cls = sub['class'];
    for(c in cls)
      pillHtml += '.'+cls[c]+' ';
    pillHtml += '</div>';

    pillContainer.append($(pillHtml));
  }

  return pillContainer;
}
function ClassList(subject) {

  var container = $('<div class="edtr-elm-class-container"></div>');
  classes = subject['class'];

  for(var i = 0; i < classes.length; i++){
    cls = classes[i];
    pillHtml = '<div class="edtr-class-pill edtr-pill edtr-text-mod" data-prop=\''+JSON.stringify({path: subject['path'],property:'class', lastValue:cls, index: i})+'\'>';
    pillHtml += '.'+cls;
    pillHtml += '</div>';

    pillObj = $(pillHtml);
    container.append(pillObj);

  }

  return container;
}

function PageBlock(page){

  // console.log(page);
  html = '';

  html += '<div class="edtr-page" onclick="editor.Display(\''+page['path']+'\')" data-root="'+''+'">'; //pg

    html += '<div class="page-handle">';//handle

      html += '<div class="page-title">'+ page['title'] + '</div>';
      html += '<div class="page-selected"> <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle cx="50" cy="50" r="45"/> </svg> </div>';

      html += '<div class="page-options">'; //options

      // var links = obj['content']['links'];

      // if($childNodes->length > 0)
        // $tree .= '<div class="show-children-opt node-prompt-edit"> <svg viewBox="0 25 100 40" xmlns="http://www.w3.org/2000/svg"> <circle cx="16.5" cy="50" r="10"/> <circle cx="49.5" cy="50" r="10"/> <circle cx="82.5" cy="50" r="10"/>  </svg> </div>';


        html += '<div class="adm-button node-prompt-edit" onClick="editor.Edit(\''+page['path']+'\');">Edit</div>';
      html += '</div>'; //options

    html += '</div>';//handle

  html += '</div>'; //pg

  // editor.pageBlocks.push();

  return html;
}
function SubjectDetail(subject){

  var type = subject['type'];

  var tempObj = null;
  if(type == undefined)
    tempObj = RootDetail(subject);
  else if(type == 'pg')
    tempObj = PageDetail(subject);
  else if(type == 'elm')
    tempObj = ElementDetail(subject);

  // if(type != undefined && tempObj)
    // subject['~$'] = tempObj;

  if(tempObj)
    return tempObj;
  else
    alert("subject type not supported");

  // editor.uictrlsync = false;
}

function RootDetail(subject){
  detail = $('<div class="edtr-root-detail-wrapper"></div>');
  detail.append(DropDown('pages', subject, 'pg'));
  return detail;
}
function PageDetail(subject){

  detail = $('<div class="edtr-pg-detail-wrapper"></div>');

  objParent = $('<div class="edtr-page-parent" onClick="editor.NavUp(\''+subject['path']+'\')">root</div>');
  detail.append(objParent);

  if(subject['>'])
    detail.append(DropDown('content', subject['>'], 'elm'));

  return detail;
}
function ElementDetail(subject){

  detail = $('<div class="edtr-elm-detail-wrapper"></div>');


  // parentObj.append(objParent);


  var sub = subject;

  parentHtml = '<div class="edtr-element-parent" onClick="editor.NavUp(\''+sub['path']+'\'); editor.highlighted = null;">parent</div>';
  detail.append($(parentHtml));

  infoHtml = '<div class="edtr-elm-info">  <div class="edtr-elm-id"> id: \n' + sub['id'] + '\n</div></div>';
  infoObj = $(infoHtml);
  detail.append(infoObj);

  classesHtml = '<div class="edtr-elm-classes"> <div>class:</div>\n</div>';
  classesObj = $(classesHtml);
  infoObj.append(classesObj);


  // transformHtml = '<div class="edtr-elm-classes"> <div>class:</div>\n</div>'

  if(sub['class'])
    classesObj.append(ClassList(sub));

  if(sub['content'])
    detail.append(ContentDetail(sub['content']));

  if(sub['style'])
    detail.append(DropDown('style', sub['style'], 'style'));
  // if(sub['style'])
  //style display
  // if(sub['js'])
  //js display
  if(sub['>'])
    detail.append(DropDown('elements', sub['>'], 'elm'));


  return detail;
}
function ContentDetail(subject) {

  contentObj = $('<div class="edtr-content-detail-wrapper"></div>');

  if(subject['type'] == 'text');
    contentObj.append('<div>' + subject['value'] + '</div>');

  // detailHtml = '';


  // detail.append($(detailHtml));
  return contentObj;
}

function prop_Style(subject) {


  transformProperty = $('<div class="edtr-transform-detail-wrapper"></div>');

  var detailHtml = '';
  var style = subject[editor.siteRatio];

  for(var p in style)
    detailHtml += '<div class="">'+p+': </div> <div class="">'+style[p]+'</div>';

  detailHtml += '</div>';

  transformProperty.append($(detailHtml));

  // subject['~$'] = transformProperty;
  // for(var param in subject)
  return transformProperty;
}

function RenderElement(subject){
  var sub = subject;
  var obj = [];

  if(!sub.elm)
  {
    var type = sub.type;

    // if(type == 'elm')
      sub.elm = $('<div class="edtr-sel" data-path="'+sub['path']+'">'+type+'</div>')[0];
      // sub.parent.elm.append(sub.elm);

    if(type == 'text')
      sub.elm.append(sub['value']);
    //   sub['_$'] = $('<div class="edtr-sel" data-path="'+sub['path']+'"></div>');

    for(cl in sub['class'])
      sub['_$'][0].classList.add(sub['class'][cl]);

    var content = sub['content'];

    if(sub['style'])
    {
      var style = sub['style'][0];
      for(var s in style)
      {
        sub['_$'][0].style[s] = style[s];
      }
    }
    // console.log(sub['_$'][0].getBoundingClientRect());

    for(var i = 0; content && i < content.length; i++)
    {
      var cont = content[i];

      // if(cont['type'] == 'text')
      //   sub['_$'].append('<div class="edtr-sel" data-path="'+cont['path']+'">'+ cont['value'] +'</div>');
      // else if(cont['type'] == 'elm')
      sub['_$'].append(RenderElement(cont));
      //   sub['_$'].append('<div class="edtr-sel" data-path=""')

    }



      // sub['_$'].append('<div class="edtr-elm-content">'+ sub['content']['value'] +'</div>');

    // if(sub['>'])
    //   for(var i = 0; i < sub['>'].length; i++)
    //   {
    //     sub['_$'].apppend(RenderElement(sub['>'][i]));
    //   }
  }
  // var elm = sub
  // sub['_$'][0].style.left = '50%';

  // console.log(sub['_$'][0].style.cssText);

  return sub.elm;

}




function UpdateListeners(){

    var drpHands = document.getElementsByClassName('edtr-dropdown-handle');

    for(var i = 0; i < drpHands.length; i++)
    {

      if(!drpHands[i].classList.contains('set'))
      {

        drpHands[i].nextElementSibling.classList.toggle('show');
        drpHands[i].classList.toggle('show');


        drpHands[i].addEventListener("click", function(){
          this.nextElementSibling.classList.toggle('show');
          this.classList.toggle('show');
        });

        drpHands[i].classList.add('set');
      }
    }

    var elBrks = document.getElementsByClassName('cont-elm-brick');

    for(var i = 0; i < elBrks.length; i++)
    {
      if(!elBrks[i].classList.contains('set'))
      {
        elBrks[i].addEventListener("mouseenter", function(){
          editor.highlighted = this.dataset.path;
        });
        elBrks[i].addEventListener("mouseleave", function(){
          editor.highlighted = null;
        });

        elBrks[i].addEventListener("click", function(){

        });

        elBrks[i].classList.add('set');
      }
    }

    // var rsizTabs = document.getElementsByClassName('rsiz-tab');
    //
    // for(var i = 0; i < rsizTabs.length; i++)
    // {
    //   var tab = rsizTabs[i];
    //   if(!tab.classList.contains('mving-set')){
    //     tab.addEventListener('mousemove', function(e){
    //       if(this.classList.contains('mving')){
    //         this.style.left = e.pageX - e.offsetX;
    //       }
    //     });
    //   }
    // }
    //
    //
    // if(!mvingSet)
    // {
    //   document.addEventListener('mousemove', function(e){
    //
    //     for(var i = 0; i < rsizTabs.length; i++){
    //       var tab = rsizTabs[i];
    //       if(tab.dataset.uniform){
    //         // console.log(tab.dataset.uniform);
    //       }
    //     }
    //
    //   });
    //
    // }


    // var escalex = document.getElementsByClassName('edtr-scale-x');
    // for(var i = 0; i < escalex.length; i++)
    // {
    //   if(!escalex[i].classList.contains('sclx-set')){
    //
    //     escalex[i].classList.add('sclx-set');
    //   }
    // }
    //
    // var escaley = document.getElementsByClassName('edtr-scale-y');
    // for(var i = 0; i < escaley.length; i++)
    // {
    //   if(!escaley[i].classList.contains('scly-set')){
    //
    //     escaley[i].classList.add('scly-set');
    //   }
    // }
    //
    // var escalexy = document.getElementsByClassName('edtr-scale-diag');
    // for(var i = 0; i < escalexy.length; i++)
    // {
    //   if(!escalexy[i].classList.contains('sclxy-set')){
    //
    //     escalexy[i].classList.add('sclxy-set');
    //   }
    // }
    //
    // var emovexy = document.getElementsByClassName('edtr-move-xy');
    // for(var i = 0; i < emovexy.length; i++)
    // {
    //   if(!emovexy[i].classList.contains('movxy-set')){
    //
    //     emovexy[i].classList.add('movxy-set');
    //   }
    // }



    // var ecps = document.getElementsByClassName('edtr-class-pill');
    //
    // for(var i = 0; i < ecps.length; i++)
    // {
    //   if(!ecps[i].classList.contains('set'))
    //   {
    //
    //     ecps[i].addEventListener("click", function(){
    //       // this.outerHTML = '<input class="edtr-text-input" data-prop=\''+this.dataset['prop']+'\' value="'+JSON.parse(this.dataset['prop'])['lastValue']+'">';
    //       this.setAttribute('contenteditable', true);
    //
    //       if(!this.classList.contains('editing')){
    //         this.classList.add('editing');
    //         this.focus();
    //         this.innerHTML = JSON.parse(this.dataset['prop'])['lastValue'];
    //       }
    //     });
    //
    //     ecps[i].addEventListener('blur', function(){
    //       this.classList.remove('editing');
    //       this.setAttribute('contenteditable', false);
    //       this.innerHTML = '.' + JSON.parse(this.dataset['prop'])['lastValue'];
    //     });
    //
    //     ecps[i].addEventListener('keypress', function(e){
    //       setProp = false;
    //       if(e.key === "Enter"){
    //         setProp = true;
    //         e.preventDefault();
    //       }
    //
    //       if(setProp)
    //       {
    //         // console.log(this.dataset['prop']);
    //         editor.setProperty(JSON.parse(this.dataset['prop']),this.innerHTML);
    //         editor.UpdateMainPanel();
    //       }
    //     });
    //
    //     ecps[i].classList.add('set');
    //   }
    // }


    var tmods = document.getElementsByClassName('edtr-text-mod');

    for(var i = 0; i < tmods.length; i++)
    {
      if(!tmods[i].classList.contains('set'))
      {
        tmods[i].addEventListener('click', function(){

          this.setAttribute('contenteditable', true);
          if(!this.classList.contains('editing')){
            this.classList.add('editing');
            this.focus();
            this.innerHTML = JSON.parse(this.dataset['prop'])['lastValue'];
          }
        });

        tmods[i].addEventListener('blur', function(){
          this.classList.remove('editing');
          this.setAttribute('contenteditable', false);
          this.innerHTML = '.' + JSON.parse(this.dataset['prop'])['lastValue'];
        });

        tmods[i].addEventListener('keypress', function(e){
          setProp = false;
          if(e.key === "Enter"){
            setProp = true;
            e.preventDefault();
          }

          if(setProp)
          {
            editor.setProperty(JSON.parse(this.dataset['prop']),this.innerHTML);
            editor.UpdateMainPanel();
          }
        });

        tmods[i].classList.add('set');
      }
    }

    var rsizTabs = document.getElementsByClassName('rsiz-tab');

    for(var i = 0; i < rsizTabs.length; i++)
    {
      var tab = rsizTabs[i];

      if(!tab.classList.contains('rsiz-set')){

        tab.addEventListener('mousedown', function(){
          this.classList.add('rsizing');
        });

        // tab.addEventListener('mouseup', function(){
        //   this.classList.remove('rsizing');
        // });

        tab.classList.add('rsiz-set');
      }
    }

}

document.addEventListener('mouseup', function(e){

  var rsizing = document.getElementsByClassName('rsizing');

  for(var i = 0; i < rsizing.length; i++)
  {
    rsizing[i].classList.remove('rsizing');
  }

});

document.addEventListener('mousemove', function(e){

  var rsizing = document.getElementsByClassName('rsizing');

  for(var i = 0; i < rsizing.length; i++)
  {
    var tab = rsizing[i];
    var parent = tab.parentElement;

    var rsizing = tab.classList.contains('rsizing');
    var left = tab.classList.contains('left');
    var right = tab.classList.contains('right');
    var bottom = tab.classList.contains('bottom');
    var move = tab.classList.contains('move');
    var diag = tab.classList.contains('diag');



    var isPanel = parent.classList.contains('edtr-panel');
    var sclUniformX = parent.classList.contains('scl-uniform-x');

    var sclNormal;
    if(!move)
      sclNormal = parent.classList.contains('scl-normal');
    else
      sclNormal = parent.parentElement.classList.contains("scl-normal");

    if(rsizing)
    {

      if(sclUniformX)
      {
        // console.log(window.outerWidth);
        if(left)
        parent.style.width = (window.outerWidth - (e.pageX * 2)) + 'px';
        else if(right)
        parent.style.width = (window.outerWidth - ((window.outerWidth - e.pageX) * 2)) + 'px';

      }
      else if(sclNormal)
      {
        if(left)
        {
          var lastRight = parseFloat(parent.style.left) + parseFloat(parent.style.width);
          parent.style.width = lastRight - e.pageX + 'px';
          parent.style.left = e.pageX + 'px';
          parent.style.right = lastRight + 'px';
        }
        else if(right)
        {
          parent.style.width = e.pageX - parseFloat(parent.style.left) + 'px';
        }
        else if(bottom)
        {
          parent.style.height = e.pageY - parseFloat(parent.style.top) + 'px';
        }
        else if(move)
        {
          parent.parentElement.style.left = e.pageX + 'px';
          parent.parentElement.style.top = e.pageY + 'px';
          parent.parentElement.style.right = '';
          parent.parentElement.style.bottom = '';

        }
        else if(diag)
        {
          parent.style.width = e.pageX - parseFloat(parent.style.left) + 'px';
          parent.style.height = e.pageY - parseFloat(parent.style.top) + 'px';
        }
        // if(isPanel)
        // parent.style.transform = 'translate()';

      }
    }
  }

  // if(e.path[0].classList.contains('edtr-sel'))
  // {
  //   // var selected = editor.GetObj(e.path[0].dataset.path);
  //   // editor.Highlight(e.path);
  // }
});















// //Old Stuff
// {
// var path = $('body');
// var pathIndex = 0;
// var modifier;
//
// var modifierCode = false;
// var getElement = false;
//
//
// var keys = {};
//
// function AddPage() {
// 	var blockCont = $('#page_block_container');
// 	var pagename = $('#add_page_name').val();
//
// 	console.log(pageName);
//
// 	$.ajax({
// 		type: 'POST',
// 		url: 'includes/page_editor.php',
// 		data: {action:'add',pagename: pagename},
// 		success: function(data){
// 			blockCont.html(data);
// 		}
// 	});
// }
//
// function EditPage() {
// 	var editor_panel = $('#edtr_main_panel .inner');
// 	var pagename = window.location.hash.substr(1);
//
// 	$.ajax({
// 		type: 'POST',
// 		url: 'includes/element_tree.php',
// 		data: {pagename: pagename},
// 		success: function(data) {
// 			editor_panel.html(data);
// 			editor_panel.append('<div id="save_page" class="adm-button" onclick="SavePage();">Save Page</div>');
//
// 			// $('.tree-node').each(function(){
// 			// 	$(this).addEventListener('mouseenter', function(){$(this).toggleClass('show-prompt');});
// 			// });
// 		}
// 	});
// }
//
// function SavePage() {
// 	var editor_panel = $('#edtr_main_panel .inner');
// 	var pagename = window.location.hash.substr(1);
//
// 	$.ajax({
// 		type:'POST',
// 		url: 'includes/page_editor.php',
// 		data: {action: 'update', pagename: pagename},
// 		success: function(){
// 			editor_panel.html('<div id="edit_page" onclick="EditPage();" class="adm-button">Edit Page</div>');
// 		}
// 	});
// }
//
// function ElementAtPath(path) {
//
//
// 	// var si = 0;
// 	// var child = $(node).closest('.tree-branch');
//
// 	// while( (child = child.previousSibling) != null)
// 	// 		si++;
//
// 	// return $(node).closest('.tree-branch')[0];
// 	var elm = $('.pg.active > .temp-element');
// 	for(var i = 1; i < path.length; i++){
// 		elm = elm.children('.temp-element').eq(path[i]);
// 	}
//
//
// 	// console.log(elm.children().eq(0));
// 	elm.css('background', 'red');
// 	return elm;
// 	// return child;
// 	// if(!$(node).hasClass("pg-root"))
// 	// {
// 		// return GetRootPath($(node).parent());
// 		// if($(node).)
// 	// }
// 	// else {
// 	// 	return $(node);
// 	// }
// 	// return node.parentElement.c;
// 	// var path = path || "";
// 	// // console.log(node.parentElement);
// 	// // var path = path[] || [pi];
// 	//
// 	// var prev = node.previousSibling;
// 	// var par = node.parentElement;
// 	// // return $(node).hasClass("pg-root");
// 	// if($(node).hasClass("pg-root"))
// 	// {
// 	// 	path = path.concat("r");
// 	// 	return path;
// 	// }
// 	// else{
// 	// 	path = path.concat("c");
// 	// }
// 	//
// 	// if(prev){
// 	// 	path = path.concat("s");
// 	// 	GetRootPath(prev, path);
// 	// }
// 	// else if(par) {
// 	// 	path = path.concat("c");
// 	// 	GetRootPath(par, path);
// 	// }
// }
//
// function EditNode(nodePath) {
// 	// console.log(GetRootPath(node));
// 	var editor_panel = $('#edtr_main_panel .inner');
//
// 	var element = ElementAtPath(nodePath);
// 	var styleText = element[0].style.cssText.split(";");
//
// 	var elementStyles = {};
//
// 	for(var i = 0; i < styleText.length; i++)
// 	{
// 		var style = styleText[i].split(':');
//
// 		if(style[0] != "")
// 			elementStyles[style[0]] = style[1];
// 	}
//
//
// 	// console.log(element);
// 	// for(const [key, val] of Object.entries(element[0].style)){
// 	// 	// elementStyles[key] = element.css(val);
// 	// 	// console.log(key);
// 	// 	if(element.css(element[0].style[val]))
// 	// 	{
// 	// 		console.log(key);
// 	// 		console.log(val);
// 	// 	}
// 	// 	// console.log(val);
// 	// }
//
// 	// console.log(elementStyles);
//
// 	$.ajax({
// 		type: "POST",
// 		url: 'includes/element_details.php',
// 		data: {action: 'get', pagename: "temp", nodePath: nodePath, elementDetails: JSON.stringify(elementStyles)},
// 		success: function(data) {
// 			editor_panel.html(data);
// 		}
//
// 	});
//
// }
//
// function editor_setView(view)
// {
// 	let action = 'list-pages';
// 	let panel = $('#edtr_main_panel .inner');
//
// 	// panel.getElementsByClassName('active-view');
//
// 	switch (view.toLowerCase()) {
// 		case 'list':
// 			action = 'list-pages';
// 			break;
// 		case 'tree':
// 			action = 'page-view';
// 			break;
// 		default:
// 	}
//
// 	$.ajax({
// 		type:'POST',
// 		url: './includes/editor.php',
// 		data: {action:action},
// 		success: function(data){
// 			panel.html(data);
// 		}
// 	});
// }
//
//
// document.addEventListener('keydown', (e) => {
// 	keys[e.key.toLowerCase()] = true;
// 	ReadKeys();
// });
//
// function clr() {
// 	keys = {};
// }
//
// function ReadKeys() {
//
// 	if(keys["`"] && keys["s"])
// 	{
// 		clr();
// 	}
// 	else if(keys["control"] && keys["x"])
// 	{
// 		getsetElement(true);
// 		clr();
// 	}
// 	else if(keys["enter"] && getElement)
// 	{
// 		getsetElement(false);
// 		clr();
// 	}
//
// 	// keys =
//
// 	// if(e.key == "ArrowUp" && pathIndex < path.length - 1)
// 	// {
// 	// 	// RemoveHandles($(path[pathIndex]));
// 	// 	pathIndex++;
// 	// 	// AddHandles($(path[pathIndex]));
// 	// }
// 	// else if(e.key == "ArrowDown" && pathIndex > 0)
// 	// {
// 	// 	// RemoveHandles($(path[pathIndex]));
// 	// 	pathIndex--;
// 	// 	// AddHandles($(path[pathIndex]));
// 	// }
// }
//
//
//
// document.addEventListener('mousedown', (e) => {
// 	// if(getElement)
// 	// {
// 	// 	getsetElement(false);
//
// 	// }
//
// 	var elms = "";
//
// 	// console.log(e.path);
//
// 	for(var i = 0; i < e.path.length; i++)
// 	{
// 		if(e.path[i].id)
// 			elms += e.path[i].id + " ";
// 		else if(e.path[i].parentNode)
// 		{
// 			var parent = e.path[i].parentNode;
// 			// console.log(parent);
// 			var childNodes = parent.childNodes;
//
// 			for(var c = 0; c < childNodes.length; c++)
// 			{
// 				// console.log("childNode");
//
// 				if(e.path[i] === childNodes[i])
// 				{
// 					elms += e.path[i].tagName + "-" + c + " ";
// 				}
// 			}
// 		}
// 		else
// 		{
// 			elms += $(e.path[i]) + " ";
// 		}
// 		// elms += ((e.path[i].id) || (e.path[i].tagName)) + " ";
// 	}
//
// 	// console.log(elms);
//
// 	$("#page_container").html(elms);
// });
//
// document.addEventListener('keyup', (e) => {
// 	keys[e.key] = false;
// });
//
// document.addEventListener('mouseover', (e) => {
// 	if(getElement)
// 	{
// 		// modifer =
// 		pathIndex = 0;
// 		path = e.path;
//
// 		modifier = $(path[pathIndex]);
// 	}
// });
//
// function ToggleEditMode() {
// 	if(LIVE_EDIT)
// 	{
// 		LIVE_EDIT = false;
// 		console.log('LIVE_EDIT: ' + LIVE_EDIT);
// 	}
// 	else
// 	{
// 		LIVE_EDIT = true;
// 		console.log('LIVE_EDIT: ' + LIVE_EDIT);
// 	}
//
// }
//
//
// function ED1_34HDT() {
// 	if(getElement)
// 	{
// 		if(path == undefined || path == null)
// 		{
// 			modifier = $('body');
// 		}
// 		else {
// 			modifier = $(path[pathIndex]);
//
// 			// if(modifierCode)
// 			// {
// 			// 	// var htmlInput = $('<input')
// 			// }
// 			// else
// 			// {
//
// 			// }
// 		}
// 		DrawUI();
// 	}
// }
//
//
// var ui;
// var uictx;
//
// // $(document).ready(function() {
// // 	ui = document.getElementById("ui_canvas");
// // 	uictx = ui.getContext("2d");
// //
// // 	setupCanvas(ui);
// //
// // });
//
// // var cellSize = 30;
// // function DrawGrid(canvas,ctx){
// 	// canvas.width = Math.floor(document.body.clientWidth / cellSize) * cellSize;
// 	// canvas.height = Math.floor(document.body.clientHeight / cellSize) * cellSize;
//
//
// 	// // setupCanvas(grid);
// 	// // ui.style.left = ((document.body.clientWidth - ui.width) / 2) + 'px';
// 	// // grid.style.left = 20 + 'px';
//
// 	// // console.log( document.body.clientWidth + ',' +  grid.width);
// 	// // console.log( document.body.clientHeight + ',' +  grid.height);
//
//
//
//
// 	// var xCount = canvas.width / cellSize;
// 	// var yCount = canvas.height / cellSize;
//
// 	// // gctx.clearRect(0, 0, grid.clientWidth, grid.clientHeight);
// 	// var y = cellSize;
// 	// while(y <= canvas.height)
// 	// {
// 	// 	var x = 0;
// 	// 	// console.log(grid.height);
// 	// 	while(x <= canvas.width)
// 	// 	{
// 	// 		ctx.beginPath();
// 	// 		ctx.arc(x, y, .5, 0, 2 * Math.PI);
// 	// 		ctx.fill();
// 	// 		x += cellSize;
// 	// 	}
//
// 	// 	y += cellSize;
// 	// }
// // }
//
// function DrawUI() {
//
// 	uictx.clearRect(0, 0, ui.width, ui.height);
// 	// DrawGrid(ui,uictx);
//
//
// 	DrawSelected(ui, uictx);
// }
//
// function getsetElement(get) {
//
// 	if($('#admin_panel.showadm').length)
// 	{
// 	console.log("get");
// 		if(get)
// 		{
// 			$('#admin_panel').css({
// 				'opacity':0,
// 				'pointer-events':'none'
// 			});
//
//
// 			getElement = get;
// 		}
// 		else
// 		{
// 			$('#admin_panel').css({
// 				'opacity': 1,
// 				'pointer-events': 'auto'
// 			});
//
// 			$('#elm_class').val(path[pathIndex].className);
// 			$('#elm_id').val(path[pathIndex].id);
//
// 			getElement = get;
// 		}
// 	}
//
// }
//
//
// function DrawSelected(canvas, ctx) {
//
// 	// console.log($(path[pathIndex]).position());
//
// 	ctx.strokeStyle = "red";
// 	ctx.strokeWidth = "2px";
// 	// offset(modifier);
// 	ctx.strokeRect(rect(modifier).left , rect(modifier).top, rect(modifier).width, rect(modifier).height );
// }
//
// function rect(el) {
// 	// return el[0].getBoundingClientRect();
//     // return { top: 10 , left: 10 };
//
//     var rect = el[0].getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft, width: rect.width, height: rect.height }
// }
//
// function XML_JS () {
//
// }
//
// function JS_XML () {
//
// }
//
//
//
// //xml --> html
// function XML_HTML () {
//
// }
//
//
// //html --> xml
// function HTML_XML () {
//
// }
//
// }
