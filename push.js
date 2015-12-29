var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  parser = new require('xml2json'),
  fs = require('fs');

app.listen('1976');

console.log('server is listening @ localhost:1976');

function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function(socket) {
  console.log(__dirname);
  fs.watchFile(__dirname + '/somedata.xml', function(curr, prev) {
    fs.readFile(__dirname + '/somedata.xml', function(err, data) {
      if (err) throw err;
      var json = parser.toJson(data);
      socket.volatile.emit('notification', json);
    });
  });
});
