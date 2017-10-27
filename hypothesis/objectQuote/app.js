var a = require("./a");
var b = require("./b");
var server = require("./D").server;

var A =new a(), B = new b();


B.getServer();
console.log("app server:", server);
A.setSever("abc", "def");
B.getServer();
console.log("app server:", server);
A.setSever("good", {a:111, b:'2232'});
B.getServer();
console.log("app server:", server);