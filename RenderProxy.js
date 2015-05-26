/**
 * Created by jackyanjiaqi on 15-5-21.
 */

//var _maptile = [null,null,null,null,null,null];
//var _maplength;
RenderProxy = {};
RenderProxy._maptile = [null,null,null,null,null,null];
RenderProxy._maplength = 35;
RenderProxy._maplinewidth = 2;
RenderProxy._fillColor = 'rgb(213,255,200)';
RenderProxy._strokeColor = 'rgb(16,14,15)';

RenderProxy.growPaint = function (ctx,from,fillColor,strokeColor,text,img){
    RenderProxy.paintMapInit(ctx,(from+4)%6,RenderProxy._maptile[from].x,RenderProxy._maptile[from].y,
        RenderProxy._maplength,
        RenderProxy._maplinewidth,
        fillColor,strokeColor,text,img);
}

//重绘
RenderProxy.rePaint = function (ctx,fillColor,strokeColor,text,img){
    RenderProxy.paintMapInit(ctx,
        0,RenderProxy._maptile[0].x,RenderProxy._maptile[0].y,
        RenderProxy._maplength,
        RenderProxy._maplinewidth,
        fillColor,strokeColor,text,img);
}

RenderProxy.growStroke = function (strokeStyle,ctx,from){
    RenderProxy.strokeMapInit(strokeStyle,ctx,(from+4)%6,RenderProxy._maptile[from].x,RenderProxy._maptile[from].y,_maplength);
}

RenderProxy.paintMapInit = function (ctx,from,initx,inity,length,lineWidth,fillColor,strokeColor,text,img){
    if(!ctx){
        return;
    }
    if(length){
        RenderProxy._maplength = length;
    }
    if(lineWidth){
        RenderProxy._maplinewidth = lineWidth;
    }
    if(fillColor){
        RenderProxy._fillColor = fillColor;
    }
    if(strokeColor){
        RenderProxy._strokeColor = strokeColor;
    }
    ctx.fillStyle = RenderProxy._fillColor;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = RenderProxy._strokeColor;
    ctx.lineWidth = RenderProxy._maplinewidth;

//            ctx.arc(initx,inity,10,0,2*Math.PI,false);
    ctx.save();
    ctx.moveTo(initx,inity);
    ctx.beginPath();
    var cx = initx;
    var cy = inity;
    for(var i=from;i<from+6;i++){
        var dx = Math.cos(-Math.PI*(i%6)/3);
        var dy = Math.sin(Math.PI*(i%6)/3);
        cx = cx + dx * RenderProxy._maplength;
        cy = cy + dy * RenderProxy._maplength;
//      ctx.strokeText('map:' + (i+1)%6,cx-50,cy-10);
//      ctx.strokeText('x:'+cx,cx-50,cy+20);
//      ctx.strokeText('y:'+cy,cx-50,cy+50);
        ctx.lineTo(cx,cy);
        RenderProxy._maptile[(i+1)%6] = new Object();
        RenderProxy._maptile[(i+1)%6].x = cx;
        RenderProxy._maptile[(i+1)%6].y = cy;
    }
    ctx.closePath();

    //画图片
    if(img){
        ctx.fill();
        ctx.clip();
        ctx.drawImage(img,
            RenderProxy._maptile[5].x,
            RenderProxy._maptile[0].y,
            RenderProxy._maptile[2].x - RenderProxy._maptile[5].x,
            RenderProxy._maptile[4].y - RenderProxy._maptile[0].y);
    }else {
        //画纯色
        ctx.fill();
    }
    //画边
    ctx.stroke();

    /*计算文字位置*/
    if(text){
        var tx = RenderProxy._maptile[5].x + _maplength;
        var ty = RenderProxy._maptile[5].y;
        ctx.font = "48pt bold";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText(text,tx,ty);
    }
    ctx.restore();
}

