'use strict';

var _ = require('lodash');
var Login = require('./login.model');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var moment = require('moment');

function puts(error, stdout, stderr) { sys.puts(stdout) };

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if(err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch(exception) {
            callback(exception);
        }
    });
};

var initRead = function(res, filename) {
    readJSONFile(filename, function (err, json) {
        if(err) { throw err; }
        res.send(json);
    });
};

// Get list of websites
exports.index = function(req, res) {
    initRead(res, 'server/api/listOfWebsites.json');
};

// Validate user login info
exports.check = function(req, res) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var date = moment().format();
    var validUsername = req.body.formData.username.match(usernameRegex);
    var command = "casperjs server/one-click-casper-scripts/loginGenerateWebsites.js" + " " + req.body.formData.username + " " + req.body.formData.password;
    if(validUsername !== null){
        console.log(command);
        exec(command, puts);
    }

    fs.watch('server/api/listOfWebsites.json', function (e) {
        if(e === "change"){
            res.send(200);
        }
    });

};

function handleError(res, err) {
    return res.send(500, err);
}
