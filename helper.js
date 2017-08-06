function helper() {}

helper.prototype.safeJSONParse = function (jsonString) {
  var parsed = null;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    parsed = "error";
  }
  return parsed;
};

module.exports = new helper();