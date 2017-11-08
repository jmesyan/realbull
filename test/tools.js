
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

describe('测试数字', function () {
	var cb = function(num){
		return 10+num;
	}

	it("负数减", function(){
		var anum = 6;
		expect(cb(-anum)).to.equal(4);
	})
});
