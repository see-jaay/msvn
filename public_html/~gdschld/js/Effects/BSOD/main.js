class Modifier {
  constructor(){
    this.components = {};
  }

  Init(){
    // for(var c in this.components){
    //   let mycomp = this.components[c];
    //   mycomp.Init();
    // }

    // this.ctx = Site.ctxs['bsod'];
  }

  Update(dt){

    for(var c in this.components){
      let mycomp = this.components[c];
      let livecomp = Site.components[mycomp.uid];

      mycomp.Update(dt);
    }

  }

  Draw(ctx){

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for(var c in this.components){
      let mycomp = this.components[c];

      mycomp.Draw(ctx);
    }
  }

  Register(comp, data){
    this.components[comp.uid] = data;
    data.Init();
  }

}


class BSOD extends Modifier{
  constructor(){
    super();
    // this.components = {};
  }

  Init(){
    super.Init();
  }

  Update(dt){
    super.Update(dt);

    // console.log('bsod up');
    // if(!this.ctx) this.ctx = Site.ctxs['bsod'];
    // console.log(Site.ctxs['bsod']);
  }

  Draw(ctx){

    ctx.font = '14px merriweatherultrabold_italic';
    super.Draw(ctx);
  }

  Register(comp){
    let block = new BSOD_Block(this, comp);
    super.Register(comp, block);

    block.Init();
    // block.Init();
    // super.components[comp.uid] = new TextBlock(this, comp);
  }
}



/// Interface for renering Text Effects
class BSOD_Block {

  constructor(main, comp){
    this.main = main;

    this.comp = comp;
    this.uid = comp.uid;
    this.text = comp.elm.innerHTML;
    this.syntax = 'code';
    this.lines = [];
    this.words = [];


    this.celldim = [];
    this.rect = {};

    comp.elm.innerHTML = '';
    // this.words = {3:2};
    // this.ctx = null;
    // this.parseTxt();
  }

  Init(){
    this.parseTxt();
  }

  parseTxt(){
    const matchWords = new RegExp(/(?<!<)\b\w+\b/g); // words not including tags
    this.words = this.text.match(matchWords);

    const matchLines = new RegExp(/(?:.*(?=<))|(?:(?<=>|^).*)/gm);
    this.lines = this.text.match(matchLines);

    // console.log(this.celldim);
  }

  wordat(i){
    var key = Object.keys(this.words);
    return [parseInt(key[i]),this.words[key]];
  }

  Update(dt){
    // console.log('bsod');


    // if(this.rect)
    // this.draw();

    if(!this.init){
      this.init = true;
      this.parseTxt();
    }
    this.calcDimensions();
  }

  calcDimensions(){
    if(this.resized != Site.components[this.uid].resized || this.rect != this.comp.elm.getBoundingClientRect()){
      // this.parseTxt();
      this.rect = Site.components[this.uid].rect;
      this.w = [this.lines];
      this.w = this.w.sort((a, b) => b.length - a.length)[0].length;

      // if(w * this.celldim[0] > Site.components[this.uid].rect.w) {}

      this.h = this.lines.length;
      this.celldim = [6, 14];

      this.resized = Site.components[this.uid].resized;
    }
    // this.rect.y =
  }

  Draw(ctx){


    if(this.comp.elm.offsetParent === null)
    {
      // let temp = Array(this.lines.length--);
      // temp = this.lines;
      // for(var l in this.lines){
        this.lines.pop();
      // }
      // console.log(this.lines)
    }
      // return;

    // console.log(this.comp.elm.offsetParent);
    let rect = Site.components[this.uid].rect;
    let dr = Site.components[this.uid].drawRect;


    // let drawRect=

    // Site.log('r',rect);
    // ctx.scale(1.5, 1.5);
    ctx.fillStyle = 'white';
    for(var l in this.lines){
      ctx.fillText(this.lines[l], this.rect.x, this.rect.y + (l*this.celldim[1]) + this.celldim[1]);
    }
    // ctx.fillText(this.text, this.rect.x, this.rect.y+this.celldim[1]);
    // Site.log('', this.celldim);
    // ctx.scale(1/1.5, 1/1.5);
    // ctx.fillRect(rect.x,rect.y, 50, 50);
  }
}


// update(dt){
//
// }



// divide block width and height by font size ratio
// vertical count = line count
// horizontal count = line letter count
