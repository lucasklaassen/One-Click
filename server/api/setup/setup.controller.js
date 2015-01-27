'use strict';

var _ = require('lodash');
var Setup = require('./setup.model');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var moment = require('moment');

function puts(error, stdout, stderr) { sys.puts(stdout) };

// Validate user setup info
exports.check = function(req, res) {
    var username = req.body.username,
        password = req.body.password,
        websiteName = req.body.formData.website,
        websiteURL = req.body.formData.websiteURL,
        city = req.body.formData.city,
        state = req.body.formData.state,
        country = req.body.formData.country;

  var generateSetupCommand = function(username, password, websiteName, websiteURL, city, state, country) {
    var escapeShell = function(cmd) {
      return cmd.replace(/(["\s'$`\\])/g,'\\$1');
    };
    return "casperjs server/casper/designerLaunch/init.js" + " " + username + " " + password + " " + escapeShell(websiteName) + " " + websiteURL + " " + escapeShell(city) + " " + escapeShell(state) + " " + country;
  };

  console.log(generateSetupCommand(username, password, websiteName, websiteURL, city, state, country));
  exec(generateSetupCommand(username, password, websiteName, websiteURL, city, state, country), puts);

  res.send(200);

};

function handleError(res, err) {
    return res.send(500, err);
}
