/**
 * Created by jackyanjiaqi on 15-5-21.
 */
function Hexagon(renderProx){
    /*向量*/
    this.points = [null,null,null,null,null,null];
    this.drctState = [null,null,null,null,null,null];
    this.renderProx = renderProx;
    this._initPoints();
    this._initDirections();
}

_p = Hexagon.prototype;

_p._initPoints = function(){
    for(var i=0;i<6;i++){
        this.points[i] = new Point();
        var p = this.points[i];
        p.x = this.renderProx[i].x;
        p.y = this.renderProx[i].y;
        p.motherCount = 1;
    }
}
_p._initDirections = function(){
    for(var i=0;i<6;i++){
        this.drctState[i] = new Direction();
        var d = this.drctState[i];
        d.index = i;//方向编号
        d.leftPoint = this.points[i];//左Point
        d.rightPoint = this.points[(i+1)%6];//右Point
        d.mother = this;//所属的Hexagon
    }
    for(var i=0;i<6;i++){
        this.points[i].leftDirection = this.drctState[(i+5)%6];//左方向
        this.points[i].rightDirection = this.drctState[(i+6)%6];//右方向
    }
}