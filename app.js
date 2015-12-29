var http = require('http');
var serverport = '8000';
var server = http.createServer(function(req, res){
  res.writeHead(200, {'content-type':'text/plain'});
  res.write('hello\n');
});
//
server.listen("8000");
//
console.log('Web Server Running on port ' + serverport);
