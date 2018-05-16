# 星云许愿墙游戏介绍

  星云许愿墙是基于星云链开发的具有数据永久加密,永久存储特性的一款休闲小游戏。 
可以将自己的愿望存储在星云链上，永久的保存下去，只要人类不灭亡，你的愿望就不会消失！ 
为了你的愿望永远的保留下来，需要安装注册星云钱包产品就可以进行游戏啦。 
游戏基于浏览器开发需要下载并安装浏览器插件，具体的按照方法参见下面的介绍。

### 合约代码

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
};


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
      throw new Error("key / value exceed limit length");
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
          throw new Error("empty key");
      }
      return this.wish.get(fromAddr);
  }
};

module.exports = WishWall;


![图像找不到啦](https://github.com/wishwall/wishwall.github.io/blob/master/img/logo.png)
