'use strict';

var _ = require('lodash');
var Login = require('./login.model');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var moment = require('moment');

function puts(error, stdout, stderr) { sys.puts(stdout) }

// Get list of logins
exports.index = function(req, res) {
  res.send("Trying signing in... Like a man.");
};

exports.check = function(req, res) {
  var usernameRegex = /^[a-zA-Z0-9]+$/;
  var date = moment().format();
  var validUsername = req.body.username.match(usernameRegex);
  var command = "casperjs server/casper/login.js" + " " + req.body.username + " " + req.body.password;
  if(validUsername !== null){
    console.log(command);
    exec(command, puts);
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
