var cryptos = require("./cryptos");
var self = exports;

String.prototype.format = function() {
	var result = "".slice.call(this, 0);
	var args = [].slice.call(arguments, 0);
	if (self.isType("Array")(args)) {
		for( var key in args) {
			if (args[key] != undefined) {
				var reg = new RegExp("({)"+key+"(})", "g");
				result = result.replace(reg, args[key]);
			}
		}
	}
	return result;	
}


exports.isType = function(type) {
	return function(obj) {
		return {}.toString.call(obj) == "[object "+ type + "]";
	}
}

exports.isObject = function(obj) {
	return self.isType("Object")(obj);
}

exports.isArray = function(obj) {
	return self.isType("Array")(obj);
}

exports.isString = function(obj) {
	return self.isType("String")(obj);
}

exports.isEmpty = function(str) {
	return str == undefined || str == "";
}

exports.makePkey = function(uid, timestamp, locale) {
	var args = [].slice.call(arguments, 0);
	if (args.length < 3) throw "至少得传三个参数";
	var ismobile = args[3] || 0, gss = args[4] || 0,  appID = args[5] || 1, bundleid = args[6] || '';
	var eobj = {u:uid, t:timestamp, l:locale, m:ismobile, g:gss, a:appID, b:bundleid};
	return cryptos.des.encrypt(eobj);
}

exports.uDecode = function(str) {
	return cryptos.des.decrypt(str);
}

exports.time = function() {
	return Math.round(+new Date()/1000);
}
