var _ = require('underscore');
var jsonRequest = '{"payload":[{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"init","reference":"aqsdasd","shortId":"6Laj49N3PiwZ","status":0,"type":"htv","workflow":"pending"},{"address":{"buildingNumber":"Level 6","postcode":"2060","state":"NSW","street":"146 Arthur Street","suburb":"North Sydney"},"propertyTypeId":3,"readyState":"init","reference":"asdasd","shortId":"E9eQVYEMkub2","status":4,"type":"htv","valfirm":null,"workflow":"completed"},{"address":{"buildingNumber":"25","postcode":"4000","state":"QLD","street":"Mary St","suburb":"Brisbane"},"propertyTypeId":3,"readyState":"init","reference":"asdas","shortId":"nQMyWWLBvu4A","status":1,"type":"avm","workflow":"pending"},{"address":{"buildingNumber":"92","postcode":"2000","state":"NSW","street":"Pitt Street","suburb":"Sydney","unitNumber":"Suite 1 Level 8"},"propertyTypeId":3,"readyState":"complete","reference":"asdasd","shortId":"ZM73nE4nKH56","status":4,"type":"avm","workflow":"cancelled"},{"address":{"buildingNumber":"28","lat":-33.912542,"lon":151.002932,"postcode":"2198","state":"NSW","street":"Donington Ave","suburb":"Georges Hall"},"propertyTypeId":3,"readyState":"complete","reference":"asdasdas","shortId":"AQzAB5xMXFNx","status":3,"type":"avm","workflow":"completed"},{"address":{"buildingNumber":"360","postcode":"3000","state":"VIC","street":"Elizabeth St","suburb":"Melbourne","unitNumber":"Level 28"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"yebZvgdA7FRk","status":1,"type":"htv","workflow":"completed"},{"address":{"buildingNumber":"153","postcode":"2229","state":"NSW","street":"Denman Avenue","suburb":"CARINGBAH","unitNumber":"Suite 7"},"propertyTypeId":3,"readyState":"complete","reference":"asdas","shortId":"YP7NJVNpVCdr","status":4,"type":"htv","workflow":"cancelled"}]}';
var jsReq = JSON.parse(jsonRequest);
var rawJSON = _(jsReq.payload).where( {"type": "htv", "workflow":"completed"});
//console.log(rawJSON);
/*var returnJSON = _(rawJSON).map(function (addr) {
    return {addr};
})*/
var returnJSON = _(rawJSON).map(function (addr) {
    var concatAddr = "";
    /*for(var k in addr.address) {
        //console.log(k + " ");
        concatAddr += addr.address[k] + " ";
    }*/

    //buildingNumber street suburb state postcode
    concatAddr = addr.address.buildingNumber + " " + addr.address.street + " " + addr.address.suburb + " " + addr.address.state + " " + addr.address.postcode;
    //console.log(concatAddr + "\n\n");
    //console.log(addr.address.postcode + " " + addr.address.state);
    return {"concat": concatAddr,
            "type": addr.type,
            "workflow": addr.workflow
        };
});
console.log(JSON.stringify({response : returnJSON}));


function safeJSONParse (jsonString) {
  var parsed = null;
  try {
    parsed = JSON.parse(jsonString)
  } catch (e) {
    parsed = "error";
  }
  return parsed;
}