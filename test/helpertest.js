var chai = require('chai');
var helper = require("../helper");
var expect = chai.expect;

describe('Invalid JSON request', function(){
  it('should return 400 Error message', function(){
    expect(helper.safeJSONParse("test")).to.be.an("string").that.includes("error");
  });
});


describe('Valid JSON request', function(){
  var expectedJSON = { test: "test"};
  it('should return the parsed JSON', function(){
    expect(helper.safeJSONParse('{ "test": "test" }')).to.deep.equals(expectedJSON);
  });
});
