(function()
{
    var stage, textStage, form, input;
    var circles, textPixels, textFormed;
    var offsetX, offsetY, text;
    var colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];

    var btnMore, btnGo ;

    function init()
    {
        initStages();
        initBtn() ;
    }

    // Init Canvas
    function initStages()
    {
        offsetX = (window.innerWidth-600)/2;
        offsetY = (window.innerHeight-300)/2;
    }

    function initData()
    {

    }

    function initBtn()
    {
      btnMore = document.getElementById('playMore');
      btnMore.style.top = offsetY+50+'px';
      btnMore.style.left = offsetX+220+'px';

      btnGo = document.getElementById('goReg');
      btnGo.style.top = offsetY+200+'px';
      btnGo.style.left = offsetX+220+'px';
    }

    window.onload = function() { init() };
})();
