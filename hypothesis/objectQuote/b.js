var server = require("./D").server;

function B(){

}

B.prototype.getServer = function(){
	console.log("the sever is:", server);
}

module.exports = B;