/**
 * Created by jackyanjiaqi on 15-5-26.
 */
function Indicator(drawFunc,x,y){
    Object.defineProperties(this,
        {
            VISION_VISIBLE:{value:'visible',writable:false,enumerable:true,configurable:false},
            VISION_INVISIBLE:{value:'invisible',writable:false,enumerable:true,configurable:false},
            VISION_GONE:{value:'gone',writable:false,enumerable:true,configurable:false},
            vision:{
                set:function(value){
                    if(this.vision!=value){
                        this._vision_ = value;
                        this.paint();
                    }},
                get:function (){
                    return this._vision_;
                }
            }
        });
    if(drawFunc){
        this.drawfunc = drawFunc;
    }
    this.touchElement = null;
    this.eventHandler = null;
    this.father = null;
    this._childs = new Array();
    this.x = x || 0;
    this.y = y || 0;
    this.rawx = 0;
    this.rawy = 0;
    this._vision_ = this.VISION_VISIBLE;


}

_p = Indicator.prototype;

_p.addChild = function(indicator){
    this._childs.push(indicator);
    indicator.father = this;
}

_p.removeChild = function(indexOrIndicator){
    if(typeof indexOrIndicator == 'Number'){
        var position = indexOrIndicator;
        this._childs.splice(position,1);
    }else
    if(typeof indexOrIndicator == 'Object'){
        var position = this._childs.indexOf(indexOrIndicator);
        this._childs.splice(position,1);
    }
}

_p.paint = function(){
    Logger.log('paint() vision='+this._vision_,'indicator');
    if(this._vision_ == this.VISION_GONE)
        return;
    // 绘制自身
    if(!this.father){
        this.rawx = this.x;
        this.rawy = this.y;
    }else{
        this.rawx = this.father.rawx + this.x;
        this.rawy = this.father.rawy + this.y;
    }
    //调用绘图函数
    if(this.drawfunc && this._vision_ == this.VISION_VISIBLE){
        Logger.log(this.drawfunc.toString(),'indicator');
        this.drawfunc({rawX:this.rawx,rawY:this.rawy});
    }
    //绘制孩子节点
    this._childs.forEach(
        function(indicator){
            indicator.paint();
        }
    );
}