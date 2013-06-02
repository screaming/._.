
/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./app/controllers')
  , storage = require('./app/storage')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')
  , mongoose = require('mongoose');

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('oiqwjuoi4eutnvaiojflkajpodiwdhugehqvoint;ortj[0qvt0,p92375ptqmtovkavawfvw'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', controllers.index);
app.get('/dashboard/:id', controllers.dashboard);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
