//set-up
var express = require('express');

var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/src/'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/bower_components/'));

app.get('/', function(req, res) {
	res.sendFile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var Gmail_App_Id="141106616952-uvsasftlhc9c6jnjufk64pa65e25anhf.apps.googleusercontent.com";
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

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


	var FacebookStrategy = require('passport-facebook').Strategy;
	var FACEBOOK_APP_ID = "1626633540979575";
	var FACEBOOK_APP_SECRET = "5532ab9c264009645a01e43d02cf4085";

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




app.listen('8080');
console.log("App listening on port 8080");
