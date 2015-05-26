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
var debug = false;
var grid_xi,grid_yi;

window.onload = init;

function init(){
    dlog("init");
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    //初始化
    initFullScreenCanvas(canvas);
    //游戏循环
    gameLoop();
}

function resizeCanvas(canvas){
    dlog('resizeCanvas');
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
    //initGame(grid_xi,grid_yi);
    img = document.createElement('IMG');
    img.onload = function() {
        initGame(grid_xi,grid_yi);
    }
    img.src='img/grass_land.jpg';
}

function initGame(){
    dlog('initGame');
    bggridObj = [];
    BGGridManager.paint(bggridObj,arguments[1],arguments[0],_maplength);

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

function initFullScreenCanvas(canvas){
    resizeCanvas(canvas);
    window.addEventListener("resize",function(){
        resizeCanvas(canvas);
    });
}

function gameLoop(){
    canvas.addEventListener('mousemove',function(e){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        BGGridManager.paint();
        UserInterface.obtainMove(e);
        //paintBGGrid(grid_xi,grid_yi,null);
        //layerManager.repaint();
        //paintLayer1();
        //paintLayerMouse(e);
//                repaintGamerViewCenter(canvas.width/2,canvas.height/2);
//                repaintGamerViewCenter(e.pageX, e.pageY);
    });
    canvas.addEventListener('mousedown',function (e){
        UserInterface.obtainDown(e);
    });
    canvas.addEventListener('mouseup',function (e){
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        //paintBGGrid(grid_xi,grid_yi,null);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        BGGridManager.paint();
        UserInterface.obtainUp(e);
    });
}

function dlog(str){
    if(debug){
        alert(str);
    }
}
