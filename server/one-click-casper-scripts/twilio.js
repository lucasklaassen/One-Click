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
  twilio.login();
  twilio.buyTwilioNumber();
  twilio.addTwilioNumber();
};

exports.login = function() {
  casper.thenOpen('https://www.twilio.com/login', function() {
    this.fill('form', {
      'email': auth.twilioUser(),
      'password': auth.twilioPass()
    }, true);
  });
};

exports.buyTwilioNumber = function() {
  casper.wait(2000, function() {
    this.thenOpen('https://www.twilio.com/user/account/phone-numbers/search', function() {
      this.wait(5000, function() {
        this.click('.selectize-control.country > .selectize-input');
        this.wait(1000, function(){
          this.click('.selectize-dropdown.country > .selectize-dropdown-content > [data-value="'+userInputWebsiteCountry+'"]');
        });
        this.wait(1000, function() {
          console.log('twilio sequence');
        });
      });
      this.then(function() {
        this.wait(1000, function() {
          this.click('.selectize-control.prepend > .selectize-input');
          this.wait(1000, function() {
            this.click('.selectize-dropdown.prepend > .selectize-dropdown-content > [data-value="location"]');
          });
          this.wait(1000, function() {
            if(userInputWebsiteCity.length){
              var searchTerm = userInputWebsiteCity + ", " + userInputWebsiteState;
            } else {
              var searchTerm = userInputWebsiteState;
            }
            this.fill('[action="/user/account/phone-numbers/search/results"]', {
              'searchTerm': searchTerm
            }, true);
            this.wait(5000, function() {
              this.click('#numbers-list > tbody > tr:nth-child(1) > td.text-center > a');
            });
            this.wait(3000, function() {
              this.click('[name="buy-number-button"]');
            });
            this.wait(5000, function(){
              this.click('.modal-footer > .btn.btn-primary');
            });
            this.wait(5000, function() {
              this.click('.icon-pencil');
              var SMSNumber = this.evaluate(function(userInputWebsiteName) {
                $('[name="FriendlyName"]').val(userInputWebsiteName);
                $('[name="FriendlyName"]').attr('value', userInputWebsiteName)
                $('#SmsUrl').val("https://systemtools.uswest.vin65.com/twilio/receiveText.cfm");
              }, userInputWebsiteName);
            });
            this.wait(1000, function() {
              this.click('[data-analytics-title="configure-number-save"]');
            });
            this.wait(4000, function() {
              var SMSNumber = this.evaluate(function() {
                var number = $('[data-s="phone-number"]').text();
                return number.replace('+1', '');
              });
              this.echo("SMS Number: " + SMSNumber);
              vin65LoginAndValidate.init();
              twilio.addTwilioNumber(SMSNumber);
              oneClick.stageComplete('#twilioComplete', 'Twilio SMS Number was successfully added!');
            });
          });
        });
      });
    });
  });
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
