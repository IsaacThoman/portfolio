const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// let assets = {bg:new Image()};
// let assetLoaded = {};
// assets['bg'].src = 'bg.png'
// let topCircle = new Image(); topCircle.src = 'topCircleThing.png'
// assets['bg'].onload = function (){bgready = true;};

let assetLocations =[['bg','bg.png'],['dropdownBG','dropdownBG.png'],['dropdownText0','dropdownText0.png']];
let mouse = {x:50, y:50, down:false, downX:0, downY:0, downX: 0, downY: 0};
let assets = {};
for(let i = 0; i<assetLocations.length; i++){
    let assetObject = {image:new Image(), loaded:false};
    assetObject['image'].src = assetLocations[i][1];
    assetObject['image'].onload = function (){assetObject['loaded'] = true;};
    assets[assetLocations[i][0]] = assetObject;
}

function doFrame(){
    updateRes();
    clearScreen();
    drawWindows();
    drawTopBar()

    handleInput()


    requestAnimationFrame(doFrame);
}
requestAnimationFrame(doFrame);

const windows = [];
const mainWindow = {
    visible: true,
    x: 0,
    y: 0,
    w: 0,
    h:0,
    name: 'Home',
    content:[
        {
         name:'heading',
         render:function(){
             ctx.font = '16px WindyCity'
             ctx.fillStyle = '#000000'
             ctx.textBaseline = 'top'
             ctx.fillText('Hello! Welcome to my portfolio.', mainWindow.x+12, mainWindow.y+26)

             ctx.font = '16px ChiKareGo'
             ctx.fillStyle = '#000000'
             ctx.textBaseline = 'top'
             ctx.fillText('this definitely isn\'t not a portfolio.', mainWindow.x+12, mainWindow.y+39)


         }
        }
    ],
    update: function(){
        this.x = 70;
        this.y = 60;
        this.w=Math.floor(screen.w-140);
        this.h=Math.floor(screen.h-80);
        this.visible = pageOn == 1;
    }
};


windows.push(mainWindow);



function drawWindows(){
for(let i in windows){
    let w = windows[i];
    w.update();
    if(!w.visible)continue;
    ctx.beginPath();
    ctx.fillStyle = '#FFDABC';
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.fillStyle = '#000000';
    ctx.fillRect(w.x, w.y, w.w, 1);
    ctx.fillRect(w.x, w.y, 1, w.h);
    ctx.fillRect(w.x+w.w, w.y, 2, w.h);
    ctx.fillRect(w.x, w.y+w.h, w.w, 2);

    //bar
    ctx.fillRect(w.x, w.y+16, w.w, 1);
    ctx.fillRect(w.x+9, w.y+3, 11, 11);
    ctx.fillStyle = '#FFDABC';
    ctx.fillRect(w.x+10, w.y+4, 9, 9);
    ctx.closePath();

    ctx.font = '16px ChiKareGo'
    ctx.fillStyle = '#000000'
    ctx.textBaseline = 'top'
    ctx.fillText(w.name, Math.floor((w.x*2+w.w)/2 - ctx.measureText(w.name).width/2), w.y)

    for(let c in w.content){
        w.content[c].render();
    }
}
//16

}

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

let pageOn = 1;
let hoverLength = 0;
let pageHoveredOn = 1;
let showDropdown = false;


function handleInput(){
    if(mouse.x<364 && mouse.y<20 || (mouse.downX<364 && mouse.downY<20 && mouse.down)){
        let minDist = Infinity;
        let closestIndex = -1;
        for(let i in underlinePos){
            let dist = Math.abs(mouse.x - (underlinePos[i].x*2 + underlinePos[i].w)/2);
            if(dist<minDist){
                minDist = dist;
                closestIndex = i;
            }
        }
        if(pageHoveredOn!=closestIndex){
            hoverLength = 0;
            pageHoveredOn = closestIndex;
        }

        hoverLength = hoverLength + (1-hoverLength)*0.2;
    }else{
        hoverLength = hoverLength + (0-hoverLength)*0.4;
    }
   // console.log(mouse.x)
    let mouseDownOnBar = (mouse.downX<364 && mouse.downY<20 &&mouse.down);
   // let deadband = (Math.sqrt(Math.pow(mouse.downX - mouse.x,2)+Math.pow(mouse.downY - mouse.y,2)) > 1)
    showDropdown = mouseDownOnBar;


}
function mouseUpHandler(e){
    mouse.down = false; mouse.upX = mouse.x; mouse.upY = mouse.y;
    if(mouse.upX<364 && mouse.upY<20){
        if(pageHoveredOn!=0) pageOn = pageHoveredOn;

    }

}

function mouseMoveHandler(e){
    mouse.x = Math.floor(e.clientX/window.innerWidth*screen.w);
    mouse.y = Math.floor(e.clientY/window.innerHeight*screen.h);
}
function mouseDownHandler(e){mouse.down = true; mouse.downX = mouse.x; mouse.downY = mouse.y;}


const underlinePos = [{x:10,w:82},{x:109, w:33},{x:156,w:48},{x:218,w:39},{x:271,w:88}];
function clearScreen(){
    if(assets['bg'].loaded)
        ctx.drawImage(assets['bg']['image'],0,0);

}
function drawTopBar(){

    ctx.fillStyle = "#ffdabc";
    ctx.beginPath();
    ctx.fillRect(0,0,screen.w,20);
    ctx.closePath();

    // if(assets['topBar'].loaded)
    //     ctx.drawImage(assets['topBar']['image'],0,0);
    // if(assets['topRight'].loaded)
    //     ctx.drawImage(assets['topRight']['image'],Math.floor(screen.w-5),0);

    if(showDropdown) {
        let dropdownX =  underlinePos[pageHoveredOn].x;
        let dropdownY = 19;
        if (assets['dropdownBG'].loaded && pageHoveredOn ==0 )
            ctx.drawImage(assets['dropdownBG']['image'],dropdownX, dropdownY);

        if(pageHoveredOn == 0 && assets['dropdownText0'].loaded){
            ctx.drawImage(assets['dropdownText0']['image'], dropdownX, dropdownY);
        }
    }
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.fillRect(underlinePos[pageOn]['x'],16,underlinePos[pageOn]['w'],1);
    let center = (underlinePos[pageHoveredOn].x*2 + underlinePos[pageHoveredOn].w)/2;
    let left = center - underlinePos[pageHoveredOn].w/2*hoverLength;
    ctx.fillRect(left,16,underlinePos[pageHoveredOn]['w'] * hoverLength,1);


    ctx.font = '16px ChiKareGo'
    ctx.fillStyle = '#000000'
    ctx.textBaseline = 'top'
    ctx.fillText('home',109,1);
    ctx.fillText('robotics',156,1);
    ctx.fillText('games',218,1);
    ctx.fillText('other projects',271,1);
    ctx.fillText('Isaac Thoman',11,1);
    ctx.fillRect(0,19,1000,1);
    let cornerLengths = [5,3,2,1,1];
    for(let i = 0; i<cornerLengths.length; i++){
        ctx.fillRect(0,i,cornerLengths[i],1);
        ctx.fillRect(Math.floor(screen.w) - cornerLengths[i],i,5,1);
    }

    ctx.closePath();
}


document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
