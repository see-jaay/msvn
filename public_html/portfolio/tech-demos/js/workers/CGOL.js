


//features:
// add cell by clicking
// add cells by draging
// select cells by clicking and draging + alt
// copy selected cells
// paste selected cells
// move selected cells
// rotate selected cells by 90 degree intervals




var cellsize = 5;
var temparray = [];
var cellarray = [];
var initarray = [];
var canvWidth = 0;
var canvHeight = 0;
var as = false;
var simSpeed = .5;
var timer = 0;

var options = {
  'simspeed': .5,
  'play': false,
  'stop': true,
  'clear': false,
  'cellsize': 5,
};

function cgol_init(data){
  if(canvWidth != data.cw || canvHeight != data.ch)
  {
    canvWidth = data.cw - (data.cw % cellsize);
    canvHeight = data.ch - (data.ch % cellsize);


    // for(var i = 0; i < Math.round(canvWidth/cellsize) * Math.round(canvHeight/cellsize); i++) {
    //   cellarray[i] = 0;
    // }

    for(var y = 0; y < Math.round(canvHeight/cellsize); y++)
    {
      for(var x = 0; x < Math.round(canvWidth/cellsize); x++){
        cellarray[(y * Math.round(canvWidth/cellsize)) + x] = 0;
      }
    }
    // for(var i = 0; i < 10 * 10; i++)
    // {
    //   cellarray[i] = 0;
    // }

    // cellarray [400] = 1;
    // cellarray [401] = 1;
    // cellarray [402] = 1;
  }
}

function cgol_action(act, data){

  switch(act){
    case 'play': {
      options['play'] = true;
      options['stop'] = false;
      temparray = initarray;
    }
    break;
    case 'pause':
    {
      options['play'] = false;
      options['pause'] = true;
      options['stop'] = false;
    }
    break;
    case 'stop': {
      options['play'] = false;
      options['stop'] = true;
      options['pause'] = false;

      // cellarray = initarray;
    }
    break;
    case 'clear': {
      // options['clear'] = true;
      options['play'] = false;
      options['stop'] = true;
      for(var y = 0; y < Math.round(canvHeight/cellsize); y++)
      {
        for(var x = 0; x < Math.round(canvWidth/cellsize); x++){
          initarray[(y * Math.round(canvWidth/cellsize)) + x] = 0;
        }
      }
    }
    break;
    case 'mode-select':
    {
      if(options['selectMode'])
        options['selectMode'] = false;
      else
        options['selectMode'] = true;
    }
    break;
    default:
    break;

  }
}

function cgol_setOption(name, value){
  options[name] = value;
}

