'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Upload = require('../models/Upload');
const checkLogIn = require('../middlewares/checkLogIn');


/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.user);
  res.render('index', { loggedIn: checkLogIn.loggedIn(req)});
});

router.route('/upload')
  .post(function(req, res) {
    if(!req.session.user) return res.sendStatus(403);

    const username = req.session.user.username;
    const title = req.body.title;
    const link = req.body.link;
    const description = req.body.description;
    const createdAt = new Date();

    let newUpload = new Upload();
    newUpload.username = username;
    newUpload.title = title;
    newUpload.link = link;
    newUpload.description = description;
    newUpload.createdAt = createdAt;
    newUpload.save(function(err, savedUpload) {
      if(err) return res.sendStatus(500);

      console.log(savedUpload);
      return res.send('OK!').status(200);
    });
  });

router.route('/register')
  .post(function(req, res) {
    const name = { firstname: req.body.firstname, lastname: req.body.lastname };

    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);

    //Should probably make /register its own route, and if the username is valid, send a 200 http status code and send the information here.
    //That way /api/register only takes the 200 status codes
    if(username != username.match(/^[a-z\d]+$/i))  return res.sendStatus(403);

    let newUser = new User();
    newUser.name = name;
    newUser.username = username;
    newUser.password = password;
    newUser.save(function(err) {
      if(err) return res.sendStatus(500);

      return res.send('OK!').status(200);
    });
  });

router.route('/login')
  .post(function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if(err) res.send(err);

      user.comparePassword(req.body.password, function(err, isMatch) {
        if(err) res.send(err);

        //Correct password.
        if(isMatch) {
          req.session.user = user;
          return res.sendStatus(200);
        }
        return res.sendStatus(401);
      });
    });
  });

router.get('/account', function(req, res) {
  if(!req.user)
    return res.redirect('/');
  User.findOne({steamId: req.user.steamId}, function(err, user) {
    return res.render('account', {
      loggedIn: checkLogIn.loggedIn(req),
      personaname: user.personaname
    });
  });
});

module.exports = router;
