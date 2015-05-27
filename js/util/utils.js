/**
 * Does the prototype-based inheritance as described in chapter 1.
 * @param subConstructor the constructor function of the subclass
 * @param superConstructor the constructor function of the superclass
 */
function extend(subConstructor, superConstructor) {
    subConstructor.prototype = Object.create(superConstructor.prototype, {
        constructor: {
            value: subConstructor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}

/**
 * Checks if we're working with the touchscreen or with the
 * regular desktop browser. Used to determine, what kind of events should we use:
 * mouse events or touch events.
 */
function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}

function dlog(str){
    if(debug){
        alert(str);
    }
}

function indexTransfer() {
    if(arguments.length == 3) {
        var rowi = arguments[0];
        var columni = arguments[1];
        var columncount = arguments[2];
        return rowi * columncount + columni;
    }else
    if(arguments.length == 2){
        var columni = Math.round(arguments[0]%arguments[1]);
        var rowi = Math.round((arguments[0] - columni)/arguments[1]);
        return [rowi,columni];
    }else
    return null;
}

function numberToColor(num) {
    var hexString = num.toString(16);
    // Add padding
    return "#" + "000000".substr(0, 6 - hexString.length) + hexString;
}

window.requestAnimationFrame = (function(){
    //Check for each browser
    //@paul_irish function
    //Globalises this function to work on any browser as each browser has a different namespace for this
    return  window.requestAnimationFrame       ||  //Chromium
        window.webkitRequestAnimationFrame ||  //Webkit
        window.mozRequestAnimationFrame    || //Mozilla Geko
        window.oRequestAnimationFrame      || //Opera Presto
        window.msRequestAnimationFrame     || //IE Trident?
        function(callback, element){ //Fallback function
            return window.setTimeout(callback, 1000/60);
        }

})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var fSlice = Array.prototype.slice,
            aArgs = fSlice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis || window,
                    aArgs.concat(fSlice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}