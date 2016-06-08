var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { loggedIn: loggedIn(req) });
});

const loggedIn = function(req, res) {
  if(!req.session.user) {
    return false;
  } else {
    return true;
  }
}

module.exports = router;
