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

exports.init = function(){
  vin65LoginAndValidate.init();
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
                'ticketDescription': 'Vin65+ Request for Text Message Feature. <p>Hello '+ userInputWebsiteName +',</p><p>Thank you for signing up for to the Vin65+ package, we are excited to bring you each of the new features included in the plan. We have completed the setup of the Text Message Feature and wanted to notify you of your new text message number it is:</p><p><strong>1231231234</strong></p><p>For setup information please see: <a href="http://documentation.vin65.com/Contacts/Text-Messages">http://documentation.vin65.com/Contacts/Text-Messages</a></p><p>If you have any questions or concerns please respond to this ticket or contact us at support@vin65.com.&nbsp;</p><p>Thanks very much,</p><p>'+ userFullName +'</p>',
                'emailReporter': 1
            }, true);
          });
        });
      });
    });
  });
  casper.wait(10000, function() {
    this.capture("setupSupport2.png");
  });
};
