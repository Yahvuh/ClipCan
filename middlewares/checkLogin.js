'use strict';

//Am I good at middlewares yet localhost
const checkLogIn = function(req) {
  if(req.user) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkLogIn;
