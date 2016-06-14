'use strict'

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Upload = require('../models/Upload');

/* API specific routes */

router.route('/:username')
  .get(function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if(err)
        return res.sendStatus(404);

      return res.send(user)
    })
  });


module.exports = router;
