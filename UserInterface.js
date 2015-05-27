/**
 * Created by jackyanjiaqi on 15-5-25.
 */
UserInterface = {}

UserInterface.create = function(){

}

UserInterface.obtainUp = function(e){
    var imagedata = mask_ctx.getImageData(e.x, e.y, 1, 1);
    var index = (imagedata.data[0]<<16 | imagedata.data[1]<<8 | imagedata.data[2]) - 1;
    BGGridManager.paintItem(index,'rgb(255,0,0)');
}

UserInterface.obtainDown = function(e){
    //var imagedata = mask_ctx.getImageData(e.x, e.y, 1, 1);
    //var index = (imagedata.data[0]<<16 | imagedata.data[1]<<8 | imagedata.data[2]) - 1;
    //var obj = indexTransfer(index,BGGridManager.column_count);
    //var neighbors = BGGridManager.neighborGridIndexes(obj[0],obj[1]);
    //neighbors.forEach(function(x){
    //    if(x){
    //        var index = indexTransfer(x[0],x[1],BGGridManager.column_count);
    //        BGGridManager.paintItem(index,'rgb(132,0,46)');
    //    }
    //});
    //改变网格大小
    RenderProxy._maplength -= 3;

    //1.判断点击元素是否可以触发轮转
    //轮转元素_使周围六个元素按照顺时针旋转
    //单位元素 触发UI界面 使用技能
    if(target.clickable()){
        var neighbors = target.neighborGridIndexes();
        neighbors.forEach(function(x){
            if(x){
                var neighbor_target = targets[x]
                if(neighbor_target.still){

                }
            }
        });
    }
    //开始轮转

    //2.判断轮转区域是否有元素阻止轮转
    //阻止轮转的元素_固定场景比如 树、房子、城市

    //按顺时针结算 消除元素
    //按如下单位计算
    //单位(5)+宿主元素(0) = 单位元素(5)
    //单位(1)+宿主元素(5) = 宿主元素(5)
    //技能 查看宿主元素的单位数量
    //按顺时针结算 元素位置

    //生成新元素

}

UserInterface.obtainMove = function(e){
    var imagedata = mask_ctx.getImageData(e.x, e.y, 1, 1);
    var index = (imagedata.data[0]<<16 | imagedata.data[1]<<8 | imagedata.data[2]) - 1;
    BGGridManager.paintItem(index,'rgb(255,0,0)');
}


