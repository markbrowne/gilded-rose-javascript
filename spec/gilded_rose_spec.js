describe("Gilded Rose", function() {

  it("should setup all new items with a name, a sell_in and a quality", function() {
    //update_quality();

    expect(items[0].name).toEqual('+5 Dexterity Vest')
    expect(items[0].sell_in).toEqual(10)
    expect(items[0].quality).toEqual(20)
  });

  describe("update_quality()", function() {

    it('it should degrade quality twice as fastOnce the sell_in days is less then zero', function(){
      items[0].sell_in = 0
      items[0].quality =2

      update_quality();

      expect(items[0].quality).toEqual(0)
    })

    it('should not let quality be a negative value', function(){
      update_quality();

      expect(items[0].quality).toEqual(0)
    })

    it('should increase aged brie in quality each update', function(){
      items[1].sell_in = 2
      items[1].quality =0

      update_quality();

      expect(items[1].quality).toEqual(1)
    })

    it('should never increase quality beyond 50.', function(){
      items[1].sell_in = 2
      items[1].quality =50

      update_quality();

      expect(items[1].quality).toEqual(50)
    })

    it('should not decrease qaulity or sell_in value for Sulfuras', function(){
      expect(items[3].quality).toEqual(80)
      expect(items[3].sell_in).toEqual(0)
    })

    it('should increase quality by 1 for Backstage Passes as the sell_in value decreases while sell_in is > 10', function(){
      items[4].sell_in = 11
      items[4].quality = 20

      update_quality();

      expect(items[4].quality).toEqual(21)
    })

    it('should increase quality by 2 for Backstage Passes as the sell_in value decreases while sell_in is <= 10', function(){
      items[4].sell_in = 10
      items[4].quality = 20

      update_quality();

      expect(items[4].quality).toEqual(22)
    })

    it('should increase quality by 2 for Backstage Passes as the sell_in value decreases while sell_in is <= 10 (starting at sell_in = 6)', function(){
      items[4].sell_in = 6
      items[4].quality = 20

      update_quality();

      expect(items[4].quality).toEqual(22)
    })

    it('should increase quality by 3 for Backstage Passes as the sell_in value decreases while sell_in is <= 5 (starting at sell_in = 5)', function(){
      items[4].sell_in = 5
      items[4].quality = 20

      update_quality();

      expect(items[4].quality).toEqual(23)
    })

    it('should be 0 when sell_in < 0)', function(){
      items[4].sell_in = 0
      items[4].quality = 20

      update_quality();

      expect(items[4].quality).toEqual(0)
    })

    it('should degrade quality of conjured items twice as fast', function(){
      items[5].sell_in = 5
      items[5].quality = 6

      update_quality();

      expect(items[5].quality).toEqual(4)
    })
  })
  describe('calculateDegradeRate()', function(){
    it('should return -1 for non special items', function(){
      expect(calculateDegradeRate('+5 Dexterity Vest', 10)).toEqual(-1)
    })
    it('should double degradeValue when sell_in < 0', function(){
      expect(calculateDegradeRate('+5 Dexterity Vest', -1)).toEqual(-2)
    })
    it('should return a positive number when name matches Aged Brie', function(){
      expect(calculateDegradeRate('Aged Brie', 1)).toEqual(1)
    })
    it('should return 2 for Backstage Passes as the sell_in value decreases while sell_in is <= 10', function(){
      expect(calculateDegradeRate('Backstage passes to a TAFKAL80ETC concert', 10)).toEqual(2)
    })
    it('should return 3 for Backstage Passes as the sell_in value decreases while sell_in is <= 5', function(){
      expect(calculateDegradeRate('Backstage passes to a TAFKAL80ETC concert', 5)).toEqual(3)
    })
    it('should return 0 for Backstage Passes as the sell_in value decreases while sell_in is < 0', function(){
      expect(calculateDegradeRate('Backstage passes to a TAFKAL80ETC concert', -1)).toEqual(0)
    })
    it('should return 2 for conjured items', function(){
      expect(calculateDegradeRate('Conjured Mana Cake', 1)).toEqual(2)
    })
  })
});
