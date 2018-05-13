//(function()
//{
var stage, textStage, form, input;
var circles, textPixels, textFormed;
var offsetX, offsetY, text;
var colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];
var countPlay = 0 ;
var totalPlay = 5 ;
var timeleft = totalPlay ;

var btn ,btnSave,btnShow;

var isHaveWallet ;

function init()
{
    initData();

    initStages();
    initForm();
    initBtn() ;
    initText();
    initCircles();

    animate();
    addListeners();
}

// Init Canvas
function initStages()
{
    offsetX = (window.innerWidth-600)/2;
    offsetY = (window.innerHeight-300)/2;
    textStage = new createjs.Stage("text");
    textStage.canvas.width = 600;
    textStage.canvas.height = 200;

    stage = new createjs.Stage("stage");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

function initData()
{
  //localStorage.clear();
  var times = localStorage.getItem("timeleft");

  if (times != null)
  {
    timeleft = times;
  }

  console.log("time : " + timeleft);

  var p = document.getElementById('t');
  p.style.display = "inline"
  p.innerHTML="剩余次数:"+timeleft;

  countPlay = totalPlay - timeleft;

  //判定是否安装过钱包
  if (typeof(webExtensionWallet) !== "undefined")
  {
    isHaveWallet = true ;
    p.style.display = "none";
  }
  else
  {
    isHaveWallet = false ;
  }
}

function initForm() {
    form = document.getElementById('form');
    form.style.top = offsetY+200+'px';
    form.style.left = offsetX+'px';
    input = document.getElementById('inputText');
    form.style.display = "inline"
}

function initBtn()
{
  btn = document.getElementById('btnGo');
  btn.style.top = offsetY+350+'px';
  btn.style.left = offsetX+220+'px';
  btn.style.display = "inline"

  btnSave = document.getElementById('btnSave');
  btnSave.style.top = offsetY+350+'px';
  btnSave.style.left = offsetX+220+'px';
  btnSave.style.display = "inline"

  btnShow = document.getElementById('btnShow');
  btnShow.style.top = offsetY+450+'px';
  btnShow.style.left = offsetX+220+'px';
  btnShow.style.display = "inline"

  if(isHaveWallet === true)
  {
    btn.style.display = "none"
  }
  else
  {
    btnSave.style.display = "none"
    btnShow.style.display = "none"
  }
}

function initText() {
    text = new createjs.Text("t", "80px 'Source Sans Pro'", "#eee");
    text.textAlign = 'center';
    text.x = 300;
}

function initCircles() {
    circles = [];
    for(var i=0; i<1500; i++) {
        var circle = new createjs.Shape();
        var r = 7;
        var x = window.innerWidth*Math.random();
        var y = window.innerHeight*Math.random();
        var color = colors[Math.floor(i%colors.length)];
        var alpha = 0.2 + Math.random()*0.5;
        circle.alpha = alpha;
        circle.radius = r;
        circle.graphics.beginFill(color).drawCircle(0, 0, r);
        circle.x = x;
        circle.y = y;
        circles.push(circle);
        stage.addChild(circle);
        circle.movement = 'float';
        tweenCircle(circle);
    }
}


// animating circles
function animate() {
    stage.update();
    requestAnimationFrame(animate);
}

function tweenCircle(c, dir) {
    if(c.tween) c.tween.kill();
    if(dir == 'in') {
        c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 1, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
            c.movement = 'jiggle';
            tweenCircle(c);
        }});
    } else if(dir == 'out') {
        c.tween = TweenLite.to(c, 0.8, {x: window.innerWidth*Math.random(), y: window.innerHeight*Math.random(), ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5, scaleX: 1, scaleY: 1, onComplete: function() {
            c.movement = 'float';
            tweenCircle(c);
        }});
    } else {
        if(c.movement == 'float') {
            c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5,
                onComplete: function() {
                    tweenCircle(c);
                }});
        } else {
            c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                onComplete: function() {
                    tweenCircle(c);
                }});
        }
    }
}

function formText() {
    for(var i= 0, l=textPixels.length; i<l; i++) {
        circles[i].originX = offsetX + textPixels[i].x;
        circles[i].originY = offsetY + textPixels[i].y;
        tweenCircle(circles[i], 'in');
    }
    textFormed = true;
    if(textPixels.length < circles.length) {
        for(var j = textPixels.length; j<circles.length; j++) {
            circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});
        }
    }
}

function explode()
{

    for(var i= 0, l=textPixels.length; i<l; i++) {
        tweenCircle(circles[i], 'out');
    }
    if(textPixels.length < circles.length) {
        for(var j = textPixels.length; j<circles.length; j++) {
            circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 1});
        }
    }

}

// event handlers
function addListeners()
{

    form.addEventListener('submit', function(e)
    {
        e.preventDefault();
        //判定是否安装过钱包
        if (typeof(webExtensionWallet) !== "undefined")
        {
          isHaveWallet = true ;
          p.style.display = "none";
        }
        else
        {
          isHaveWallet = false ;
        }

        //没有安装钱包控制次数
        if( isHaveWallet === false )
        {
          if (countPlay>=totalPlay)
          {
            alert("游戏次数已满！");
            console.log("count2:"+countPlay);
            return;
          }
          countPlay++;
          console.log("count2:"+countPlay);
        }

        if(textFormed)
        {
            explode();
            if(input.value != '') {
                setTimeout(function() {
                    createText(input.value.toUpperCase());
                }, 810);
            } else {
                textFormed = false;
            }
        } else {
            createText(input.value.toUpperCase());
        }
    });
}

function createText(t)
{
    var fontSize = 860/(t.length);
    if (fontSize > 160) fontSize = 160;
    text.text = t;
    text.font = "900 "+fontSize+"px 'Source Sans Pro'";
    text.textAlign = 'center';
    text.x = 300;
    text.y = (172-fontSize)/2;
    textStage.addChild(text);
    textStage.update();

    var ctx = document.getElementById('text').getContext('2d');
    var pix = ctx.getImageData(0,0,1000,200).data;
    textPixels = [];
    for (var i = pix.length; i >= 0; i -= 4) {
        if (pix[i] != 0) {
            var x = (i / 4) % 1000;
            var y = Math.floor(Math.floor(i/1000)/4);

            if((x && x%8 == 0) && (y && y%8 == 0)) textPixels.push({x: x, y: y});
        }
    }

    formText();
}

var checkLength = function(dom, maxLength)
{
  var l = 0;
  for(var i=0; i<dom.value.length; i++)
  {
      if (/[\u4e00-\u9fa5]/.test(dom.value[i]))
      {
          l+=2;
          if(l > 16)
          {
            dom.value = dom.value.substr(0,i);
            break;
          }
      }
      else
      {
          l++;
      }
      if (l > maxLength)
      {
          dom.value = dom.value.substr(0,i);
          break;
      }
  }
};


window.onload = function() { init() };
//})();
