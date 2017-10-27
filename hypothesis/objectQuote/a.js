var server = require("./D").server;

function A(){

}

A.prototype.setSever = function(key, value){
	server[key] = value;
}

module.exports = A;