const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bgready = false;
let bg = new Image();
bg.src = 'bg.png'
bg.onload = function (){bgready = true;};

function doFrame(){
    updateRes();
    clearScreen()



    requestAnimationFrame(doFrame);
}
requestAnimationFrame(doFrame);

let screen = {res:342, w:0,h:0, x:0, y:0};
function updateRes(){

    let ratio = window.innerWidth/window.innerHeight;
        screen.w = screen.res*ratio;
        screen.h = screen.res;



    ctx.canvas.width = screen.w;
    ctx.canvas.height = screen.h;
    canvas.style.width = window.innerWidth+"px";
    canvas.style.height = window.innerHeight+"px";
}

function clearScreen(){
    if(bgready)
        ctx.drawImage(bg,0,0);

    ctx.fillStyle = "#ffdabc";
    ctx.beginPath();
    ctx.fillRect(0,0,screen.w,20);
    ctx.closePath();
}