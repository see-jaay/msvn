
self.importScripts('../../../junkyard/thorn/js/Effects/Global/Random.js');
self.sitedepth = 0;

self.onmessage = function(e){
  var s = e.data.state;

  switch (s) {
    case 'init':
      self.Init();
      break;
    case 'newtscrl':
      self.newtscrl(e.data);
      break;
    case 'update':
      self.Update(e.data.dt);
      break;
    case 'newdepth':
      self.sitedepth = e.data.depth;
    default:
  }
}


self.Init = function() {
  for(var t in tscrls){
    tscrls[t].Init();
  }
}

// update flicker + flicker limit make things look slower;
self.Update = function(dt) {
  // console.log(self.sitedepth);
    for(var t in tscrls){
      tscrls[t].Update(dt);
      // console.log(tscrls[t].timing);
    }
}

var tscrls = [];
class TextScroll {
  constructor(id, targets, timing, fclpt){
    this.id =id;
    this.targets = targets;
    this.timing = timing;
    this.timingIndex = 0;
    this.timer = 0;
    this.fclpt = fclpt;
    this.currval = targets[0];


    this.gib = 'abcdefghijklmnopqrstuvwxyz';


  }

  Init(){
    var targets = this.targets;
    for(var t in targets)
      for(var c in targets[t])
        this.gib = this.gib.replace(targets[t][c], '');

  }

  Update(dt){
    this.timer += dt;
    // var targetconsole
    // console.log(self.sitedepth);
    if(Math.abs(this.fclpt-self.sitedepth ) < .5)
    {

      if(this.timer > this.timing[this.timingIndex]){
        if(this.timingIndex < this.timing.length - 1)
          this.timingIndex++;
        else
          this.timingIndex = 0;

        // self.postMessage({state:'tsup', id: this.id, val: this.targets[this.timingIndex]});
        this.timer = 0;
      }

      var target = this.targets[this.timingIndex];
      var gib = target + this.gib + this.gib;
      var val = '';
      for(var c in target){
        // if(this.timi)
        if(this.currval[c] != target[c])
        {
          val += gib[randomInt(0, gib.length - 1)];
        }
        else {
          val += target[c];
        }
      }
      this.currval = val;

      if(val != target){
        self.postMessage({state:'tsup', id: this.id, val: val});
        this.updateOnce = true;
      }
      else {
        if(this.updateOnce)
        {
          self.postMessage({state:'tsup', id: this.id, val: val});
          this.updateOnce = false;
        }
      }
    }
  }
}

self.newtscrl = function(data) {
  var d = data;
  tscrls.push(new TextScroll(d.id, d.targets, d.timing, d.fclpt));
  // console.log(d.id + ' : ' + d.targets +' : '+ d.timing + ' : ' + d.fclpt);
}
