'use strict';

const router = require('express').Router();
const passport = require('passport');

//Steam Strategy specific
const OpenIDStrategy = require('passport-openid').Strategy;
const SteamStrategy = new OpenIDStrategy({
  providerURL: 'http://steamcommunity.com/openid',
  stateless: true,
  returnURL: 'http://localhost:3000/auth/openid/return',
  realm: 'http://localhost:3000',
  },
  function(identifier, done) {
    process.nextTick(function() {
      const user = {
        identifier: identifier,
        steamId: identifier.match(/\d+$/)[0]
      };

      return done(null, user);
    });
  });

passport.serializeUser(function(user, done) {
  done(null, user.identifier);
});

passport.deserializeUser(function(identifier, done) {
  done(null, {
    identifier: identifier,
    steamId: identifier.match(/\d+$/)[0]
  });
});

//Use SteamStrategy on passport use
passport.use(SteamStrategy);

/*
 = = = = = /AUTH ROUTES = = = = =
*/

router.get('/', function(req, res) {
  console.log(req.user);
  res.render('index', { user: steamLoggedIn(req) });
});

router.post('/openid', passport.authenticate('openid'));

router.get('/openid/return', passport.authenticate('openid'),
  function(req, res) {
    if(req.user) {
      //res.redirect('/?steamid=' + req.user.steamId);
      res.redirect('/');
    } else {
      res.redirect('/?failed');
    }
  });

router.post('/logout', function(req, res) {
  req.logout();
  res.redirect(req.get('Referer') || '/');
});

function steamLoggedIn(req, res) {
  if(req.user) {
    return true;
  } else {
    return false;
  }
};

module.exports = router;