function cgol_update(dt, data){

  // if(localData != data)
  // {
  //   localData = data;
  // }

  if(canvWidth != data.canv.w || canvHeight != data.canv.h)
  {
    canvWidth = localData.canv.w;
    canvHeight = localData.canv.h;


    for(var y = 0; y < Math.round(canvHeight/cellsize); y++)
    {
      for(var x = 0; x < Math.round(canvWidth/cellsize); x++){
        initarray[(y * Math.round(canvWidth/cellsize)) + x] = 0;
      }
    }
    // for(var i = 0; i < 10 * 10; i++)
    // {
    //   cellarray[i] = 0;
    // }

    // cellarray [400] = 1;
    // cellarray [401] = 1;
    // cellarray [402] = 1;
  }


  var width = Math.round(canvWidth/cellsize);
  var height = Math.round(canvHeight/cellsize);

  // if(options['play']) {


  // var height = 10;
  // if(options['clear']){
  //   options['clear'] = false;
  // }

  if(options['play']){
    if(!isNaN(dt)) timer += dt * 1;


    if(timer > options['simspeed'])
    {
      temparray = [];
      for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){

          var livecells = getLive(x,y,width,height);
          temparray[(y * width) + x] = 0;

          if(cellarray[(y * width) + x] && livecells < 2)
          temparray[(y * width) + x] = 0;
          else if(cellarray[(y * width) + x] && (livecells == 2 || livecells == 3))
          temparray[(y * width) + x] = 1;
          else if(cellarray[(y * width) + x] && livecells > 3)
          temparray[(y * width) + x] = 0;
          else if(!cellarray[(y * width) + x] && livecells == 3)
          temparray[(y * width) + x] = 1;

          // console.log(temparray);
          // if((mouseData.x/cellsize) == x && (mouseData.y/cellsize) == y)
          //   temparray[(y * width) + x] = 2;

        }
      }
      timer = 0;
      cellarray = temparray;
    }
  }


  if(options['stop'] || options['pause']){

    var clickedPoint = false;



    // console.log(mouseData.mouseup);
    if((mouseData.mouseup && mouseData.downTime < .2) || (mouseData.mousedown && (keybinds['ShiftLeft'] || keybinds['ShiftRight'] || keybinds['AltLeft'] || keybinds['AltRight'])) )
    {
      clickedPoint = {};
      clickedPoint.x = mouseData.x;
      clickedPoint.y = mouseData.y;
    }

    temparray = cellarray;

    let stopped = options['stop'];


    for(var y = 0; y < height; y++){
      for(var x = 0; x < width; x++){

          if( clickedPoint && (Math.floor(clickedPoint.x/cellsize) == x && Math.floor(clickedPoint.y/cellsize) == y) )
          {
            // either stopped or paused
            if(stopped){

              if( initarray[(y * width) + x] == 1)
              {
                // if((keybinds['ShiftLeft'] || keybinds['ShiftRight']) )
                //   initarray[(y * width) + x] = 1;
               if((keybinds['AltLeft'] || keybinds['AltRight'])){
                 initarray[(y * width) + x] = 0;
                 // initarray[(y-1 * width) + x-1] = 0;
                 // initarray[(y+1 * width) + x-1] = 0;
                 // initarray[(y * width) + x -1] = 0;
                 // initarray[(y * width) + x +1] = 0;
                 // initarray[(y-1 * width) + x+1] = 0;
                 // initarray[(y+1 * width) + x+1] = 0;


               }
              }
              else if(!(keybinds['AltLeft'] || keybinds['AltRight']))

                initarray[(y * width) + x] = 1;

            } else {

              if( temparray[(y * width) + x] == 1)
              {
                if(!(keybinds['ShiftLeft'] || keybinds['ShiftRight']))
                  temparray[(y * width) + x] = 0;
              }
              else
                temparray[(y * width) + x] = 1;
            }
          }
      }
    }


    if(stopped) // ether stopped or paused
      cellarray = initarray;
    else
      cellarray = temparray;

    // cellarray[((mouseData.y/cellsize) * width) + (mouseData.x/cellsize)] = 2;
  }

    // console.log(cellarray);
    // console.log(temparray);
  // }


  var buf = new ArrayBuffer(cellarray.length + cellsize + width + height + 'cgol'.length + 'draw'.length);

  self.postMessage({state:'draw', demo:'cgol', data: {ca:cellarray, cs:cellsize, width: width, height: height}}, [buf]);

}


function upateCells(x, y, w, h, ca){
  //
  //
  // updateCells(x, y, w/2, h/2);
  // updateCells(x + w/2, y, w/2, h/2);
  // updateCells(x, y + w/2, w/2, h/2);
  // updateCells(x + w/2, y + w/2, w/2, h/2);
}
function setLive(x, y){
  cellarray[(y * (canvWidth/cellsize)) + x] = 1;
}
function getLive(x, y, w, h){
  var live = 0;
  for(var i = y - 1 ; i <= y + 1; i++) {
    for(var j = x - 1; j <= x + 1; j++) {

      // console.log(i);
      // if(j > w || j < 0) continue;
      // if(i > h)
      // {
      //   if(cellarray[0+j]) live++;
      //   continue;
      // }
      //
      // if(i < 0)
      // {
      //   if(cellarray[(h*w)+j]) live++;
      //   continue;
      // }


      if(j == x && i == y) continue;

      if(cellarray[(i*w) + j] == 1) live++;
    }
  }
  return live;
}
