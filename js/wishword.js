"use strict"

var WishWord = function(text)
{
  if(text)
  {
    var obj = JSON.parse(text);
    this.addr = obj.addr ;
    this.word = obj.word ;
  }
  else
  {
    this.addr  = "";
    this.word  = "";
  }
};

WishWord.prototype =
{
  toString: function()
  {
    return JSON.stringify(this);
  }
}


var WishWall = function()
{
  LocalContractStorage.defineMapProperty(this,"wish",
  {
    parse: function(text)
    {
      return new WishWord(text);
    },
    stringify: function(o)
    {
      return o.toString() ;
    }
  });
};

WishWall.prototype =
{
  init: function()
  {

  },

  save: function(word)
  {
    word = word.trim();

    if(word === "")
    {
      throw new Error("empty word or addr");
    }
    if (word.length > 64)
    {
      throw new Error("key / value exceed limit length")
    }

    var fromAddr = Blockchain.transaction.from;
    var wishWord = this.wish.get(fromAddr);

    if(wishWord)
    {
      //throw new Error("this word has exsist!");
    }
    else
    {
      wishWord = new WishWord();
    }
    wishWord.addr = fromAddr;
    wishWord.word = word;
    this.wish.put(fromAddr,wishWord);
  },

  get: function (fromAddr)
  {
      fromAddr = fromAddr.trim();
      if ( fromAddr === "" )
      {
          throw new Error("empty key")
      }
      return this.wish.get(fromAddr);
  }
};

module.exports = WishWall;
