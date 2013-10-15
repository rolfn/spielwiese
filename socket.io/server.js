var app = require('http').createServer(handler),
     io = require('socket.io').listen(app, {log: false}),
     fs = require('fs'),
     inspect = require('util').inspect;

app.listen(9001);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

var clients = {};

io.sockets.on('connection', function (socket) {
  clients[socket.id] = socket; // register client.
  console.log('client ' + '(' + socket.id + ') connected');
  socket.emit('from server',
    { server: 'client ' + '(' + socket.id + ') connected' });
  socket.on('from client', function (data) {
    console.log(inspect(data));
    socket.emit('from server',
    { server: 'your message was: ' + inspect(data) });
  });
  socket.on('disconnect', function () {
    console.log('client ' + '(' + socket.id + ') disconnected');
    delete clients[socket.id]; // unregister client.
  });
  socket.on('forceDisconnect', function () {
    socket.emit('from server',
      { server: 'client ' + '(' + socket.id + ') disconnect' });
    socket.disconnect();
  });
});

