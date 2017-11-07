
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");
var tools = require("./utils/tools");
var db = require("./db/mysql");
// var res = db.table("yly_member").where({uid:13032}).find();
// res.then(function(r){
// 	console.log(r.nickname);
// });

// db.table("yly_member").add({uid:1304, username:"1304", utype:"NAN", locale:"zh_CN", avatar:"jmesyan.jpg", logincity:"shanghai"}, function(r){
// 	console.log(r);
// });
// db.table("yly_member").where({uid:10007}).delete(function(r){
// 	console.log(r);
// })

db.table("yly_member").where({uid:10008}).find(function(r){
	console.log(r.nickname);
});
// db.table("yly_member").where({uid:9999}).update({username:"永远的admin"}, function(r){
// 	console.log(r);
// })
db.table("yly_member").where({uid:9999}).find(function(r){
	console.log(r.username);
});

console.log(db.getLastSql());


// // it("hello", function(done){
// 	var res = db.table("yly_member").where({uid:13032}).select();
// 	res.then(function(res){
// 		console.log(res.results);
// 		// done(res.results);
// 	});
// // });
// var hp = new httpd("shmj.local.com", 80, "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!");

// describe("大厅页面", function(){
// 	it("入口页面", function(){
			
// 	});

// });

