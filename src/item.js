'use strict'
module.exports = class Item {
  constructor(name,sell_in,quality){
    this.name = name
    this.sell_in = sell_in
    this.quality = quality
  }
  tick(){
    console.log("base tick")
  }
}
