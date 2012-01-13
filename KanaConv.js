// KanaConv.js
// cscript で読み込む時にはBOM有りUTF-8ファイルであること
/*jslint white: true, nomen: true, regexp: true, bitwise: true, evil: true, forin: true, windows: true, browser: true, devel: true, continue: true, sub: true, fragment: true, cap: true, on: true, css: true, maxerr: 50, indent: 2 */

//var KanaConv;
if (typeof KanaConv === 'undefined') {
  var KanaConv;
  KanaConv = {};
}

(function () {
  "use strict";
  
  var kanahenkan = [];
  var dakuten_moji = [];
  var handaku_moji = [];
  
  // 半角カタカナ作成用コード
  var hankaku_code = [ 65383, 65393, 65384, 65394, 65385, 65395, 65386, 65396, 65387, 65397, 65398, 65398, 65399, 65399, 65400, 65400, 65401, 65401, 65402, 65402, 65403, 65403, 65404, 65404, 65405, 65405, 65406, 65406, 65407, 65407, 65408, 65408, 65409, 65409, 65391, 65410, 65410, 65411, 65411, 65412, 65412, 65413, 65414, 65415, 65416, 65417, 65418, 65418, 65418, 65419, 65419, 65419, 65420, 65420, 65420, 65421, 65421, 65421, 65422, 65422, 65422, 65423, 65424, 65425, 65426, 65427, 65388, 65428, 65389, 65429, 65390, 65430, 65431, 65432, 65433, 65434, 65435, 65436, 65436, 65394, 65396, 65382, 65437, 65395, 65398, 65401 ];
  
  // 半角カタカナ作成用濁点文字No.
  var dakuten_no = [ 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 36, 38, 40, 47, 50, 53, 56, 59, 83 ];
  
  // 半角カタカナ作成用半濁点文字No.
  var handaku_no = [ 48, 51, 54, 57, 60 ];
  var dakuten = [ 'ヴ', '', '', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', '', '', '', '', '', 'バ', 'ビ', 'ブ', 'ベ', 'ボ' ];
  var handaku = [ 'パ', 'ピ', 'プ', 'ペ', 'ポ' ];
  var zenkaku_kana = [ 'ヲ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ン' ];
  var kansuuji = [ 12295, 19968, 20108, 19977, 22235, 20116, 20845, 19971, 20843, 20061 ];
  
  String.whiteSpace = [];
  String.whiteSpace[0x0009] = true;
  String.whiteSpace[0x000a] = true;
  String.whiteSpace[0x000b] = true;
  String.whiteSpace[0x000c] = true;
  String.whiteSpace[0x000d] = true;
  String.whiteSpace[0x0020] = true;
  String.whiteSpace[0x0085] = true;
  String.whiteSpace[0x00a0] = true;
  String.whiteSpace[0x1680] = true;
  String.whiteSpace[0x180e] = true;
  String.whiteSpace[0x2000] = true;
  String.whiteSpace[0x2001] = true;
  String.whiteSpace[0x2002] = true;
  String.whiteSpace[0x2003] = true;
  String.whiteSpace[0x2004] = true;
  String.whiteSpace[0x2005] = true;
  String.whiteSpace[0x2006] = true;
  String.whiteSpace[0x2007] = true;
  String.whiteSpace[0x2008] = true;
  String.whiteSpace[0x2009] = true;
  String.whiteSpace[0x200a] = true;
  String.whiteSpace[0x200b] = true;
  String.whiteSpace[0x2028] = true;
  String.whiteSpace[0x2029] = true;
  String.whiteSpace[0x202f] = true;
  String.whiteSpace[0x205f] = true;
  String.whiteSpace[0x3000] = true;
  
  if (typeof KanaConv.trim !== 'function') {
    KanaConv.trim = function (x) {
      if (!x) { return ''; }
      var len = x.length;
      if (len){
          var whiteSpace = String.whiteSpace, i = 0;
          while (whiteSpace[x.charCodeAt(--len)]);
          if (++len){
              while (whiteSpace[x.charCodeAt(i)]){ ++i; }
          }
          x = x.substring(i, len);
      }
      return x;
    };
  }
  
  if (typeof KanaConv.kana !== 'function') {
    KanaConv.kana = function (x) {
      if (!x) { return ''; }
      //カナかな変換
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        
        if (code >= 12449 && code <= 12531) {
          code = code - 96;
        }
        xout += String.fromCharCode(code);
      }
      
      return xout;
    };
  }

  if (typeof KanaConv.kanahankaku !== 'function') {
    KanaConv.kanahankaku = function (x) {
      if (!x) { return ''; }
      //カナ(全角半角)変換
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        
        if (code >= 12449 && code <= 12534) {
          xout += kanahenkan[code - 12449];
        } else {
          xout += String.fromCharCode(code);
        }
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.A_kanahankaku !== 'function') {
    KanaConv.A_kanahankaku = function (x) {
      if (!x) { return ''; }
      // カナ(半角全角)変換
      var le = x.length;
      var i;
      var xout = "";
      var code = x.charCodeAt(0);
      
      for (i = 0; i < le; i++) {
        var code_next = x.charCodeAt(i + 1);
        
        if (code >= 65382 && code <= 65437) {
          var moji;
          if (code_next === 65438) {
            moji = dakuten[code - 65395];
            i++;
            code_next = x.charCodeAt(i + 1);
          } else if (code_next === 65439) {
            moji = handaku[code - 65418];
            i++;
            code_next = x.charCodeAt(i + 1);
          } else {
            moji = zenkaku_kana[code - 65382];
          }
          xout = xout + moji;

        } else {
          xout = xout + String.fromCharCode(code);
        }
        code = code_next;
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.A_kana !== 'function') {
    KanaConv.A_kana = function (x) {
      if (!x) { return ''; }
      //かなカナ変換
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        if (code >= 12353 && code <= 12435) {
          code = code + 96;
        }
        xout += String.fromCharCode(code);
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.halpha !== 'function') {
    KanaConv.halpha = function (x) {
      if (!x) { return ''; }
      //半角英から全角英
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          code = code + 65248;
        }
        if (code >= 97 && code <= 122) {
          code = code + 65248;
        }
        xout += String.fromCharCode(code);
      }
      return xout;
    };
  }
  
  if (typeof KanaConv.alpha !== 'function') {
    KanaConv.alpha = function (x) {
      if (!x) { return ''; }
      //全角英から半角英
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        
        if (code >= 65313 && code <= 65338) {
          code = code - 65248;
        }
        
        if (code >= 65345 && code <= 65370) {
          code = code - 65248;
        }
        xout += String.fromCharCode(code);
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.hnumber !== 'function') {
    KanaConv.hnumber = function (x) {
      if (!x) { return ''; }
      //半角数から全角数
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        
        if (code >= 48 && code <= 57) {
          code = code + 65248;
        }
        xout += String.fromCharCode(code);
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.znumber !== 'function') {
    KanaConv.znumber = function (x) {
      if (!x) { return ''; }
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        
        if (code >= 65296 && code <= 65305) {
          code = code - 65248;
        }
        xout += String.fromCharCode(code);
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.num_kan !== 'function') {
    KanaConv.num_kan = function (x) {
      if (!x) { return ''; }
      //全角数から漢数字
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        if (code >= 65296 && code <= 65305) {
          code = kansuuji[code - 65296];
        }
        xout += String.fromCharCode(code);
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.kan_num !== 'function') {
    KanaConv.kan_num = function (x) {
      //全角数から漢数字
      var le = x.length;
      var i;
      var xout = "";
      
      for (i = 0; i < le; i++) {
        var code = x.charCodeAt(i);
        var dmy;
        
        if (code === 12295) {
          dmy = '０';
        } else if (code === 19968) {
          dmy = '１';
        } else if (code === 20108) {
          dmy = '２';
        } else if (code === 19977) {
          dmy = '３';
        } else if (code === 22235) {
          dmy = '４';
        } else if (code === 20116) {
          dmy = '５';
        } else if (code === 20845) {
          dmy = '６';
        } else if (code === 19971) {
          dmy = '７';
        } else if (code === 20843) {
          dmy = '８';
        } else if (code === 20061) {
          dmy = '９';
        } else {
          dmy = x.charAt(i);
        }
        
        xout += dmy;
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.EncMark !== 'function') {
    KanaConv.EncMark = function (x) {
      // 記号全角半角変換
      var zen = '．，－ー―、。（）！？＋＝＊％＆／　';
      var han = '.,---,,()!?+=*%&/ ';
      var le = x.length;
      var i;
      var xout = '';
      var c;
      var n;
      
      for (i = 0; i < le; i++) {
        c = x.charAt(i);
        n = zen.indexOf(c, 0);
        
        if (n >= 0) {
          c = han.charAt(n);
        }
        xout += c;
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.EncMarkSimple !== 'function') {
    KanaConv.EncMarkSimple = function (x) {
      // 記号全角半角変換
      var zen = '．，－―、。（）！？＋＝＊％＆／　';
      var han = '.,--,,()!?+=*%&/ ';
      var le = x.length;
      var i;
      var xout = '';
      var c;
      var n;
      
      for (i = 0; i < le; i++) {
        c = x.charAt(i);
        n = zen.indexOf(c, 0);
        
        if (n >= 0) {
          c = han.charAt(n);
        }
        xout += c;
      }
      
      return xout;
    };
  }
  
  if (typeof KanaConv.EncForSearch !== 'function') {
    KanaConv.EncForSearch = function (x) {
      var xout = '';
      
      xout = x;
      
      xout = KanaConv.A_kanahankaku(xout);
      xout = KanaConv.A_kana(xout);
      xout = KanaConv.alpha(xout);
      xout = xout.toUpperCase();
      xout = KanaConv.znumber(xout);
      
      return xout;
    };
  }
  
  // 2バイト文字変換チェック
  dakuten_moji = String.fromCharCode(65438);
  handaku_moji = String.fromCharCode(65439);
  
  // 半角カタカナ用配列を作成する
  var i;
  
  for (i = 0; i < 86; i++) {
    kanahenkan[i] = String.fromCharCode(hankaku_code[i]);
  }
  for (i = 0; i < 21; i++) {
    kanahenkan[dakuten_no[i]] = kanahenkan[dakuten_no[i]] + dakuten_moji;
  }
  for (i = 0; i < 5; i++) {
    kanahenkan[handaku_no[i]] = kanahenkan[handaku_no[i]] + handaku_moji;
  }
  
}());
