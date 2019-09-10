const passport = require('passport');

const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const User = require('../models/user');


passport.use(new GoogleStrategy({
        clientID: '9699437797-n0v534ssokcsv64u4jk9bbn2tounv57s.apps.googleusercontent.com',
        clientSecret: '9cP5SMe-QPbXarq_rlJwHU9-',
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        User.findOrCreate({ username: profile.username }, (err, user) => {
                
            if (err) {
                return done(err);
            }

            return done(null, user);
        });
    }));

passport.use(new TwitterStrategy({
        consumerKey: 'O67oLg5abIDmhsv9tcr0gP24E',
        consumerSecret: 'ItfeRHA4Lq9oVTg9DlhO0gVvQkrIB9MIIR2eDscEDDBIQPPEzh',
        callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        User.findOrCreate({ username: profile.username }, (err, user) => {
                
            if (err) {
                return done(err);
            }

            return done(null, user);
        });
    })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;