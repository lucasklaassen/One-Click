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
  vin65LoginAndValidate.init();
  oneClick.addFrame("websiteSettings", "/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings");
  oneClick.addFrame("wineDirectSettings", "/settings/index.cfm?method=websiteSettings.WineDirectSettings");
  casper.then(function() {
    this.wait(4000, function() {
      this.evaluate(function(SMSNumber) {
        $('.wineDirectSettings').contents().find('[name="hasAfterShip"]').attr('checked', true);
      }, SMSNumber);
    });
    this.wait(4000, function() {
      this.evaluate(function() {
        $('.wineDirectSettings').contents().find('form[action="index.cfm?method=websiteSettings.WineDirectSettingsSuccess"]').submit();
      });
      oneClick.addFrame("twilioComplete");
    });
  });
};
