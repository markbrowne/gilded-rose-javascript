  describe("update_quality()", function() {

     it('it should degrade quality twice as fastOnce the sell_in days is less then zero', function(){
       items[0].sell_in = 0
       items[0].quality = 2
       update_quality();
       console.log( items[0].sell_in + ' ' + items[0].quality);
       expect(items[0].quality).toEqual(0)

     })
});
