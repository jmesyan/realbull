var crypto = require("crypto");
var tools = require("./tools");
var cryptos = module.exports = {};
var Crypt3DesKey = "qcloud";
var Crypt3DesIV = "realbull";

cryptos.des = {
  algorithm:{ ecb:'des-ecb',cbc:'des-cbc' },
  encrypt:function(str){
  	if (tools.isObject(str)) str = JSON.stringify(str);
  	if (!tools.isString(str)) throw "请输入加密字符串";
    var key = new Buffer(8);
    key.write(Crypt3DesKey);
    var iv = new Buffer(Crypt3DesIV);
    var cipher = crypto.createCipheriv(this.algorithm.cbc, key, iv);
    cipher.setAutoPadding(true) //default true
    var ciph = cipher.update(str, 'utf8', 'base64');
    ciph += cipher.final('base64');
    var ra = /\+/g, rb = /\//g, rc = /\=/g;
  	ciph = ciph.replace(ra, "-");
  	ciph = ciph.replace(rb, ".");
  	ciph = ciph.replace(rc, "!");
    return ciph;
  },
  decrypt:function(str){
    var key = new Buffer(8);
    key.write(Crypt3DesKey);
    var iv = new Buffer(Crypt3DesIV);
    var decipher = crypto.createDecipheriv(this.algorithm.cbc, key, iv);
    decipher.setAutoPadding(true);
    var ra = /\-/g, rb = /\./g, rc = /\!/g;
  	str = str.replace(ra, "+");
  	str = str.replace(rb, "/");
  	str = str.replace(rc, "=");
    var txt = decipher.update(str, 'base64', 'utf8');
    txt += decipher.final('utf8');
   	txt = JSON.parse(txt);
    return txt;
  }

}