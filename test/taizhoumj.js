
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");

var hp = new httpd("taizhoumj.local.com", 80, 12603);

describe("好友抢红包活动", function(){
	this.timeout(0);
	it("入口页面", function(done){
		hp.get("/mobile/robRedpack", {})
		.then(function(res){
			console.log(res);
			expect(res).to.be.a("object");
			expect(res.ret).to.equal(0);
			done();
		}).catch(function(err){
			done(err);
		});
	});

});

