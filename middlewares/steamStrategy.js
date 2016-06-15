'use strict';

//Steam Strategy specific
const OpenIDStrategy = require('passport-openid').Strategy;
const steamStrategy = new OpenIDStrategy({
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

module.exports = steamStrategy;
