//Am I good at middlewares yet localhost
var checkLogIn = function(req) {
  if(req.user) {
    console.log('t')
    return user = true;
  } else {
    console.log('f');
    return user = false;
  }
};

module.exports = checkLogIn;
