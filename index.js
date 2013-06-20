var restify = require('restify')
  , fs = require('fs')
  , server = restify.createServer()
  , hackdb = require('./build/Release/hackdb');

server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser());

server.get('/help', function(req, res, next) {
  fs.createReadStream('README.md').pipe(res);
});

server.get('/', function(req, res, next){
  var message = "Cannot GET an `undefined` value";
  var key = req.query.key
  if (key) {
    var value = hackdb.get(key);
    var message = 'OK! GET key: ' + key + ' -> value: ' + value;
  }
  console.log(message);
  res.end('\n' + message + '\n\n');
});

server.del('/', function(req, res, next){
  var message = "Cannot DEL an `undefined` value";
  var key = Object.keys(req.params)[0];
  if (key) {
    hackdb.del(key);
    var message = 'OK! DEL key: ' + key;
  }
  console.log(message);
  res.end('\n' + message + '\n\n');
});

server.post('/', function(req, res, next) {
  var message = "Cannot SET an `undefined` value";
  var key = Object.keys(req.params)[0];
  if (key) {
    var value = req.params[key];
    hackdb.set(key, value);
    message = 'OK! SET key: ' + key + ' -> value ' + value;
  }
  console.log(message);
  res.end('\n' + message + '\n\n');
});

server.listen(8080, function(){
  console.log("%s listening at %s", server.name, server.url);
});