/**
 * Created by jackyanjiaqi on 15-5-22.
 */
//多边形 主要管理 边 和对应法向量
function Polygon(){
    this.openDirections = [];
    if(arguments.length!=0){
        this.openDirections.concat(arguments[0])
    }
}

_p = Polygon.prototype;

_p.addDirection = function(){
    if(arguments.length!=0){
        this.openDirections.concat(arguments[0])
    }
}
