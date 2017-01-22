// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Gmail_App_Id="141106616952-uvsasftlhc9c6jnjufk64pa65e25anhf.apps.googleusercontent.com";
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = "1626633540979575";
var FACEBOOK_APP_SECRET = "5532ab9c264009645a01e43d02cf4085";

// mongoose
mongoose.connect('mongodb://localhost/litmusCC');

// user schema/model
var User = require('./models/user.js');

// create instance of express
var app = express();

// require routes
var routes = require('./routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, '../src')));
app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));
app.use('/node_modules',  express.static(path.join(__dirname, '../node_modules')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//configure for g+ and facebook
passport.use(new GoogleStrategy({
    clientID:     Gmail_App_Id,
  //  clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

	passport.use(new FacebookStrategy({
	    clientID:FACEBOOK_APP_ID,
	    clientSecret:FACEBOOK_APP_SECRET,
	    callbackURL: "http://localhost:8080/"
	  },
	  function(accessToken, refreshToken, profile, cb) {
	    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
	      return cb(err, user);
	    });
	  }
	));
	app.get('/auth/facebook',
	  passport.authenticate('facebook'));

	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.status(200).json({
        status: 'Login successful'
      });
      res.redirect('/');
	  });

			app.get('/auth/google',
			  passport.authenticate('google', { scope:
			    [ 'https://www.googleapis.com/auth/plus.login',
			      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
			));

			app.get( '/auth/google/callback',
			    passport.authenticate( 'google', {
			        successRedirect: '/auth/google/success',
			        failureRedirect: '/auth/google/failure'
			}));

// routes
app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
