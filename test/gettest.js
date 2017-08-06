var request = require('supertest');
var chai = require('chai');
var app = require("../app");
var helper = require("../helper");

var sampleValidRequest = '{"payload":[{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"init","reference":"aqsdasd","shortId":"6Laj49N3PiwZ","status":0,"type":"htv","workflow":"pending"},{"address":{"buildingNumber":"Level 6","postcode":"2060","state":"NSW","street":"146 Arthur Street","suburb":"North Sydney"},"propertyTypeId":3,"readyState":"init","reference":"asdasd","shortId":"E9eQVYEMkub2","status":4,"type":"htv","valfirm":null,"workflow":"completed"},{"address":{"buildingNumber":"25","postcode":"4000","state":"QLD","street":"Mary St","suburb":"Brisbane"},"propertyTypeId":3,"readyState":"init","reference":"asdas","shortId":"nQMyWWLBvu4A","status":1,"type":"avm","workflow":"pending"},{"address":{"buildingNumber":"92","postcode":"2000","state":"NSW","street":"Pitt Street","suburb":"Sydney","unitNumber":"Suite 1 Level 8"},"propertyTypeId":3,"readyState":"complete","reference":"asdasd","shortId":"ZM73nE4nKH56","status":4,"type":"avm","workflow":"cancelled"},{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"complete","reference":"asdasdas","shortId":"AQzAB5xMXFNx","status":3,"type":"avm","workflow":"completed"},{"address":{"buildingNumber":"360","postcode":"3000","state":"VIC","street":"Elizabeth St","suburb":"Melbourne","unitNumber":"Level 28"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"yebZvgdA7FRk","status":1,"type":"htv","workflow":"completed"},{"address":{"buildingNumber":"153","postcode":"2229","state":"NSW","street":"Denman Avenue","suburb":"CARINGBAH","unitNumber":"Suite 7"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"YP7NJVNpVCdr","status":4,"type":"htv","workflow":"cancelled"}]}';

var sampleInvalidRequest = '{"payload":[{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"init","reference":"aqsdasd","shortId":"6Laj49N3PiwZ","status":0,"type":"htv","workflow":"pending"},{"address":{"buildingNumber":"Level 6","postcode":"2060","state":"NSW","street":"146 Arthur Street","suburb":"North Sydney"},"propertyTypeId":3,"readyState":"init","reference":"asdasd","shortId":"E9eQVYEMkub2","status":4,"type":"htv","valfirm":null,"workflow":"completed"},{"address":{"buildingNumber":"25","postcode":"4000","state":"QLD","street":"Mary St","suburb":"Brisbane"},"propertyTypeId":3,"readyState":"init","reference":"asdas","shortId":"nQMyWWLBvu4A","status":1,"type":"avm","workflow":"pending"},{"address":{"buildingNumber":"92","postcode":"2000","state":"NSW","street":"Pitt Street","suburb":"Sydney","unitNumber":"Suite 1 Level 8"},"propertyTypeId":3,"readyState":"complete","reference":"asdasd","shortId":"ZM73nE4nKH56","status":4,"type":"avm","workflow":"cancelled"},{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"complete","reference":"asdasdas","shortId":"AQzAB5xMXFNx","status":3,"type":"avm","workflow":"completed"},{"address":{"buildingNumber":"360","postcode":"3000","state":"VIC","street":"Elizabeth St","suburb":"Melbourne","unitNumber":"Level 28"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"yebZvgdA7FRk","status":1,"type":"htv","workflow":"completed"},{"address":{"buildingNumber":"153","postcode":"2229","state":"NSW","street":"Denman Avenue","suburb":"CARINGBAH","unitNumber":"Suite 7"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"YP7NJVNpVCdr","status":4,"type":"htv","workflow"::"cancelled"}]}';

var expectedResponse = '{"response":[{"concat":"Level 6 146 Arthur Street North Sydney NSW 2060","type":"htv","workflow":"completed"},{"concat":"360 Elizabeth St Melbourne VIC 3000","type":"htv","workflow":"completed"}]}';

describe('GET /', function(){
  it('respond with json content-type (and 200 status)', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('Success POST /', function(){
  it('respond with the expected result message in JSON-format (and 200 status)', function(done){
    request(app)
      .post('/')
      .set('Accept', 'application/json')
      .type('json')
      .send(helper.safeJSONParse(sampleValidRequest))
      .expect(200, done);
  });
});

describe('Error POST /', function(){
  it('respond with an error expected result message in JSON-format (and 400 status)', function(done){
    request(app)
      .post('/')
      .type('json')
      .set('Accept', 'application/json')
      .send(helper.safeJSONParse('{test:: "test"}'))
      .expect(400, done)
  });
});



