// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  var test = require('cloud/test.js');
  response.success(test.sayHi());
});

