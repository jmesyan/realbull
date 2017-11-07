var crypto = require("crypto");
var tools = require("./tools");
var cryptos = module.exports = {};
const Crypt3DesKey = "qcloud";
const Crypt3DesIV = "realbull";

cryptos.des = {
  algorithm:{ ecb:'des-ecb',cbc:'des-cbc' },
  encrypt:function(str){
  	if (tools.isObject(str)) str = JSON.stringify(str);
  	if (!tools.isString(str)) throw "请输入加密字符串";
    const key = new Buffer(Crypt3DesKey);
    const iv = new Buffer(Crypt3DesIV);
    const cipher = crypto.createCipheriv(this.algorithm.cbc, key, iv);
    cipher.setAutoPadding(true) //default true
    var ciph = cipher.update(str, 'utf8', 'base64');
    ciph += cipher.final('base64');
	ciph = ciph.replace(/\+/, "-");
	ciph = ciph.replace(/\//, ".");
	ciph = ciph.replace(/\=/, "!");
    return ciph;
  },
  decrypt:function(str){
    const key = new Buffer(Crypt3DesKey);
    const iv = new Buffer(Crypt3DesIV);
    const decipher = crypto.createDecipheriv(this.algorithm.cbc, key, iv);
    decipher.setAutoPadding(true);
	str = str.replace(/\-/, "+");
	str = str.replace(/\./, "/");
	str = str.replace(/\!/, "=");
    var txt = decipher.update(str, 'base64', 'utf8');
    txt += decipher.final('utf8');
   	txt = JSON.parse(txt);
    return txt;
  }

}