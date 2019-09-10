const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('../config/passport');
const authCtrl = require('../controllers/auth');

router.route('/register')
    .get((req, res) => res.render('auth/register'))
    /*.post((req, res) => {

        User.register({ username: req.body.username }, req.body.password, (err, user) => {

            if (err) {
                return res.redirect('/auth/register');
            }
            passport.authenticate('local')(req, res, () => {
                res.redirect('/posts');
            });
        });
    }); */
    .post(authCtrl.signup)

router.route('/login')
    .get((req, res) => res.render('auth/login'))
    //.post(passport.authenticate('local', { successRedirect: '/posts', failureRedirect: '/auth/login' }));
    .post(authCtrl.login)

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/posts', failureRedirect: '/auth/login' }));

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/posts', failureRedirect: '/auth/login' }));

module.exports = router;