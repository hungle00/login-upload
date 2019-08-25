const express = require('express');
const router = express.Router();

const User = require('../models/user');
const authCtrl = require('../controllers/auth');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('landing', {title: "blah"});
});

// LOGIN FORM
router.get('/login', (req, res, next) => {
  res.render('users-login');
});

// LOGIN POST
// '/sessions'
router.post('/login', authCtrl.login);

// SIGN UP FORM
router.get('/sign-up', (req, res, next) => {
  res.render('users-sign-up');
});

// SIGN UP POST
router.post('/sign-up', authCtrl.signup)


module.exports = router;
