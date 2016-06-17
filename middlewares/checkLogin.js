'use strict';

//Am I good at middlewares yet localhost
const checkLogIn = {
  loggedIn: function(req) {
    if(req.user) {
      return true;
    } else {
      return false;
    }
  },
  personaName: function(req, callback) {
    if(!req.user) {
      console.log('No user');
      return null;
    } else {
      //console.log(req.user);
      callback(null, req.user.personaname);
    }
  }

};

module.exports = checkLogIn;
