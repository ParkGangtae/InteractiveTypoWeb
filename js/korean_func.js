import './korean.js';

var cgi_canvas = document.getElementById("cgi_canvas");
var cgictx = cgi_canvas.getContext("2d");
let max_radius = cgi_canvas.width/42;

export function drawVowel(cgi_list){
    var vowel = "";
    for(var i=0; i<cgi_list.length; i++){
      vowel += cgi_list[i];
    }
    if (vowel === "a"){  //ㅣ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(21*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "ab"){ //ㅏ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 1*max_radius, 7, 1);
        draw_l(23*max_radius, 7*max_radius, 1, 2);
    } else if (vowel == "aba"){ //ㅐ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 1*max_radius, 7, 1);
        draw_l(21*max_radius, 7*max_radius, 1, 1);
        draw_d(23*max_radius, 1*max_radius, 7, 1)
    } else if (vowel == "abb"){ //ㅑ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 1*max_radius, 7, 1);
        draw_l(23*max_radius, 5*max_radius, 1, 2);
        draw_l(23*max_radius, 9*max_radius, 1, 2);
    } else if (vowel == "abba"){ //ㅒ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 1*max_radius, 7, 1);
        draw_l(23*max_radius, 5*max_radius, 1, 2);
        draw_l(23*max_radius, 9*max_radius, 1, 2);
        draw_d(23*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "b"){ //.
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_l(21*max_radius, 7*max_radius, 1, 1);
    } else if (vowel == "ba"){ //ㅓ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(19*max_radius, 7*max_radius, 1, 2);
        draw_d(23*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "baa"){ //ㅔ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(19*max_radius, 7*max_radius, 1, 2);
        draw_d(21*max_radius, 3*max_radius, 5, 1);
        draw_d(25*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "bb"){ //..
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_l(19*max_radius, 7*max_radius, 1, 1);
        draw_l(23*max_radius, 7*max_radius, 1, 1);
    } else if (vowel == "bba"){ //ㅕ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(19*max_radius, 5*max_radius, 1, 2);
        draw_r(19*max_radius, 9*max_radius, 1, 2);
        draw_d(23*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "bbc"){ //ㅛ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 5*max_radius, 2, 1);
        draw_d(23*max_radius, 5*max_radius, 2, 1);
        draw_r(15*max_radius, 9*max_radius, 1, 7);
    } else if (vowel == "bbaa"){ //ㅖ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(17*max_radius, 5*max_radius, 1, 2);
        draw_r(17*max_radius, 9*max_radius, 1, 2);
        draw_d(19*max_radius, 3*max_radius, 5, 1);
        draw_d(23*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "bc"){ //ㅗ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(21*max_radius, 5*max_radius, 2, 1);
        draw_r(15*max_radius, 9*max_radius, 1, 7);
    } else if (vowel == "bca"){ //ㅚ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 5*max_radius, 2, 1);
        draw_r(15*max_radius, 9*max_radius, 1, 5);
        draw_d(25*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "bcab"){ //ㅘ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 5*max_radius, 2, 1);
        draw_r(15*max_radius, 9*max_radius, 1, 5);
        draw_d(25*max_radius, 1*max_radius, 7, 1);
        draw_r(27*max_radius, 7*max_radius, 1, 2);
    } else if (vowel == "bcaba"){ //ㅙ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 5*max_radius, 2, 1);
        draw_r(15*max_radius, 9*max_radius, 1, 5);
        draw_d(23*max_radius, 1*max_radius, 7, 1);
        draw_r(25*max_radius, 7*max_radius, 1, 3);
        draw_d(27*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "c"){ //ㅡ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(15*max_radius, 7*max_radius, 1, 7);
    } else if (vowel == "ca"){ //ㅢ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(15*max_radius, 9*max_radius, 1, 5);
        draw_d(25*max_radius, 1*max_radius, 7, 1)
    } else if (vowel == "cb"){ //ㅜ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(21*max_radius, 9*max_radius, 2, 1);
        draw_r(15*max_radius, 7*max_radius, 1, 7);
    } else if (vowel == "cba"){ //ㅟ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_d(19*max_radius, 9*max_radius, 2, 1);
        draw_r(15*max_radius, 7*max_radius, 1, 5);
        draw_d(25*max_radius, 1*max_radius, 7, 1);
    } else if (vowel == "cbb"){ //ㅠ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(15*max_radius, 7*max_radius, 1, 7);
        draw_d(19*max_radius, 9*max_radius, 2, 1);
        draw_d(23*max_radius, 9*max_radius, 2, 1);
    } else if (vowel == "cbba"){ //ㅝ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(15*max_radius, 5*max_radius, 1, 6);
        draw_d(19*max_radius, 7*max_radius, 3, 1);
        draw_r(23*max_radius, 9*max_radius, 1, 2);
        draw_d(25*max_radius, 1*max_radius, 7, 1);
    }
    else if (vowel == "cbbaa"){ //ㅞ
        cgictx.clearRect(0, 0, cgi_canvas.width, cgi_canvas.height);
        draw_r(13*max_radius, 5*max_radius, 1, 5);
        draw_d(17*max_radius, 7*max_radius, 3, 1);
        draw_r(21*max_radius, 9*max_radius, 1, 2);
        draw_d(23*max_radius, 3*max_radius, 5, 1);
        draw_d(27*max_radius, 1*max_radius, 7, 1);
    }
}

function draw_d(x, y, row, col) {
    let initx = x;
    let inity = y;
    let tx = x;
    let ty = y;
    let totalRows = row;
    let totalColumns = col;

    function draw_A(x, y){
        let distanceBtwCircles = max_radius*2;
        let radius = 0;
    
        function drawCircles(){
            cgictx.clearRect(x - max_radius, y - max_radius, max_radius * 2, max_radius * 2);
            cgictx.beginPath();
            cgictx.arc(x, y, radius, 0, Math.PI * 2, false);
            cgictx.fillStyle = "#55CBCD";
            cgictx.fill();
            cgictx.closePath();
    
            if (radius < max_radius) {
            radius += 18;
            requestAnimationFrame(drawCircles);
            } else {
                x += distanceBtwCircles;
                if (x < (totalColumns - 1) * distanceBtwCircles + initx){
                    draw_A(x, y);
                } else{
                    x = initx;
                    y += distanceBtwCircles;
                    if ((y <= Math.round(((totalRows - 1) * distanceBtwCircles + inity))) && (x <= ((totalColumns - 1) * distanceBtwCircles + initx))) {
                        draw_A(x, y);
                    }
                }
            }
        }
        drawCircles();
    }
    draw_A(tx, ty);
}

function draw_l(x, y, row, col) {
    let initx = x;
    let inity = y;
    let tx = x;
    let ty = y;
    let totalRows = row;
    let totalColumns = col;

    function draw_AB(x, y){
        let distanceBtwCircles = max_radius*2;
        let radius = 0;
    
        function drawCircles(){
            cgictx.clearRect(x - max_radius, y - max_radius, max_radius * 2, max_radius * 2);
            cgictx.beginPath();
            cgictx.arc(x, y, radius, 0, Math.PI * 2, false);
            cgictx.fillStyle = "#55CBCD";
            cgictx.fill();
            cgictx.closePath();
    
            if (radius < max_radius) {
            radius += 18;
            requestAnimationFrame(drawCircles);
            } else {
                x -= distanceBtwCircles;
                if (x >= -(totalColumns - 1) * distanceBtwCircles + initx){
                    draw_AB(x, y);
                } else{
                    x = initx;
                    y += distanceBtwCircles;
                    if ((y <= ((totalRows - 1) * distanceBtwCircles + inity)) && (x >= (-(totalColumns - 1) * distanceBtwCircles + initx))) {
                        draw_AB(x, y);
                    }
                }
            }
        }
        drawCircles();
    }
    draw_AB(tx, ty);
}

function draw_r(x, y, row, col) {
    let initx = x;
    let inity = y;
    let tx = x;
    let ty = y;
    let totalRows = row;
    let totalColumns = col;

    function draw_BA(x, y){
        let distanceBtwCircles = max_radius*2;
        let radius = 0;

    
        function drawCircles(){
            cgictx.clearRect(x - max_radius, y - max_radius, max_radius * 2, max_radius * 2);
            cgictx.beginPath();
            cgictx.arc(x, y, radius, 0, Math.PI * 2, false);
            cgictx.fillStyle = "#55CBCD";
            cgictx.fill();
            cgictx.closePath();
    
            if (radius < max_radius) {
            radius += 18;
            requestAnimationFrame(drawCircles);
            } else {
                x += distanceBtwCircles;
                if (x <= Math.round((totalColumns - 1) * distanceBtwCircles + initx)){
                    draw_BA(x, y);
                } else{
                    x = initx;
                    y += distanceBtwCircles;
                    if ((y <= ((totalRows - 1) * distanceBtwCircles + inity)) && (x <= Math.round(((totalColumns - 1) * distanceBtwCircles + initx)))) {
                        draw_BA(x, y);
                    }
                }
            }
        }
        drawCircles();
    }
    draw_BA(tx, ty);
}
