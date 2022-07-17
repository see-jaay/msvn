function randomString(len){
  var result           = '';
  var characters       = 'ab01cd23ef45gh67';
  var charactersLength = characters.length;
  for ( var i = 0; i < len; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
    charactersLength));
  }
  return result;
}
