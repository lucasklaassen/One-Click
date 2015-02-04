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
  casper.thenEvaluate(function() {
    $('html').prepend('<iframe src="/settings/index.cfm?method=websiteSettings.loadSettings" name="websiteSettings" class="websiteSettings"></iframe');
    $('html').prepend('<iframe name="websiteSettingsFunctions" class="websiteSettingsFunctions"></iframe>');
    $('.websiteSettingsFunctions').css('height', '200px');
    $('.websiteSettingsFunctions').css('width', '200px');
  });
  casper.then(function() {
    this.wait(2000, function() {
      this.evaluate(function() {
        $('.websiteSettingsFunctions').attr('src', '/settings/index.cfm?method=websiteSettings.CopyPages');
      });
    });
    this.then(function() {
      this.withFrame('websiteSettingsFunctions', function() {
        var websitelistSelector = "select[name='fromWebsiteID'] option";
        var listOfWebsiteNames = this.getElementsInfo(websitelistSelector);
        var websiteToCopyFrom = false;
        for(var i = 0; i < listOfWebsiteNames.length; i++) {
            if(listOfWebsiteNames[i].text === "Vin65 Designer Launch Template") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Pages Template Vin65") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Pages Template Vin65Cloud") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Pages Template Vin65Cloud2 ") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Pages Template Vin65cloud3") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Pages Template Vin65Cloud4") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Australia Template 1") {
              websiteToCopyFrom = true;
            } else if(listOfWebsiteNames[i].text === "Vin65 Pages Template IBG") {
              websiteToCopyFrom = true;
            }
        }
        if(!websiteToCopyFrom) {
          this.echo("No Websites to copy from").exit();
        }
      });
    });
  });
};
