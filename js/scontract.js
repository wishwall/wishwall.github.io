'use strict'

var SamContract = function()
{
  LocalContractStorage.defineProperty(this, "size");
};

SamContract.prototype =
{
  init : function()
  {
    this.size = 0 ;
    // this.name = name ;
    // this.count = count ;
    console.log('init: Blockchain.block.coinbase = ' + Blockchain.block.coinbase);
    console.log('init: Blockchain.block.hash = ' + Blockchain.block.hash);
    console.log('init: Blockchain.block.height = ' + Blockchain.block.height);
    console.log('init: Blockchain.transaction.from = ' + Blockchain.transaction.from);
    console.log('init: Blockchain.transaction.to = ' + Blockchain.transaction.to);
    console.log('init: Blockchain.transaction.value = ' + Blockchain.transaction.value);
    console.log('init: Blockchain.transaction.nonce = ' + Blockchain.transaction.nonce);
    console.log('init: Blockchain.transaction.hash = ' + Blockchain.transaction.hash);
  },

  set: function (name, value) {
        // Storing a string
        LocalContractStorage.set("na",name);
        // Storing a number (value)
        LocalContractStorage.set("value", value);

        this.size += 1 ;
    },

  get: function () {
            var name = LocalContractStorage.get("name");
            console.log("name:" + name)
            var value = LocalContractStorage.get("value");
            console.log("value:" + value)
    },

  len:function(){
      return this.size;
    },

  del: function () {
       var result = LocalContractStorage.del("name");
       console.log("del result:" + result)
   }
};

module.exports = SamContract;
