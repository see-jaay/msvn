
class V3 {}
class Node {}
class Vine {}

class VineArt {
  construct(){
    this.vines = [];

  }

  Init(){

  }

  Update(dt, data = null){
    if(data){

    }

    for(let i = 0; i < this.vines.length; i++){
      this.vines[i].Update(dt);
    }
  }

  CreateVine(){

  }
}
