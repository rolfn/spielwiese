# Spielwiese

Hier sollen Code-Beispiele zu den Themen "nodejs", "couchdb" usw. gezeigt werden und als Erinnerung dienen.

## Test zu "socket.io"

Mit **[socket.io](http://socket.io/)** ist es möglich, eine permanente Kommunikation via Websocket (wenn nicht vorhanden über andere Kanäle) zwischen einem Server und einem Client (z.B. Web-Browser) aufzubauen. Der Server muss nicht zwangsläufig derselbe sein, der die HTML-Datei ausliefert, so wie im folgenden Beispiel:

### Vorbereitung

```
npm install socket.io
```

### Start des Servers

```
node server.js
```

### Start des Clients

```
firefox http://localhost:9001/
```





