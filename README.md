# Spielwiese

Hier sollen Code-Beispiele zu den Themen "nodejs", "couchdb" usw. gezeigt werden und als Erinnerung dienen.

## Test zu "socket.io"

Mit **[socket.io](http://socket.io/)** ist es möglich, eine permanente Kommunikation via Websocket (wenn nicht vorhanden über andere Kanäle) zwischen einem Server und einem Client (z.B. Web-Browser) aufzubauen. Der Server muss nicht zwangsläufig derselbe sein, der die HTML-Datei ausliefert, so wie im folgenden Beispiel:

### Vorbereitung

```
npm install socket.io
```

### Code des Servers (server.js):

```javascript
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

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

io.sockets.on('connection', function (socket) {
  socket.emit('from server', { server: 'I am the server' });
  socket.on('from client', function (data) {
    console.log(JSON.stringify(data));
    socket.emit('from server', { server: data });
  });
});
```

### Code des Clients (index.html):

```html
<html>
<head>
  <script type="text/javascript"
    src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js">
  </script>
  <script type="text/javascript" src="/socket.io/socket.io.js" ></script>
  <script>
    $(document).ready(function() {
      var socket = io.connect('http://localhost');
      socket.on('from server', function (data) {
        console.log(data);
        $('#data').text($('#data').text() + '\n' + JSON.stringify(data));
      });
      $('#send').click(function () {
        socket.emit('from client', { client: 'I am the client' });
      });
    });
  </script>
</head>

<body>
  <textarea id="data" cols="120" rows="10" ></textarea><br />
  <input type="button" value="Message to Server" id="send" />
</body>
</html>

```

### Start des Servers

```
node server.js
```

### Aufruf des Clients

```
firefox http://localhost:9001/
```





