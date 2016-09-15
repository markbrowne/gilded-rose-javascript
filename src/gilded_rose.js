'use strict'

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const MaxQuality = 50;
const MinQuality = 0;


const Rules = {};
Rules['Aged Brie'] = {sell : 1, quality : 1};
Rules['Sulfuras, Hand of Ragnaros'] = {sell : 0, quality : 0};
Rules['Backstage passes to a TAFKAL80ETC concert'] = {sell : 1, quality : {
                                                                            10 : 2,
                                                                            9 : 2,
                                                                            8 : 2,
                                                                            7 : 2,
                                                                            6 : 2,
                                                                            5 : 3,
                                                                            4 : 3,
                                                                            3 : 3,
                                                                            2 : 3,
                                                                            1 : 3,
                                                                            0 : 0}};
Rules['Conjured Mana Cake'] = {sell : 1, quality : -2};


var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function MinMaxQuality(quality){
    if(quality >= 0 && quality < 50){
        return true;
    }else{
        return false;
    }
}

function update_quality() {
  for(var item in items){
    var ItemRule = Rules[items[item].name];

    if(ItemRule != undefined){
      if(ItemRule.quality[items[item].sell_in] != undefined){
        if(items[item].sell_in != 0){
          items[item].quality += (MinMaxQuality(items[item].quality) ? ItemRule.quality[items[item].sell_in] : 0)
        }else{
          items[item].quality = 0
        }
      }else if(ItemRule.quality[0] != undefined){
        items[item].quality += (MinMaxQuality(items[item].quality) ? 1 : 0);
      }else{
        items[item].quality += (MinMaxQuality(items[item].quality) ? ItemRule.quality : 0)
      }
      items[item].sell_in -= ItemRule.sell;
    }else{
      items[item].sell_in -= 1;
      if(items[item].quality != MinQuality){
        if(MinMaxQuality(items[item].quality)){
          items[item].quality -= 2;
        }else{
          items[item].quality -= 1;
        }
      }
    }
  }
  /*
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          if(items[i].name == 'Conjured Mana Cake'){
            items[i].quality = items[i].quality - 2
          }
          else{
            items[i].quality = items[i].quality - 1
          }
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality += 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }

    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }

    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }*/
}



function calculateDegradeRate(name, sell_in){
  let degradeValue = -1

  name == 'Aged Brie'
    ? degradeValue = 1 : undefined

  if(name == 'Backstage passes to a TAFKAL80ETC concert'){
    degradeValue = 1
    sell_in < 0 ? degradeValue = degradeValue * 0 :
      sell_in <= 5 ? degradeValue = degradeValue * 3 :
        sell_in <= 10 ? degradeValue = degradeValue * 2 : undefined
  }

  name == 'Conjured Mana Cake' ? degradeValue = 2 : undefined

  if(sell_in < 0){ degradeValue= degradeValue * 2}

  return degradeValue
}
