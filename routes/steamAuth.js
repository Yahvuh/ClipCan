'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkLogIn = require('../middlewares/checkLogIn');
const steamStrategy = require('../middlewares/steamStrategy');
const User = require('../models/User');
const findUser = require('../middlewares/findUser');

passport.serializeUser(function(user, done) {
  findUser(user.steamId, function(err, data) {
    if(err)
      console.log(err);
    user.personaname = data.personaname;
    let newUser = new User();
    newUser.steamId = user.steamId;
    newUser.personaname = data.personaname;
    newUser.save(function(err, savedUser) {
      if(err) console.log(err);

      console.log(savedUser);
    });
  });
  done(null, user.identifier);
});

passport.deserializeUser(function(identifier, done) {
  done(null, {
    identifier: identifier,
    steamId: identifier.match(/\d+$/)[0]
  });
});

//Use SteamStrategy on passport use
passport.use(steamStrategy);

/*
 = = = = = /AUTH ROUTES = = = = =
*/

router.get('/', function(req, res) {
  res.render('index', { user: checkLogIn.loggedIn(req) });
});

router.post('/openid', passport.authenticate('openid'));

router.get('/openid/return', passport.authenticate('openid'),
  function(req, res) {
    if(req.user) {
        console.log(req.user);
      //res.redirect('/?steamid=' + req.user.steamId);
      res.redirect('/account');
    } else {
      res.redirect('/?failed');
    }
  });

router.post('/logout', function(req, res) {
  req.logout();
  res.redirect(req.get('Referer') || '/');
});

module.exports = router;
