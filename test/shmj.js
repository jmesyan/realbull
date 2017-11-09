
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var httpd = require("./utils/httpd");
var tools = require("./utils/tools");
var db = require("./db/mysql");
var hp = new httpd("192.168.6.168", 85, 13032);

describe("vip系统", function(){
	this.timeout(0);
	describe("vip支付礼品赠送查询", function(){
		it("如果ids为空，查询报错", function(done){
			hp.get("/mobile/vipPayPresents", {})
			.then(function(res){
				expect(res.ret).to.equal(4);
				done();
			}).catch(function(err){
				done(err);
			})
		});
		it("如果ids有数据，返回对应的查询值", function(done){
			hp.get("/mobile/vipPayPresents", {ids:"576,577"})
			.then(function(res){
				expect(res.ret).to.equal(0);
				expect(res.presents[576]).to.be.empty;
				expect(res.presents[577]).to.not.be.empty;
				done();
			}).catch(function(err){
				done(err);
			})
		});
	});

});