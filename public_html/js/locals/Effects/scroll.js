


class ScrollBar extends UIObj {
  constructor(){
    super();

  }

  Init(){
    this.$ = $('#scrollbar');
    this.set('track', this.$.find('.track'));
    // this.set('bar', this.$.find('.bar'));
    this.set('up', this.$.find('.up'));
    this.set('down', this.$.find('.dwn'));
    this.get('track').set('bar', this.get('track').$.find('.bar'));

    super.Init();

    this.track = this.get('track');
    this.up = this.get('up');
    this.down = this.get('down');
    this.bar = this.track.get('bar');
    // console.log(this.bar);



    // console.log(this.bar);

    this.PreDraw();

//  FOCUS DYNAMICS

  }

  PreDraw(){

    // $(this.bar.$).mouseenter(function(){
    //   // this.style.top = "50%";
    //   systemUI.scrollbar.mouseover = true;
    // });

    var uiObjs = SystemUI.uiObjects;

    this.track.get('bar').mousedown = function(){
      // $(this.$)[0].style.top = "50%";
      systemUI.scrollbar.barctrl = true;
      // $('#bkrnd').css('background', 'red');
    }

    this.track.get('bar').mouseup = function(){
      // $(this.$)[0].style.top = "0";
      systemUI.scrollbar.barctrl = false;
    }

    uiObjs[this.track.get('bar').id].drwfn = function(ctx, r) {
      ctx.globalAlpha = 1;
      ctx.clearRect(r.x + (r.width/2) - 3, r.y - 5, 6, r.height + 10);
      ctx.beginPath();
      ctx.lineWidth = 2.35;
      ctx.moveTo(r.x + (r.width/2), r.y);
      ctx.lineTo(r.x + (r.width/2), r.y + r.height);
      ctx.stroke();
      ctx.lineWidth = 2.25;
    }

    uiObjs[this.track.id].drwfn = function(ctx, r){
      // this.super.Draw(ctx);
      ctx.clearRect(r.x + (r.width/2) - 3, r.y - 5, 6, r.height + 10);
      ctx.beginPath();
      ctx.globalAlpha = .15;
      ctx.moveTo(r.x + (r.width/2), r.y);
      ctx.lineTo(r.x + (r.width/2), (r.y + r.height));
      ctx.stroke();

      // for(var c in this.children)
      // {
      //   this.children[c].Draw(ctx);
      // }
    }

    // this.up.Draw = function(ctx){
    //   var r = this.rect;
    //   ctx.clearRect(r.x, r.y, r.width, r.height);
    //   ctx.beginPath();
    //   ctx.globalAlpha = 1;
    //   ctx.moveTo(r.x + (r.width/2) - 4, r.y + 14);
    //   ctx.lineTo(r.x + (r.width/2), r.y + 10);
    //   ctx.lineTo(r.x + (r.width/2) + 4, r.y + 14);
    //   ctx.stroke();
    // }
    //
    // this.down.Draw = function(ctx){
    //   var r = this.rect;
    //
    //   ctx.clearRect(r.x, r.y, r.width, r.height);
    //   if(this.hover)
    //     ctx.strokeStyle = 'red';
    //   ctx.beginPath();
    //   ctx.globalAlpha = 1;
    //   ctx.moveTo(r.x + (r.width/2) - 4, (r.y + r.height) - 14);
    //   ctx.lineTo(r.x + (r.width/2), (r.y + r.height) - 10);
    //   ctx.lineTo(r.x + (r.width/2) + 4, (r.y + r.height) - 14);
    //   ctx.stroke();
    // }
  }

  Draw(ctx){
    // if(this.rect){
    //   var r = this.rect;
    //   // ctx.clearRect(r.x, r.y, r.width, r.height);
    //
    //   for(var c in this.children) {
    //     if(this.children[c].Draw)
    //       this.children[c].Draw(ctx);
    //   }
    // }
  }

  Update(dt){
    super.Update(dt);
    // this.rect = $(this.$)[0].getBoundingClientRect();
    for(var c in this.children)
    {
      // console.log('sb c');
      this.children[c].Update(dt);
    }



    // if(this.mouseover)
    // {
    //   $(this.bar.$)[0].style.top = "50%";
    //
    //   for(var c in this.children)
    //   {
    //     var obj = this.children[c];
    //     if(obj.pointInRect(systemUI.mouseData.pageX, systemUI.mouseData.pageY)){
    //
    //     }
    //   }
    // }
    // else
    //   $(this.bar.$)[0].style.top = "0";

    // if(this.barctrl)
    //   this.depthTo = this.depthTo + systemUI.mouseData.movementY;



    //SCROLL FOCUS EFFECTS



    // console.log(this.track.rect.height);

    // if(this.scrollbar)
    // {
    //   this.scrollbar.Update(dt);
    //   this.scrollbar.bar.len = (this.scrollbar.rect.height - 40) / Object.keys(this.focalPoints).length;
    //   // console.log(Object.keys(this.focalPoints).length);
    // }





    // this.bar.len = this.rect.height - 40;
  }
}
