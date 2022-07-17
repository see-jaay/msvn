
/*


event management   --  using promises to experiment with optimal event distribution


fn  event manager

    {} events
      promise
      event data

      {}  subscribers
        promise
        specified data


    fn  dispatch ( event , data )
      Promise.all(events[event].subscribers.map(sub => return sub.p));

    fn  on ( event , data )
      let p = new Promise(( event , fn , data ) => {
        console.log(fn);
      });

      events[event].subscribser.push()

*/


let evt_manager = function() {
  const events = {};


  const subs = this.subs = {
    // 'win-resize':
    //// [do_one_thing(with data), do_another_thing(with data)],
    // 'mouse-move':
    //// [do_one_thing(with data), do_someting_else(with data)],
  };

  subs[Symbol.iterator] = function (){
    // const subs = subs;
    let currentIndex = -1;

    return {
      next: async function(_event){
        // console.log(await subs);
        const sublist = await subs[_event[0]];
        const data = _event[1];
        const sub = await sublist[++currentIndex];
        const count = await Object.keys(sublist).length;

        // if(!sub)
        //   return{ done: true }

         return {
          value: {sub, evt_data:data},
          done: currentIndex >= count
        }
      }
    }
  }
  const subsIter = subs[Symbol.iterator]();

  this.dispatch = function(    _event , evt_data   ){
    let val = subsIter.next([_event, evt_data]);

    val.then((result)=>{
      // console.log(result);
      if(!result.value || result.done)
        return;

      let evt_data = result.value.evt_data;
      let complete = result.done;

      let sub = result.value.sub;
      let resub = sub.resub;
      let evt = sub.evt;

      if(sub.hasOwnProperty('fn')){
        sub.fn(sub.data);
      }

      // console.log(this);
      if(resub){
        this.on(evt, {
          fn:sub.fn,
          data: sub.data,
          resub: resub
        });
      }
    });
  }

  let on = function(    _event , data  ){
    if(!this.subs.hasOwnProperty(_event))
      this.subs[_event] = [];

    this.subs[_event].push(new Promise((res, rej) => {
      // console.log
      let d = Object.assign(data, {evt: _event});
      res(d);
    }));
  }
  return {
    on,
    dispatch: this.dispatch,
    events:this.events,
    subs: this.subs,
  }
}






const event_manager = function(){


  this.events = {};
  this.subs = {};

  this.new = function(evt, data){

    // let
    // if(this.events.hasOwnProperty(evt)) {
    //   // this.events[evt].reject();
    //   // this.events[evt] = new Promise((res, rej)=>{res()});
    //   return;
    //
    // }
    // else {
      this.events[evt] = new Promise((res, rej, evt, data)=>{
        res(evt, data);
        return {evt, data};
      });
      // this.events[evt].subct = 0;
      // await this.events[evt].then((evt, data) => {console.log(data)});

    // }
  }

  this.on = async function(evt, response, resub = false) {

    if(!this.subs.hasOwnProperty(evt))
      this.subs[evt] = [];

    this.subs[evt].push({
      resub,
      data: response[1],
      response:response[0],
      filled:false
    });
  }

  this.fill = function(evt, _main = this) {
    return;
    // this.subs[evt].forEach()
    if(_main.events.hasOwnProperty(evt) &&
       _main.subs.hasOwnProperty(evt)){

      let e = _main.events[evt];
      let _evt = evt;
      let data = _main.subs[evt].data;
      // let data
      // let subs = this.subs[evt];
      // let ev = evt;
      // let l = this.listeners[evt];
      e.then((_evt, data, main = _main) => {

        if(!main.subs[evt] || main.subs[evt][0] === 0)
          return;

        let sub = main.subs[evt][0];


        if(sub && sub.filled == false) {
          sub.response(data);
          sub.filled = true;

          if(sub.resub)
            main.subs[evt].push(sub);

          main.subs[evt].shift();
        } else {
          main.subs[evt].forEach(s => {
            s.filled = false;
          });
          delete main.events[evt];
        }


        return {evt, data};
        // main.fill(evt, main);


        // this.subs[evt].push(sub);

        // delete this.events[evt];
      });

      // l.then((evt) => {this.listeners[evt]()})
    }
  }
};

export {event_manager as default, evt_manager}
