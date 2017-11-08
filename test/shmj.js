
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");
var tools = require("./utils/tools");
var db = require("./db/mysql");
var hp = new httpd("shmj.local.com", 80, 13032);

// describe("大厅页面", function(){
// 	it("入口页面", function(){
// 		var abc = eds || "hello world";
// 		console.log(abc);

// 	});

// });

// var token = tools.makePkey(12603, tools.time(), "zh_CN", 1);
// console.log(token);

// var result = tools.uDecode(token);
// console.log(result.u);

