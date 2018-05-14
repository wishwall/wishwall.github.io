(function()
{
    var stage, textStage, form, input;
    var circles, textPixels, textFormed;
    var offsetX, offsetY, text;
    var colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];

    var btnOpen, btnSave ;

    function init() {
      initStages();
      initBtn();
    }

    // Init Canvas
    function initStages() {
      offsetX = (window.innerWidth - 600) / 2;
      offsetY = (window.innerHeight - 300) / 2;
    }

    function initData()
    {

    }

    function initBtn()
    {
      btnOpen = document.getElementById('open');
      btnOpen.style.top = offsetY+50+'px';
      btnOpen.style.left = offsetX+220+'px';

      btnSave = document.getElementById('save');
      btnSave.style.top = offsetY+200+'px';
      btnSave.style.left = offsetX+220+'px';
    }

    window.onload = function() { init() };
})();
