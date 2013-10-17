# Spielwiese

Hier sollen Code-Beispiele zu den Themen "nodejs", "couchdb" usw. gezeigt werden und als Erinnerung dienen.

## "socket.io"

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

## "winston"

Modul `vlogger`. Exportiert eine Funktion, die eine singleton-Logger-Instanz liefert. Das optionale Konfigurationsobjekt entspricht dem von **[winston](https://github.com/flatiron/winston/blob/master/README.md)**. Zusätzlich zu den beim Original vorhandenen Funktionen kann mit `disable` die log-Ausgabe für sämtliche registrierten Transportwege unterdrückt bzw. mit `enable` wieder aktiviert werden. Das Format der log-Ausgabe ist feststehend:

```
2013-10-17 08:53:10.862 - info: [FILENAME:LINENUMBER:FUNCTIONNAME] TEXT
```








