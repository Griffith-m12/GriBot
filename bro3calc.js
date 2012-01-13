/*jslint white: true, nomen: true, regexp: true, bitwise: true, evil: true, forin: true, windows: true, browser: true, devel: true, continue: true, sub: true, fragment: true, cap: true, on: true, css: true, maxerr: 50, indent: 2 */

if (typeof bro3calc === 'undefined') {
  var bro3calc = {};
}

(function () {
  "use strict";
  
  if (typeof bro3calc.tradecalc !== 'function') {
    bro3calc.tradecalc = function (tp) {   // トレード手数料計算
      if (isNaN(tp) || tp < 0) { tp=0; }
      var tp1 = Math.floor(tp);
      var tp2 = tp1 * 0.1;
      var tp3 = tp1 - tp2;
      
      if (tp1 >= 500) {
        tp2 += (tp1-500) * 0.1;
      }
      if (tp1 >= 1000) {
        tp2 += (tp1-1000) * 0.1;
      }
      tp2 = Math.floor(tp2);
      tp3 = tp1 - tp2;
      return [tp1, tp2, tp3, Math.floor(tp2/tp1*1000)/10];
    };
  }
  
  if (typeof bro3calc.tradesolv !== 'function') {
    bro3calc.tradesolv = function (tp) {  // トレード受取額計算
      if (isNaN(tp) || tp < 0) { tp=0; }
      var tp3 = Math.floor(tp);
      var tp2 = Math.floor(tp3 * (1/0.9 - 1));
      var tp1 = tp2 + tp3;
      
      if (tp3 > 850) {
        tp1 = Math.floor((tp3 - 150) / 0.7);
        tp2 = (tp1 - tp3);
      } else if (tp3 > 450) {
        tp1 = Math.floor((tp3 - 50) / 0.8);
        tp2 = (tp1 - tp3);
      }
      var tpar = this.tradecalc(tp1);
      return tpar;
    };
  }
  
  if (typeof bro3calc.HpRecoverHours !== 'function') {
    bro3calc.HpRecoverHours = function (level, hp) {
      if (hp < 0) { hp = 0; }
      return (level <= 5)  ? Math.pow(2, level - 2) * (100 - hp) / 100 :
             (level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
                             (level + 20) * (100 - hp) / 100;
    };
  }
  
  if (typeof bro3calc.DistanceOf !== 'function') {
    bro3calc.DistanceOf = function (a, b) {
      var rCoord = /\(?(-?\d+),(-?\d+)\)?/;
      var aa = a.match(rCoord);
      var ab = b.match(rCoord);
      
      if (aa && ab
        && aa.length === 3 && ab.length === 3
        && ! isNaN(aa[1]) && ! isNaN(ab[1])
        && ! isNaN(aa[2]) && ! isNaN(ab[2])) {
        return Math.sqrt(Math.pow(aa[1] - ab[1], 2) + Math.pow(aa[2] - ab[2], 2));
      }
    };
  }
})();

