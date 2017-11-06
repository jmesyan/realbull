
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");
var tools = require("./utils/tools");
var db = require("./db/mysql");

var hd = new db();
var res = hd.table("yly_member").where({uid:13032}).select();
res.then(function(res){
	console.log(res.results);
})

// var hp = new httpd("shmj.local.com", 80, "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!");

// describe("大厅页面", function(){
// 	it("入口页面", function(done){
// 		hp.get("/mobile/config", {debug:'gaolei'})
// 		.then(function(res){
// 			console.log(res);
// 			expect(res).to.be.a("object");
// 			expect(res.ret).to.equal(1);
// 			done();
// 		}).catch(function(err){
// 			done(err);
// 		});
// 	});

// });

