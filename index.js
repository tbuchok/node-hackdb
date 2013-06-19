var http = require('http')
  , hackdb = require('./build/Release/hackdb');

hackdb.set('foo', 'bar');

http.createServer(function(req, res){
  var result = hackdb.get('foo');
  res.end(result);
}).listen(8000);