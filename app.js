var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var jwt = require('express-jwt');
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
const url = 'mongodb://localhost/jwt-template';
mongoose.connect(url, { useNewUrlParser: true });

global.__basedir = __dirname;

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');

var app = express();

app.use(cookieParser())

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({ 
  secret: 'shhhared-secret',
  getToken: function fromHeaderOrCookie (req) { //fromHeaderOrQuerystring
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;  
  }
}).unless({path: ['/', '/login', '/sign-up', '/posts']}));

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);


module.exports = app;
