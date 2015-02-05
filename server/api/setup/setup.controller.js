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
        fullname = req.body.fullname,
        websiteName = req.body.formData.website,
        websiteURL = req.body.formData.websiteURL,
        wineryEmail = req.body.formData.wineryEmail,
        city = req.body.formData.city,
        state = req.body.formData.state,
        country = req.body.formData.country,
        v65plus = req.body.formData.v65plus;

  var generateSetupCommand = function(username, password, fullname, websiteName, websiteURL, wineryEmail, city, state, country, v65plus) {
    var escapeShell = function(cmd) {
      return cmd.replace(/(["\s'$`\\])/g,'\\$1');
    };
    return "casperjs ./one-click-casper-scripts/designerLaunch.js" + " " + username + " " + password + " " + escapeShell(fullname) + " " + escapeShell(websiteName) + " " + websiteURL + " " + wineryEmail + " " + escapeShell(city) + " " + escapeShell(state) + " " + country + " " + v65plus;
  };

  console.log(generateSetupCommand(username, "password", fullname, websiteName, websiteURL, wineryEmail, city, state, country, v65plus));
  exec(generateSetupCommand(username, password, fullname, websiteName, websiteURL, wineryEmail, city, state, country, v65plus), puts);

  res.send(200);

};

function handleError(res, err) {
    return res.send(500, err);
}
