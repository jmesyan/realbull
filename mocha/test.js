require("babel-core/register");
var browser = require("browser");
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var foo = 'bar',  beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe("测试报告", function(){
	it('should return -1 when not present', function() {
        [1,2,3].indexOf(4).should.equal(-1);
      })
});