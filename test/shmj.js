
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");
var tools = require("./utils/tools");
var db = require("./db/mysql");
var hp = new httpd("shmj.local.com", 80, "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!");

// describe("大厅页面", function(){
// 	it("入口页面", function(){
// 		var abc = eds || "hello world";
// 		console.log(abc);

// 	});

// });

var key = tools.makePkey(13032, 1510040554, "zh_CN");
console.log(key);