RenderProxy.strokeMapInit = function(strokeStyle,ctx,from,initx,inity,length,lineWidth){
    if(!ctx){
        return;
    }
    if(length) {
        RenderProxy._maplength = length;
    }
    if(lineWidth){
        RenderProxy._maplinewidth = lineWidth;
    }
    ctx.fillStyle = "rgb(213,255,200)";
    ctx.lineJoin = 'round';
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = RenderProxy._maplinewidth;

    ctx.save();
    ctx.moveTo(initx,inity);
    ctx.beginPath();
    var cx = initx;
    var cy = inity;
    for(var i=from;i<from+6;i++){
        var dx = Math.cos(-Math.PI*(i%6)/3);
        var dy = Math.sin(Math.PI*(i%6)/3);
        cx = cx + dx * RenderProxy._maplength;
        cy = cy + dy * RenderProxy._maplength;
//                ctx.strokeText('map:' + (i+1)%6,cx-50,cy-10);
//                ctx.strokeText('x:'+cx,cx-50,cy+20);
//                ctx.strokeText('y:'+cy,cx-50,cy+50);
        ctx.lineTo(cx,cy);
        RenderProxy._maptile[(i+1)%6] = new Object();
        RenderProxy._maptile[(i+1)%6].x = cx;
        RenderProxy._maptile[(i+1)%6].y = cy;

    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

/*计算相邻单位的算法*/
function neighborGridObj(target_row,target_column,row_max,column_max){
    var neighbor = [];
    if( target_column%2 ==1 ){
        //上
        if(isSafeIndex(target_row-1,target_column)){
            neighbor.push([target_row-1,target_column]);
        }
        //上右
        if(isSafeIndex(target_row-1,target_column+1)){
            neighbor.push([target_row-1,target_column+1]);
        }
        //自右
        if(isSafeIndex(target_row,target_column+1)){
            neighbor.push([target_row,target_column+1]);
        }
        //下
        if(isSafeIndex(target_row+1,target_column)){
            neighbor.push([target_row+1,target_column]);
        }
        //自左
        if(isSafeIndex(target_row,target_column-1)){
            neighbor.push([target_row,target_column-1]);
        }
        //上左
        if(isSafeIndex(target_row-1,target_column-1)){
            neighbor.push([target_row-1,target_column-1]);
        }
    }else {
        //上
        if(isSafeIndex(target_row-1,target_column)){
            neighbor.push([target_row-1,target_column]);
        }
        //自右
        if(isSafeIndex(target_row,target_column+1)){
            neighbor.push([target_row,target_column+1]);
        }
        //下右
        if(isSafeIndex(target_row+1,target_column+1)){
            neighbor.push([target_row+1,target_column+1]);
        }
        //下
        if(isSafeIndex(target_row+1,target_column)){
            neighbor.push([target_row+1,target_column]);
        }
        //下左
        if(isSafeIndex(target_row+1,target_column-1)){
            neighbor.push([target_row+1,target_column-1]);
        }
        //自左
        if(isSafeIndex(target_row,target_column-1)){
            neighbor.push([target_row,target_column-1]);
        }
    }
    return neighbor;

    function isSafeIndex(xi,yi){
        if(xi<0 || xi>=row_max){
            return false;
        }else
        if(yi<0 || yi>=column_max){
            return false;
        }else
        return true;
    }
}



/* 画背景网格 */
function paintBGGrid(length,row_max,colum_max,bggridObj){
    var strokeStyle = 'rgba(233,233,233,0.5)';
    var last = 4;
    /*行*/
    for(var row = 0;row < row_max;row++) {
        /*列*/
        var index = 0;
        for (var colum = 0; colum < colum_max; colum++) {
            if (row == 0 && colum == 0) {
                strokeMapInit(strokeStyle, ctx, 0, 0, 0, length);
                bggridPush();
            } else if (colum == 0) {
                growStroke(strokeStyle, ctx, 3);
                bggridPush();
            } else {
                if (colum == 1) {
                    //判断last 上一次的反方向
                    index = (last + 3) % 6;
                } else {
                    if (index < 3) {
                        index = 3 - index;
                    } else {
                        index = 9 - index;
                    }
                }
                if (colum == colum_max - 1) {
                    last = index;
                }
                growStroke(strokeStyle, ctx, index);
                bggridPush();
            }
        }
    }
    //很重要的参考结构 用于判断一个六边形单位的六个临位六边形 上边的六边形极其前后 下边的六边形极其
    function bggridPush(){
        //鸭式辩形的一个应用
        if(bggridObj && bggridObj.push){
            var obj = new Object();
            for(var i=0;i<6;i++){
                obj[i] = new Object();
                obj[i].x = _maptile[i].x;
                obj[i].y = _maptile[i].y;
            }
            obj.cx = _maptile[5].x + _maplength;
            obj.cy = _maptile[5].y;
            bggridObj.push(obj);
            dlog("count:"+bggridObj.length+
            "\nlast:"+last+
            "\nindex:"+index+
            "\nrow:"+row+
            "\nrow_max:"+row_max+
            "\ncolumn:"+colum+
            "\ncolum_max:"+colum_max
            );
        }
    }
}