const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bgCanvas = document.createElement('canvas');
let bgCtx = bgCanvas.getContext("2d");
bgCtx.canvas.width = 1000;
bgCtx.canvas.height = 342;

bgCtx.beginPath();
bgCtx.fillStyle = '#E7BD9A';
bgCtx.fillRect(0,0,bgCtx.canvas.width,bgCtx.canvas.height);
bgCtx.fillStyle = '#916D4F';
for(let i = 0; i<bgCtx.canvas.width; i++)
    for(let j = 0; j<bgCtx.canvas.height; j++){
        if((i+j)%2==0)bgCtx.fillRect(i,j,1,1);
    }
bgCtx.closePath();

function doFrame(){
    updateRes()
    requestAnimationFrame(doFrame);
    ctx.drawImage(bgCanvas,0,0)

}
requestAnimationFrame(doFrame);

const screen = {w:0,h:0, res:342};
function updateRes(){
    let ratio = window.innerWidth/window.innerHeight;
    let newW = screen.res*ratio;
    let newH= screen.res;
    if(newW!=screen.w || newH!=screen.h){
        screen.w = newW;
        screen.h = newH;
    }

    ctx.canvas.width = screen.w;
    ctx.canvas.height = screen.h;
    canvas.style.width = window.innerWidth+"px";
    canvas.style.height = window.innerHeight+"px";
}