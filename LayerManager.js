/**
 * Created by jackyanjiaqi on 15-5-21.
 */
/**
 *
 * 负责棋盘的数据结构
 *
 * */
function LayerManager(){
    this.hexagons = [];
}

var alphabet = ['A','A','A','B','B','C','C','D','E','E','E','F','G','H',
    'I','I','I','J','K','L','L','M','N','N','O','O','O', 'P','Q','R','S',
    'T','T','U','U','V','W', 'X','Y','Z','CH','PH','EE','OO','WH','SH','TH',
    'TH','GH'];

_p = LayerManager.prototype;

_p.addHexagon = function (obj) {
    var hexObj = new Hexagon();
    this.hexagons.push();
};

_p.growTo = function () {

};

_p.createBoard = function(objs) {
    //生成初始游戏板
    //每添加一个Hexagon就重新计算方向
    var l_grow_direction;
    //for (var i = 4; i < 4 + Math.random() * 6; i++) {
    //    var objItem = objs[Math.floor(Math.random() * objs.length)];
    //    while (objItem.selected) {
    //        objItem = objs[Math.floor(Math.random() * objs.length)];
    //    }
    //    objItem.selected = true;
    //    this.hexagons.push(objItem);
    //}
}

_p.renderBoard = function(){
    for(var hexItem in hexagons){

    }
}