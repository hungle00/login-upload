var app = require('./app');
var debug = require('debug')('jwt-auth:server');
var http = require('http');

var port = process.env.PORT || 3000;
app.set('port', port);


// Create HTTP server.
var server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}