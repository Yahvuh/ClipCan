'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  username: String,
  title: String,
  link: String,
  description: String,
  createdAt: {type: Date, default: Date.now}
});

const Upload = mongoose.model('upload', uploadSchema);
module.exports = Upload;
