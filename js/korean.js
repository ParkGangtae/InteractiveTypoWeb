import {drawVowel} from './korean_func.js';


// setTimeout(() => {
//   const loadingScreen = document.getElementById('loading-screen');
//   loadingScreen.style.display = 'none';
// }, 2000);

document.addEventListener("DOMContentLoaded", function () {
  // canvas 요소 가져오기
  var canvas = document.getElementById("canvas-kor");
  var main_window = document.getElementById("main_window");
  var cgi_canvas = document.getElementById("cgi_canvas");

  var ctx = canvas.getContext("2d"); // 2D 그래픽 컨텍스트 가져오기
  var windowCtx = main_window.getContext("2d");
  var cgictx = cgi_canvas.getContext("2d");

  ctx.fillStyle = "#ECECEC";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var humanBtn = document.querySelector('.human');
  var skyBtn = document.querySelector('.sky');
  var groundBtn = document.querySelector('.ground');

  const changeSceneBtn = document.getElementById('changeSceneBtn');
  changeSceneBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

  var state = 0; //시작하면 1, 멈추면 0
  var cgi_list = [];
  var timer;

  baseCircle();

  function baseCircle() {
    let max_radius = main_window.width/42;
    let distanceBtwCircles = max_radius*2;
    let totalColumns = 21;
    let totalRows = 7;

    function drawFrame(x, y) {
      let radius = 0;
  
      function drawCircles(){
        windowCtx.clearRect(x - max_radius, y - max_radius, max_radius * 2, max_radius * 2);
        windowCtx.beginPath();
        windowCtx.arc(x, y, radius, 0, Math.PI * 2, false);
        windowCtx.fillStyle = "#FFDBCC";
        windowCtx.fill();
        windowCtx.closePath();

        if (radius < max_radius) {
          radius += 18;
          requestAnimationFrame(drawCircles);
        } else {
          // 현재 원이 완전히 그려진 후에 다음 원을 그릴 위치 계산
          x += distanceBtwCircles;
          if (x < (totalColumns - 1) * distanceBtwCircles + max_radius){
            drawFrame(x, y);
          } else{
            x = max_radius;
            y += distanceBtwCircles;

            if (y < totalRows * distanceBtwCircles && x < (totalColumns - 1) * distanceBtwCircles + max_radius) {
              // 가로로 20개의 원이 그려질 때까지 반복 호출
              drawFrame(x, y);
            }
          }
        }
      }

      drawCircles();
      
    }
  
    drawFrame(max_radius, max_radius); // 초기 호출

  }

  function initTimer() {
    timer = setTimeout(function () {
      resetTimer();
    }, 3000);
  }

  function startTimer() {
    timer = setTimeout(function () {
      resetTimer();
    }, 3000);
  }

  function resetTimer() {
    console.log('//////END//////');
    cgi_list = [];
    clearTimeout(timer);
    state = 0;
  }

  function btn_resetTimer() {
    clearTimeout(timer);
    startTimer();
  }
 
  humanBtn.addEventListener('click', () => {
    cgi_list.push('a');
    startOrResetTimer(1);
    drawVowel(cgi_list);

  });

  skyBtn.addEventListener('click', () => {
    cgi_list.push('b');
    startOrResetTimer(2);
    drawVowel(cgi_list);

  });

  groundBtn.addEventListener('click', () => {
    cgi_list.push('c');
    startOrResetTimer(3);
    drawVowel(cgi_list);

  });

  function startOrResetTimer(num_cgi) {
    setTimeout(() => {
      if (state == 0){
        state = 1;
        initTimer();
      } else{
        if (cgi_list.length == 5){
          resetTimer();
        } else{
          btn_resetTimer();
        }
      }
    }, 1000);
    
  }

});