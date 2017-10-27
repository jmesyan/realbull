
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");

var hp = new httpd("taizhoumj.local.com", 80, "QR6WcECcf1.a9JjpL-Y7iKOTndxZmpPti0n5xgc4Qc3rsMV5YQQns.gAKKg4jZJqAu3b.teNBQ9cJi5bTR5gSQ!!");

describe("好友抢红包活动", function(){
	this.timeout(0);
	it("should return get result", function(done){
		hp.get("/mobile/robRedpack", {})
		.then(function(res){
			expect(res).to.be.a("object");
			done();
		}).catch(function(err){
			done(err);
		});
	});

	it("should return post result", function(done){
		hp.post("/mobile/robRedpack", {}, {id:30})
		.then(function(res){
			expect(res).to.be.a("object");
			done();
		}).catch(function(err){
			done(err);
		});
	});
});