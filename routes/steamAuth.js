'use strict';

const router = require('express').Router();
const passport = require('passport');
const checkLogIn = require('../middlewares/checkLogIn');
const steamStrategy = require('../middlewares/steamStrategy');

passport.serializeUser(function(user, done) {
  done(null, user.identifier);
});

passport.deserializeUser(function(identifier, done) {
  done(null, {
    identifier: identifier,
    steamId: identifier.match(/\d+$/)[0],
  });
});

//Use SteamStrategy on passport use
passport.use(steamStrategy);

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

module.exports = router;
