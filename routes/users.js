const express = require('express');
const router = express.Router();
const User = require('../models/user');

// USERS
router.get('/', function(req, res, next) {
  User.find().exec(function (err, users) {

    res.render('users-index', { users: users });
  });
});

module.exports = router;
