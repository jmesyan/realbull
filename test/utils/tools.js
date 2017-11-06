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

exports.isEmpty = function(str) {
	return str == undefined || str == "";
}
