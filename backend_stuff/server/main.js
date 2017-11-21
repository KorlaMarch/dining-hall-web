'use strict';

var express  = require('express');
var morgan = require('morgan');
var multer = require('multer');
var config = require('./config');
var bodyParser = require('body-parser');

var app      = express();
const port     = config.port;

app.use(morgan('dev'));

var storage = multer.memoryStorage();
app.use(multer({ storage }).single('newdata'));

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// To allow Cross-Domain Cookie
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

require('./routes.js')(app);

app.listen(port);
console.log('Server start on port ' + port);
