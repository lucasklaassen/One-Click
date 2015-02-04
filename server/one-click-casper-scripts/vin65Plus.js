//Vin65 Admin Panel Setup
var require = patchRequire(require);

// Assets
var oneClick = require('./utilities/globalFunctions');
var jQuery = require('./utilities/jquery');
var auth = require('./utilities/authentication');
var googleAnalytics = require('./googleAnalytics');
var vin65 = require('./vin65');
var vin65Plus = require('./vin65Plus');
var twilio = require('./twilio');
var utils = require('utils');

exports.initTwilio = function() {
  twilio.login();
  twilio.buyNumber();
};

exports.addTwilioNumber = function(SMSNumber) {
  casper.then(function() {
    this.evaluate(function() {
      $('html').prepend('<iframe src="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings" class="websiteSettings"></iframe>');
      $('html').prepend('<iframe name="wineDirectSettings" class="wineDirectSettings"></iframe>');
    });
    this.wait(4000, function() {
      this.evaluate(function() {
        $('.wineDirectSettings').attr('src', '/settings/index.cfm?method=websiteSettings.WineDirectSettings');
      });
    });
    this.wait(4000, function() {
      this.evaluate(function(SMSNumber) {
        $('.wineDirectSettings').contents().find('[name="fromPhoneNumber"]').val(SMSNumber);
        $('.wineDirectSettings').contents().find('[name="hasTextMessage"]').attr('checked', true);
      }, SMSNumber);
    });
    this.wait(4000, function() {
      this.evaluate(function() {
        $('.wineDirectSettings').contents().find('form[action="index.cfm?method=websiteSettings.WineDirectSettingsSuccess"]').submit();
        $('html').prepend('<div id="twilioComplete"></div>');
      });
    });
  });
};
