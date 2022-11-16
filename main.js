const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// let assets = {bg:new Image()};
// let assetLoaded = {};
// assets['bg'].src = 'bg.png'
// let topCircle = new Image(); topCircle.src = 'topCircleThing.png'
// assets['bg'].onload = function (){bgready = true;};

let assetLocations =[['bg','bg.png'],['topBar','topBar.png'],['topRight','topCircleThing.png']];
let assets = {};
for(let i = 0; i<assetLocations.length; i++){
    let assetObject = {image:new Image(), loaded:false};
    assetObject['image'].src = assetLocations[i][1];
    assetObject['image'].onload = function (){assetObject['loaded'] = true;};
    assets[assetLocations[i][0]] = assetObject;
}

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
    if(assets['bg'].loaded)
        ctx.drawImage(assets['bg']['image'],0,0);

    ctx.fillStyle = "#ffdabc";
    ctx.beginPath();
    ctx.fillRect(0,0,screen.w,20);
    ctx.closePath();

    if(assets['topBar'].loaded)
        ctx.drawImage(assets['topBar']['image'],0,0);
    if(assets['topRight'].loaded)
        ctx.drawImage(assets['topRight']['image'],screen.w-5,0);

}