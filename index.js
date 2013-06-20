var restify = require('restify')
  , server = restify.createServer()
  , hackdb = require('./build/Release/hackdb');

server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser());



server.get('/', function(req, res, next){
  var message = "\nCannot GET an `undefined` value\n\n";
  var key = req.query.key
  if (key) {
    var value = hackdb.get(key);
    var message = '\nOK! GET key: ' + key + ' -> value: ' + value + '\n\n';
  }
  res.end(message);
});

server.post('/', function(req, res, next) {
  var message = "\nCannot SET an `undefined` value\n\n";
  var key = Object.keys(req.params)[0];
  if (key) {
    var value = req.params[key];
    hackdb.set(key, value);
    message = '\nOK! SET key: ' + key + ' -> value ' + value + '\n\n';
  }
  res.end(message);
});

server.listen(8080, function(){
  console.log("%s listening at %s", server.name, server.url);
});