'use strict';

const router = require('express').Router();
const passport = require('passport');
const checkLogIn = require('../middlewares/checkLogIn');

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
  res.render('index', { user: checkLogIn(req) });
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

// function steamLoggedIn(req) {
//   if(req.user) {
//     return user = true;
//   } else {
//     return user = false;
//   }
// };

module.exports = router;
