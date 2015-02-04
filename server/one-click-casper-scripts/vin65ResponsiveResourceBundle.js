//Vin65 Admin Panel Setup
var require = patchRequire(require);

// Assets
var oneClick = require('./utilities/globalFunctions');
var jQuery = require('./utilities/jquery');
var auth = require('./utilities/authentication');
var googleAnalytics = require('./googleAnalytics');
var vin65LoginAndValidate = require('./vin65LoginAndValidate');
var twilio = require('./twilio');
var utils = require('utils');

exports.init = function() {
  casper.thenEvaluate(function() {
    $('html').prepend('<iframe name="resourceBundle" class="resourceBundle"></iframe>');
    $('.resourceBundle').css('height', '200px');
    $('.resourceBundle').css('width', '200px');
  });
  casper.then(function() {
    this.wait(2000, function() {
      this.evaluate(function() {
        $('.resourceBundle').attr('src', '/2014/settings/index.cfm?method=resourceBundles.editGeneral&resourceBundleElementID=7C6BED3A-C812-46AA-8174-C2190B51C866');
      });
    });
    this.wait(4000, function() {
      this.evaluate(function() {
        $('.resourceBundle').contents().find("input[value='Update Item']").val("Update");
        $('.resourceBundle').contents().find("form[action='index.cfm?method=resourceBundles.editGeneralSuccessJSON']").submit();
      });
    });
  });
  casper.then(function() {
    this.wait(2000, function() {
      this.evaluate(function() {
        $('.resourceBundle').attr('src', '/2014/settings/index.cfm?method=resourceBundles.editGeneral&resourceBundleElementID=F7CAD609-0DC2-4455-96E3-5A1E0452C3C5');
      });
    });
    this.wait(4000, function() {
      this.evaluate(function() {
        $('.resourceBundle').contents().find("input[value='Remove Item']").val("Remove");
        $('.resourceBundle').contents().find("form[action='index.cfm?method=resourceBundles.editGeneralSuccessJSON']").submit();
      });
    });
  });
};
