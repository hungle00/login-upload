const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const path = require('path');
//var jwt = require('express-jwt');

const auth = require('./middlewares/auth');
require('./config/database')();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
global.__basedir = __dirname;
// AUTH

app.use(expressSession({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(auth.provideLoggedUserForTemplates);

app.use(cookieParser());


// ROUTES
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/upload'));

// ERROR HANDLERS
app.use((req, res, next) => {
    res.status(404).render('errors/404');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).render('errors/500');
});

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});