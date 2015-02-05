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
          if(userInputWebsiteCountry === "CAN") {
            this.click('.selectize-dropdown.country > .selectize-dropdown-content > [data-value="CA"]');
          } else if(userInputWebsiteCountry === "AUS") {
            this.click('.selectize-dropdown.country > .selectize-dropdown-content > [data-value="AU"]');
          } else {
            this.click('.selectize-dropdown.country > .selectize-dropdown-content > [data-value="'+userInputWebsiteCountry+'"]');
          }
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
              twilio.sendSupportEmail(SMSNumber);
              oneClick.stageComplete('.twilioComplete', 'Twilio SMS Number was successfully added!');
            });
          });
        });
      });
    });
  });
};

exports.addTwilioNumber = function(SMSNumber) {
  casper.then(function() {
    oneClick.addFrame("websiteSettings", "/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings");
    oneClick.addFrame("wineDirectSettings", "/settings/index.cfm?method=websiteSettings.WineDirectSettings");
    this.wait(4000, function() {
      this.evaluate(function(SMSNumber) {
        $('.wineDirectSettings').contents().find('[name="fromPhoneNumber"]').val(SMSNumber);
        $('.wineDirectSettings').contents().find('[name="hasTextMessage"]').attr('checked', true);
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


exports.sendSupportEmail = function(SMSNumber) {
  casper.then(function(){
    oneClick.addFrame("supportEmail", "/2014/support/index.cfm?method=ticketsAdmin.add");
    casper.then(function(){
      this.wait(4000, function() {
        //build list of websites available to the user
        this.evaluate(function() {
          $('.websiteSettings').remove();
        });
        this.withFrame('supportEmail', function() {
          this.capture("setupSupport1.png");
          var websitelistSelector = "select[name='reporterWebsiteID'] option";
          var listOfWebsiteNames = this.getElementsInfo(websitelistSelector);
           for (var i = 0; i < listOfWebsiteNames.length; i++) {
             if(listOfWebsiteNames[i].text === userInputWebsiteName) {
               var WebsiteID = listOfWebsiteNames[i].attributes.value;
               console.log("An ID was grabbed for the website " + userInputWebsiteName);
             }
           }
          var WebsiteID = utils.serialize(WebsiteID).replace(/"/g, '');
          this.then(function() {
            this.wait(3000, function() {
              this.fill('[action="index.cfm?method=ticketsAdmin.addSuccessJSON"]', {
                  'reporterWebsiteID': WebsiteID,
                  'ticketCategoryID': "D6B6EDE8-0DDB-BEE7-9D5C-3A8F0EDE7EA0",
                  'reporter': userInputWebsiteName,
                  'reporterEmail': userInputWineryEmail,
                  'summary': "Text Message Feature Setup",
                  'ticketDescription': 'Vin65+ Request for Text Message Feature. <p>Hello '+ userInputWebsiteName +',</p><p>Thank you for signing up for to the Vin65+ package, we are excited to bring you each of the new features included in the plan. We have completed the setup of the Text Message Feature and wanted to notify you of your new text message number it is:</p><p><strong>'+ SMSNumber +'</strong></p><p>For setup information please see: <a href="http://documentation.vin65.com/Contacts/Text-Messages">http://documentation.vin65.com/Contacts/Text-Messages</a></p><p>If you have any questions or concerns please respond to this ticket or contact us at support@vin65.com.&nbsp;</p><p>Thanks very much,</p><p>'+ userFullName +'</p>',
                  'emailReporter': 1
              }, true);
            });
          });
        });
      });
    });
  });
};
