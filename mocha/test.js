require("babel-core/register");
var chai = require('chai');  
var assert = chai.assert;    // Using Expect style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var foo = 'bar',  beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe("chai should", function(){
	it('should example', function(){
		foo.should.be.a('string');
		foo.should.equal('bar');
		foo.should.have.lengthOf(3);
		beverages.should.have.property('tea').with.lengthOf(3);
	})
});


describe("chai expect", function(){
	it ('expect example', function(){
		expect(foo).to.be.a("string");
		expect(foo).to.equal('bar');
		expect(foo).to.have.lengthOf(3);
		expect(beverages).to.have.property('tea').with.lengthOf(3);
		var answer = 43;

		// AssertionError: expected 43 to equal 42.
		// expect(answer).to.equal(42);

		// AssertionError: topic [answer]: expected 43 to equal 42.
		expect(answer, 'topic [answer]').to.equal(42);
	})
})


describe("chai assert", function(){
	it('assert example', function(){
		assert.typeOf(foo, 'string');
		assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
		assert.equal(foo, 'abc', 'foo equal abc');
		assert.lengthOf(foo, 3, 'foo value has a length of 3');
		assert.lengthOf(beverages.tea, 3);
	})
});

beforeEach(function(){
	console.log("it is very interesting");
})

function User(name) {
	this.name = name;
}

User.prototype.save = function(cb){
	var err = false;
	setTimeout(cb(err), 5000);
}

const sleeps = function(numberMillis, res) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return res;
    }
}

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});


describe("promise", function(){
	it('should complete this test', function (done) {
	  	const res  = sleeps(2000, "hello");
	  	res.should.have.length(5);
	});
})