/* Layout Grid*/





/* Layout Grid */

/* Scroll Transitions */



class MSVNLayouts {
  constructor(){
    this.floats = [];
    this.lays = [];
    this.laysset = false;
    this.layerbox = $('#msvn-lb');
    this.depthRef = 0;
  }

  Update(dt){

    // let rt = $('.msvn-place');
    let lays = $('.lb-layer').not('.lyr-set');

    for(var i = 0; i < lays.length; i++)
    {
      this.lays.push({
        elm: $(lays[i]),
        lastUXdepth: 0,
        items:[],
        scl: 1,
      });

      let layItems = this.lays[i].elm.children();
      // console.log(layItems);
      //
      this.floats = [];
      // this.placeholders =
      for(var j = 0; j < layItems.length; j++)
      {
        let ph = $('<div class="plcehldr">placeholder</div>');
        let rect = $(layItems[j])[0].getBoundingClientRect();

        // ph.style.position = 'absolute';
        // ph.style.left = rect.left;
        // ph.style.left = rect.right;
        // ph.style.width = rect.width;
        // ph.style.height = rect.height;

        if(layItems[j].classList.contains('msvn-place'))
        {
          this.lays[i].items.push({
            elm: $(layItems[j]),
            placeholder: ph,
            rect: $(layItems[j])[0].getBoundingClientRect(),
            layer: i,
          });
          layItems[j].classList.remove('msvn-place');
        }
      }

      // $('#content_wrapper').find('.scroll-box.').find('.scroll-ref').css('height', window.innerHeight*this.lays.length);

      lays[i].classList.add('lyr-set');

      if(i == lays.length - 1)
      {

        this.laysset = true;
      }
    }

    // console.log(Math.round(SystemUX.depth/SystemUX.scrllrng))

    // for(var i = 0; i < rt.length; i++)
    // {
    //   this.floats.push({
    //       elm: $(rt[i]),
    //       rect: $(rt[i])[0].getBoundingClientRect(),
    //     });
    //   rt[i].classList.remove('msvn-place');
    // }

    // console.log(SystemUX.depth);

    // console.log(dpth);
    // this.depthRef = lerp(this.depthRef, SystemUX.depth, .75, .1);
    // let dpth = (this.depthRef*(this.lays.length-1))/SystemUX.scrllrng;
    this.depthRef = lerp(this.depthRef, SystemUX.scrollBlock.scrollTop, .75, .1);
    let dpth = (this.depthRef*(this.lays.length-1))/SystemUX.scrollBlock.scrollHeight;
    var rng = lays.length;

    for(var i = 0; i < this.lays.length; i++){
      let layer = this.lays[i];
      let elm = layer.elm;
      let d = i - dpth;
      let blr = 0;
      let scl = 1;
      let fctr = SystemUX.fpKeys.length;

      // if(i == 0)
        // console.log(d);

        if(d > -.5 && d < .5){
          // elm[0].style.transform = 'scale(1)';
          // elm[0].style.opacity = 1;
          // elm[0].style.filter = 'blur(0px)';
          elm[0].className = 'lb-layer lyr-set fcs';

        }
        else if(Math.round(d) > 1.5) {
          // elm[0].style.transform = 'scale(1.3)';
          // elm[0].style.opacity = 0;
          // elm[0].style.filter = 'blur(16px)';
          elm[0].className = 'lb-layer lyr-set fp2';

        }
        else if(Math.round(d) > .5) {
          // elm[0].style.transform = 'scale(1.1)';
          // elm[0].style.opacity = .5;
          // elm[0].style.filter = 'blur(8px)';
          elm[0].className = 'lb-layer lyr-set fp1';

        }
        else if(Math.round(d) < -1.5) {
          // elm[0].style.transform = 'scale(.5)';
          // elm[0].style.opacity = 0;
          // elm[0].style.filter = 'blur(16px)';
          elm[0].className = 'lb-layer lyr-set fm2';

        }
        else if(Math.round(d) < -.5) {
          // elm[0].style.transform = 'scale(.7)';
          // elm[0].style.opacity = .5;
          // elm[0].style.filter = 'blur(8px)';
          elm[0].className = 'lb-layer lyr-set fm1';

        }


      // if(d == 0){
      //   elm[0].style.transform += 'scale(1)';
      //   this.lays[i].scl = 1;
      //   // elm[0].style.opacty = 0;
      //   elm[0].style.transform = 'translateX(0px)';
      //
      // }
      // else if(d < 0)
      // {
      //   // elm[0].style.transform = 'translateX('+ (Math.pow(d,2) * window.innerWidth/10) +'px)';
      //   // elm[0].style.transform = 'scale('+ (1+( .4*Math.pow(2.71828182846, 2/(-d-3)) - .05))+')';
      //
      //   elm[0].style.transform = 'scale('+ (1-((d/4) + d/3))+')'; // 2 layers
      //   // elm[0].style.transform = 'scale('+ (1-( .4*Math.pow(2.71828182846, 2/(-d-.7)) - .05))+')';
      //   // elm[0].style.transform = 'scale('+ (1-(.2 * d))+')'; // 3 layers
      //
      //
      //   // elm[0].style.transform = 'scale('+ (1+(1 * (dpth/this.lays.length)))+')';
      //
      //   this.lays[i].scl = 1+(d/4);
      // }
      // else if(d > 0)
      // {
      //   // elm[0].style.transform = 'translateX(-'+ (Math.pow(d,2) * window.innerWidth/10) +'px)';
      //
      //   // elm[0].style.transform = 'scale('+ (1-((d/20) + d/12))+')';
      //   elm[0].style.transform = 'scale('+ (1-( .4*Math.pow(2.71828182846, 2/(-d-.7)) - .05))+')';
      //
      //   this.lays[i].scl = 1+(-d/4);
      //
      // elm[0].style.zIndex = d;
      // }

      // if(Math.abs(d)){
      //   // elm[0].style.opacity = 1 - (Math.abs(Math.round(d))/8);
      //   elm[0].style.opacity = 1 - Math.abs(Math.pow(d,2))/8;
      //
      //   // elm[0].style.filter = 'blur('+ ((Math.abs(Math.round(d))*5)) + 'px)';
      //   elm[0].style.filter = 'blur('+(Math.pow(Math.round(d),2) * 5)+ 'px)';
      //
      //
      // }
      // else {
      //   elm[0].style.opacity = 1;
      //   elm[0].style.filter = 'blur(0px)';
      // }


      this.lays[i].lastUXdepth == SystemUX.depth;
    }

    for(var l in this.lays){
      var layer = this.lays[l];
      for(var i = 0; i < layer.items.length; i++)
      {
        let elm = layer.items[i].elm;
        let rect = layer.items[i].rect;
        if(rect != elm[0].getBoundingClientRect())
          layer.items[i].rect = elm[0].getBoundingClientRect();

      }
    }

    // console.log(SystemUX.depth);

    // $('.msvn-place')[0].parentElement.style.transform.split('scale(')[1].split(')')[0]  // Layer Box Global Scale
    // console.log($('.rect-test')[0].getBoundingClientRect())
  }

  Draw(ctx){

    // for(var l in this.lays)
    // {
    //   let lay = this.lays[l];
    //   for(var i in lay.items){
    //     let r = lay.items[i].rect;
    //     ctx.beginPath();
    //     ctx.moveTo(r.left, r.top);
    //     ctx.lineTo(r.left + r.width, r.top);
    //     ctx.lineTo(r.left + r.width, r.top + r.height);
    //     ctx.lineTo(r.left, r.top + r.height);
    //     ctx.lineTo(r.left, r.top);
    //
    //     ctx.lineWidth = '3px';
    //     ctx.strokeStyle = "red";
    //     ctx.stroke();
    //
    //   }
    // }

    // console.log(this.floats.length);
  }
}


/* Scroll Transitions */

/* Page Transitions */
