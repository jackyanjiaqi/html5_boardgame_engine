/**
 * Created by jackyanjiaqi on 15-5-26.
 */
var IndicatorManager = (function(){
    var singleton;
    function getInstance(){
        if(singleton === undefined){
            singleton = new IndicatorManager();
        }
        return singleton;
    }

    function IndicatorManager(){
        this.indicators = new Array();
    }
    var _p = IndicatorManager.prototype;

    _p.setCanvas = function (canvas){
        this.eventAttachElement = canvas;
        return singleton;
    }

    _p.addIndicator = function (indicator) {
        this.indicators.push(indicator);
        if(this.eventAttachElement){
            indicator.touchElement = this.eventAttachElement;
        }
        //刷新界面
        this.paint();
        return singleton;
    }

    _p.paint = function (){
        this.indicators.forEach(
            function (indicator) {
                indicator.paint();
            }
        );
        return singleton;
    }

    return getInstance();
})();


