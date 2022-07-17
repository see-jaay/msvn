

var globalEvent = new EventTarget();

globalEvent.addEventListener("xml", function(){

});
// class Delegator extends EventTarget {
//   constructor(){
//     super();
//     this.fn = {};
//   }
//
//   get fn(key) { this.fn[key](); }
//   set fn(key, funct) { this.fn[key] = funct; }
// }
//
// $(document).ready(function(){
//
//   var event_core = new Delegator();
//
//   event_core.fn("key", function() {
//     console.log("key event");
//   });
//
//   event_core.fn("key");
//
// });

// var event_mouse = new Delegator();
// var event_effect = new Delegator();
// var event_keys = new Delegator();
// var event_keys = new Delegator();

// class EventManager extends EventTarget {
//   constructor(data){
//     super();
//     this.data = data;
//   }
//
//   get data(key) {
//     return this.data;
//   }
//
//   addData(data){
//     this.data.push(data);
//   }
//
//   // dispatch (evtKey, data, fn) {
//   //   if(evtKey in this.events){
//   //     super.dispatch(this.events[evtKey]);
//   //   }
//   //   else {
//   //     let evt = new CustomEvent(evtKey, data);
//   //     this.events[evtKey] = evt;
//   //     this.addEventListener(evtKey, fn);
//   //     super.dispatch(evt);
//   //   }
//   // }
//
//
// }
//
// // Editor Events //
// window.evt_editor = new EventManager({
//   editMode : false
// });
//
// document.onload = function(){
//   // var evt_editor = new EventManager("toggle");
//
//
// }
//
// evt_editor.addEventListener("toggle", function(){
//   $('#main_container').toggleClass('edit-mode');
//
//   if(this.data.editMode){
//     this.data.editMode = false;
//     $('#edit_mode_toggle').html('editor');
//   }
//   else {
//     this.data.editMode = true;
//     $('#edit_mode_toggle').html('exit');
//   }
// });


// Editor Events //
