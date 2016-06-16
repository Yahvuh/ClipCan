'use strict';

const steamWebAPI = require('steam-web');
const key = require('../key');

const steam = new steamWebAPI({
  apiKey: key,
  format: 'json'
});

const findUser = function(id, callback) {
  steam.getPlayerSummaries({
    steamids: id,
    callback: function(err, data) {
      if(err)
        console.log(err);
        
      callback(null, data.response.players[0]);
    }
  });
};

module.exports = findUser;
