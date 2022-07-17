

const math = function(value){

  // return value to chain calculations
  var _v = value;

  let toint = function(){
    return Math.floor(_v);
  }

  let rand = function(min, max) {
    let val = (Math.random() * max) + min;
    return math(val);
  }



  return {rand, toint, _: _v}
}




export {math as default};
