'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LoginSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Login', LoginSchema);