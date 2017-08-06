const request = require('supertest');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var _ = require('underscore');
var helper = require('./helper');
var util = require('util');


var jsonRequest = '{"payload":[{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"init","reference":"aqsdasd","shortId":"6Laj49N3PiwZ","status":0,"type":"htv","workflow":"pending"},{"address":{"buildingNumber":"Level 6","postcode":"2060","state":"NSW","street":"146 Arthur Street","suburb":"North Sydney"},"propertyTypeId":3,"readyState":"init","reference":"asdasd","shortId":"E9eQVYEMkub2","status":4,"type":"htv","valfirm":null,"workflow":"completed"},{"address":{"buildingNumber":"25","postcode":"4000","state":"QLD","street":"Mary St","suburb":"Brisbane"},"propertyTypeId":3,"readyState":"init","reference":"asdas","shortId":"nQMyWWLBvu4A","status":1,"type":"avm","workflow":"pending"},{"address":{"buildingNumber":"92","postcode":"2000","state":"NSW","street":"Pitt Street","suburb":"Sydney","unitNumber":"Suite 1 Level 8"},"propertyTypeId":3,"readyState":"complete","reference":"asdasd","shortId":"ZM73nE4nKH56","status":4,"type":"avm","workflow":"cancelled"},{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"complete","reference":"asdasdas","shortId":"AQzAB5xMXFNx","status":3,"type":"avm","workflow":"completed"},{"address":{"buildingNumber":"360","postcode":"3000","state":"VIC","street":"Elizabeth St","suburb":"Melbourne","unitNumber":"Level 28"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"yebZvgdA7FRk","status":1,"type":"htv","workflow":"completed"},{"address":{"buildingNumber":"153","postcode":"2229","state":"NSW","street":"Denman Avenue","suburb":"CARINGBAH","unitNumber":"Suite 7"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"YP7NJVNpVCdr","status":4,"type":"htv","workflow":"cancelled"}]}';
var jsonResponse = '{"response":[{"concataddress":"28 Donington Ave Georges Hall NSW 2198","type":"htv","workflow":"completed"},{"concataddress":"25 Mary St Brisbane QLD 4000","type":"htv","workflow":"completed"}]}';

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.post('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var jsReq = helper.safeJSONParse(JSON.stringify(req.body));
    //console.log(util.inspect(req.body));
    if(jsReq !== "error") {
        var rawJSON = _(jsReq.payload).where( {"type": "htv", "workflow":"completed"});
        var returnJSON = _(rawJSON).map(function (addr) {
            var concatAddr = "";
            concatAddr = addr.address.buildingNumber + " " + addr.address.street + " " + addr.address.suburb + " " + addr.address.state + " " + addr.address.postcode;
            return {"concat": concatAddr,
                    "type": addr.type,
                    "workflow": addr.workflow
            };
        });
        res.status(200).send(JSON.stringify({response: returnJSON}));
    } else {
        res.status(400).send(JSON.stringify({error: "Could not decode request: JSON parsing failed"}));
    }
    res.end();
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ a: 10 }, null, 3));
    res.end();
});

app.get('/response', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonResponse);
    res.end();
});
 
app.get('/request', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonRequest);
    res.end();
});

app.use(function(err, req, res, next) {
  res.status(400).send(JSON.stringify({error: "Could not decode request: JSON parsing failed"}));
});

module.exports = app;
