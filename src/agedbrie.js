'use strict'
var Item = require('./item');

module.exports = class Brie extends Item {
  constructor(name,sell_in,quality){
    super(name,sell_in,quality)
  }
  tick(){
    return "brie tick"
  }
}
