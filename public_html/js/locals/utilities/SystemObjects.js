class Object {
  constructor(){
    this.$ = null;
    this.rect = null;
    // this.drawsyle
  }

  Update(dt){
    this.rect = this.$.getBoundingClientRect();
  }
}
