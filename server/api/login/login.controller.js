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
  var validUsername = req.body.formData.username.match(usernameRegex);
  var command = "casperjs server/casper/login.js" + " " + req.body.formData.username + " " + req.body.formData.password;
  if(validUsername !== null){
    console.log(command);
    exec(command, puts);
  }

  fs.watch('listOfWebsites.json', function (e) {
    if(e === "change"){
      var options = {
          json: true
      }
      fs.createReadStream('listOfWebsites.json', {
        'bufferSize': 4 * 1024
      }).pipe(res(options));
    }
  });

};

function handleError(res, err) {
  return res.send(500, err);
}
