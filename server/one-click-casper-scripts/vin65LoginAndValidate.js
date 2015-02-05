//Vin65 Login To Admin Panel and Validate Website
var require = patchRequire(require);

// Assets
var oneClick = require('./utilities/globalFunctions');
var jQuery = require('./utilities/jquery');
var auth = require('./utilities/authentication');
var googleAnalytics = require('./googleAnalytics');
var twilio = require('./twilio');
var utils = require('utils');

exports.init = function() {
  vin65LoginAndValidate.login();
  vin65LoginAndValidate.getWebsiteID();
  vin65LoginAndValidate.validateWebsiteID();
}

exports.login = function() {
  casper.thenOpen('https://www.vin65.com/components/clientLogin', function() {
    this.fill('#loginForm', { ClientU: username, ClientP: password }, true);
  });
};

exports.getWebsiteID = function() {
  casper.then(function(){
    this.wait(4000, function() {
      //build list of websites available to the user
      var websitelistSelector = "select[name='WebsiteID'] option";
      var listOfWebsiteNames = this.getElementsInfo(websitelistSelector);
       for (var i = 0; i < listOfWebsiteNames.length; i++) {
         if(listOfWebsiteNames[i].text === userInputWebsiteName) {
           var WebsiteID = listOfWebsiteNames[i].attributes.value;
           console.log("An ID was grabbed for the website " + userInputWebsiteName);
         }
       }
      if(!WebsiteID.length) {
        this.die("Error: Website not found.");
      }
      var WebsiteID = utils.serialize(WebsiteID);
      //Navigate to the website provided by the user
      this.evaluate(function(WebsiteID) {
        var newID = WebsiteID.replace(/"/g, '');
        $('a.masterlink').trigger('click');
        $('select[name="WebsiteID"]').val(newID).change();
        $('form[action="/index.cfm?method=login.processWebsitePicker"]').submit();
      }, WebsiteID);
    });
  });
};

exports.validateWebsiteID = function() {
  //Check to see if casper navigated to the correct website IMPORTANT
  casper.then(function() {
    this.wait(5000, function() {
      oneClick.addFrame("websiteSettings", "/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings");
      this.wait(4000, function() {
        this.withFrame('websiteSettings', function() {
          this.withFrame('EditWindow', function() {
            var websitelistSelector = "#accordion > div:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)";
            var listOfWebsiteNames = this.getElementsInfo(websitelistSelector);
            if(listOfWebsiteNames[0].text === userInputWebsiteName){
              this.echo(userInputWebsiteName + ' was navigated to successfully');
            } else {
              this.capture('Fatal-Error-#1.png').echo('Fatal Error #1: Screenshot Captured').exit();
            }
          });
        });
      });
    });
  });
};
