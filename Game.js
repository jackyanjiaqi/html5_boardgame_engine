/**
 * Created by jackyanjiaqi on 15-5-21.
 */
var canvas;
var ctx;
var mask_canvas;
var mask_ctx;
var img;
var layerManager = new LayerManager();
var _maplength = 70;
//记录用于生长的grow点坐标
var bggridObj;
var grid_xi,grid_yi;

window.onload = init;

function init(){
    Logger.log('init','main');
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    //初始化
    initFullScreenCanvas(canvas);
    //游戏循环
    gameLoop();
}

function initFullScreenCanvas(canvas){
    resizeCanvas(canvas);
    window.addEventListener("resize",function(){
        resizeCanvas(canvas);
    });
}
function resizeCanvas(canvas){
    Logger.log('resizeCanvas','main');
    canvas.width = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    mask_canvas = document.createElement("canvas");
    mask_canvas.width = canvas.width;
    mask_canvas.height = canvas.height;
    mask_ctx = mask_canvas.getContext('2d');
    mask_ctx.clearRect(0,0,mask_canvas.width,mask_canvas.height);

    grid_xi = Math.ceil(canvas.width/(_maplength*Math.tan(Math.PI/3)));
    grid_yi = Math.ceil(canvas.height/(_maplength*Math.tan(Math.PI/3)));
    img = document.createElement('IMG');
    img.onload = function() {
        initGame(grid_xi,grid_yi);
    }
    img.src='img/grass_land.jpg';

    //测试Indicator
    //createRandomIndicators();
}

function createRandomIndicators(){
    var mainTest = new Indicator(function(e){
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillRect(e.rawX,e.rawY,400,400);
    });
    Logger.log(mainTest.toString(),'test');
    for(var i = 0;i<4;i++){
        var child = new Indicator(function(e){
            ctx.fillStyle = 'rgb(0,0,255)';
            ctx.fillRect(e.rawX,e.rawY,40,140);
        },15,15);
        child.x = i*60 + 20;
        child.y = 20;
        mainTest.addChild(child);
        Logger.log(child.toString(),'test');
    }
    IndicatorManager.setCanvas(canvas).addIndicator(mainTest);
    Logger.tagAll();
}

function initGame(){
    Logger.log('initGame','main');
    //bggridObj = [];
    //BGGridManager.paint(bggridObj,arguments[1],arguments[0],_maplength);
    createRandomIndicators();
    //BGGridManager.xoffset = Math.round(canvas.width/2) - bggridObj.cx;
    //BGGridManager.yoffset = Math.round(canvas.height/2) - bggridObj.cy;
    //BGGridManager.paint();
    //var x = Math.ceil(bggridObj.length/2)-3;
    //var y = Math.ceil(bggridObj[0].length/2)+1;
    //
    //var neighbor = BGGridManager.neighborGridIndexes(
    //    x,
    //    y,
    //    bggridObj.length,bggridObj[0].length);
    //
    //for(var i=0;i<6;i++){
    //    var obj = neighbor[i];
    //    if(obj){
    //        alert("x:"+obj[0]+" y:"+obj[1]);
    //        RenderProxy.strokeMapInit(
    //            'rgba(143,143,143,1)',ctx,0,
    //            bggridObj[obj[0]][obj[1]][0].x,
    //            bggridObj[obj[0]][obj[1]][0].y
    //        )
    //    }
    //}
    //RenderProxy.paintMapInit(img,
    //    'rgb(143,143,0)',ctx,0,
    //    bggridObj[x][y][0].x,
    //    bggridObj[x][y][0].y
    //)
}

var isMouseDown = false;
var init_x = 0;
var init_y = 0;

function gameLoop(){
    canvas.addEventListener('mousemove',function(e){
        if(isMouseDown){
            moveBG(e.x - init_x,e.y - init_y);
            bgClear();
            initGame();
        }else{
            bgClear();
            //BGGridManager.paint();
            //UserInterface.obtainMove(e);
            if(IndicatorManager.indicators.length!=0){
                var indicator = IndicatorManager.indicators[0];
                indicator.x = e.x;
                indicator.y = e.y;
                indicator.paint();
            }
        }
    });
    canvas.addEventListener('mousedown',function (e){
        isMouseDown = true;
        init_x = e.x;
        init_y = e.y;

        IndicatorManager.indicators[0].vision = Indicator.VISION_INVISIBLE;
        //UserInterface.obtainUp()
    });

    canvas.addEventListener('mouseup',function (e){
        isMouseDown = false;
        bgClear();
        IndicatorManager.indicators[0].vision = Indicator.VISION_VISIBLE;

        //BGGridManager.paint();
        //UserInterface.obtainUp(e);
    });
}

function bgClear(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function moveBG(offsetx,offsety){
    BGGridManager.xoffset = offsetx;
    BGGridManager.yoffset = offsety;
}

function zoomIn(){
    _maplength += 5;
    initGame();
}

function zoomOut(){
    _maplength -= 5;
    initGame();
}


