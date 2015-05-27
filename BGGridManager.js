/**
 * Created by jackyanjiaqi on 15-5-25.
 */
BGGridManager = {}

BGGridManager.data;
BGGridManager.self = this;

//默认3行4列的矩阵
BGGridManager.row_count = 3;
BGGridManager.column_count = 4;
BGGridManager.xoffset = 0;
BGGridManager.yoffset = 0;
BGGridManager.strokeStyle = 'rgba(233,233,233,0.5)';

BGGridManager.paintItem = function(itemindex,strokeStyle,length){
    if(BGGridManager.data){
        var target = BGGridManager.data[itemindex];
        RenderProxy.strokeMapInit(strokeStyle || BGGridManager.strokeStyle, ctx,
            0, target[0].x, target[0].y, length || RenderProxy._maplength);
    }
}

BGGridManager.paint = function(bggridObj,row_max,column_max,length,xoffset,yoffset) {
    var isDataChanged = false;
    if(bggridObj){
        BGGridManager.data = bggridObj;
        isDataChanged = true;
    }else{
        isDataChanged = false;
    }
    var draw_length = length || RenderProxy._maplength;
    BGGridManager.xoffset = xoffset || BGGridManager.xoffset;
    BGGridManager.yoffset = yoffset || BGGridManager.yoffset;
    BGGridManager.row_count = row_max || BGGridManager.row_count;
    BGGridManager.column_count = column_max || BGGridManager.column_count;

    for (var row = 0; row < BGGridManager.row_count; row++) {
        //var bggridRowObj = [];
        var index = 2;
        for (var column = 0; column < BGGridManager.column_count; column++) {
            if(column == 0){
                RenderProxy.strokeMapInit(BGGridManager.strokeStyle, ctx, 0, BGGridManager.xoffset, row * draw_length * Math.tan(Math.PI/3) + BGGridManager.yoffset, draw_length);
            }else{
                index = 3 - index;
                RenderProxy.growStroke(BGGridManager.strokeStyle,ctx,index);
            }
            if(isDataChanged){
                bggridPushColumn(BGGridManager.data);
            }
        }
        //if(isDataChanged){
        //    bggridPushRow(BGGridManager.data,bggridRowObj);
        //}
    }

    if(isDataChanged) {
        BGGridManager.data.
            x_max_length = BGGridManager.data[BGGridManager.row_count - 1][BGGridManager.column_count - 1][2].x;
        BGGridManager.data.
            y_max_length = BGGridManager.data[BGGridManager.row_count - 1][BGGridManager.column_count - 1][4].y;

        dlog('row_length:' + BGGridManager.data.length +
        '\ncolumn_length:' + BGGridManager.data[0].length +
        '\nx_max_length:' + BGGridManager.data.x_max_length +
        '\ny_max_length:' + BGGridManager.data.y_max_length);
    }

    //插入列元素
    function bggridPushColumn(rowArray){
        //鸭式辩形的一个应用
        if(rowArray && rowArray.push){
            var obj = new Object();
            for(var i=0;i<6;i++){
                obj[i] = new Object();
                obj[i].x = RenderProxy._maptile[i].x;
                obj[i].y = RenderProxy._maptile[i].y;
            }
            obj.cx = RenderProxy._maptile[5].x + draw_length;
            obj.cy = RenderProxy._maptile[5].y;
            rowArray.push(obj);

            var num_total = indexTransfer(row,column,BGGridManager.column_count) + 1;
            RenderProxy.rePaint(mask_ctx,numberToColor(num_total));

            dlog("count:"+rowArray.length+
                "\nindex:"+index+
                "\nrow:"+row+
                "\nrow_max:"+BGGridManager.row_count+
                "\ncolumn:"+column+
                "\ncolumn_max:"+BGGridManager.column_count
            );
        }
    }

    //插入行元素
    function bggridPushRow(bggridObj,rowObj) {
        if (bggridObj && bggridObj.push) {
            bggridObj.push(rowObj);
        }
    }
}

/*计算相邻单位的算法*/
BGGridManager.neighborGridIndexes = function(target_row,target_column,row_max,column_max){
    var neighbor = [];

    var row_max = row_max || BGGridManager.row_count;
    var column_max = column_max || BGGridManager.column_count;

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
            neighbor.push(null);
            return false;
        }else
        if(yi<0 || yi>=column_max){
            neighbor.push(null);
            return false;
        }else
            return true;
    }
}