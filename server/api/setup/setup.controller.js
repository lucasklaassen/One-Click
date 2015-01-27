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
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var date = moment().format();
    var validUsername = req.body.formData.username.match(usernameRegex);
    var command = "casperjs server/casper/setup.js" + " " + req.body.formData.username + " " + req.body.formData.password;
    if(validUsername !== null){
        console.log(command);
        // exec(command, puts);
    }

};

function handleError(res, err) {
    return res.send(500, err);
}
