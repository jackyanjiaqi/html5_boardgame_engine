/**
 * Created by jackyanjiaqi on 15-5-27.
 */
var Logger = (
    function (){
        var singleton = new Logger();

        function Logger(){
            this.taglocker = {};
            this.debug = false;
        }

        var _p = Logger.prototype;

        _p.log = function (str,tag){
            if(tag){
                if(!this.taglocker.hasOwnProperty(tag)){
                   this.taglocker[tag] = true;
                }
                if(this.debug && this.taglocker[tag]){
                    alert(str);
                }
            }
        }
        _p.tagOn = function (tagNames){
            if(arguments.length>0){
                for(var i = 0;i<arguments.length;i++){
                    if(arguments[i] instanceof Array){
                        for(var arg in arguments[i]){
                            this.taglocker[arg] = true;
                        }
                    }else
                    if(arguments[i] instanceof String){
                        this.taglocker[arguments[i]] = true;
                    }
                }
            }
            return singleton;
        }

        _p.tagOff = function (tagNames){
            if(arguments.length>0){
                for(var i = 0;i<arguments.length;i++){
                    if(arguments[i] instanceof Array){
                        for(var arg in arguments[i]){
                            this.taglocker[arg] = false;
                        }
                    }else
                    if(arguments[i] instanceof String){
                        this.taglocker[arguments[i]] = false;
                    }
                }
            }
            return singleton;
        }

        _p.tagAll = function(isOpenOrClosed){
            if(!isOpenOrClosed){
                this.log(this.taglocker.toString());
            }else
            if(typeof isOpenOrClosed == 'boolean'){
                for(var p in this.taglocker){
                    p = isOpenOrClosed;
                }
            }
            return singleton;
        }

        _p.debugSwitch = function(isDebugOn){
            if(typeof isDebugOn == 'boolean'){
                this.debug = isDebugOn;
            }
            return singleton;
        }

        return singleton;
    }
)();