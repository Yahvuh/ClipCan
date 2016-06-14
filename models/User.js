'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs'),
  SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  name: {
    firstname: String,
    lastname: String
  },
  username: {type: String, index: {unique: true}},
  password: String,
  createdAt: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next) {
  const user = this;
//  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  user.createdAt = date;
  //user.timeString = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " at " + date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
  if(!user.isModified('password'))
    return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err)
      return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err)
        return next(err);

      user.password = hash;
      next();
    });
  });

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err)
      return cb(err);

    cb(null, isMatch);
  });
}

const User = mongoose.model('user', userSchema);
module.exports = User;
