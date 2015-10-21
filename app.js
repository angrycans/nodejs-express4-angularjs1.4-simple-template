var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var mongoose = require('mongoose');

var dbSchema=require('./lib/dbSchema.js');

var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Access-Control-Allow-Origin
app.use(function(req, res, next) {
  if(req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if(req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  }
  if(req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  }
  next();
});

dbSchema.init();
app.use(expressSession({
  secret: 'acans',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl:10,
    //autoRemove: 'interval',
    //autoRemoveInterval: 1, // In minutes. Default
    //ttl: 14 * 24 * 60 * 60,
  })
}));
app.use('/api/v1', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {


 // console.log("1--->");
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end(/* icon content here */);
  } else {
    console.log('err-->',req.session,req.sessionID);

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    //console.log("3--->");
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
 // console.log("2--->");
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
