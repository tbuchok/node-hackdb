var request = require('request')
  , HACK_DB_URL = process.argv[2] || 'http://localhost:8080';

var generateIID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

var hammer = function() {
  var key = generateIID();
  var value = generateIID();

  form = {};
  form[key] = value;
  request.post(HACK_DB_URL, { form : form }, function(e, r, body) {
    qs = {};
    qs['key'] = key;
    (function(qs) {
      request.get(HACK_DB_URL, { qs : qs }, function(e, r, body){
        console.log(body);
      });
    }(qs));
  });
}

for (var i = 0; i < Math.pow(10, 4); i++) hammer();

