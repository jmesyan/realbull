const baselib = require('./base');
const constants = require('./constants');
const hostname = "shmj.local.com";
const port = 80;
const token = "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!";

var base = new baselib(hostname, port, token);

base.funytest(constants.TEST_ON, "websocket :",function(t){
	var wsServer = 'ws://192.168.6.10:7593';
	var ws = new WebSocket(wsServer);

	ws.onopen = function (e) {
		console.log("Connected to WebSocket server.",e);
	} ;

	ws.onclose = function (e) {
		console.log("Disconnected",e);
	} ;

	ws.onmessage = function(e) {
		console.log("RECEIVED: " + e.data, e);
		ws.close();
	}

	ws.onerror = function (e) {
		console.log('Error occured: ' + e.data,e);
	} ;

	t.end();
})