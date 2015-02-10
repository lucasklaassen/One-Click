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
  //Website Settings Pages Array
  var websiteSettingsPagesArray = ['/settings/index.cfm?method=websiteSettings.EditComponents',
  '/settings/index.cfm?method=websiteSettings.CopyPages',
  '/settings/index.cfm?method=websiteSettings.Ecommerce',
  '/settings/index.cfm?method=websiteSettings.Clubs',
  '/settings/index.cfm?method=websiteSettings.CopyWineAttributes',
  '/settings/index.cfm?method=websiteSettings.CopyBlogPosts',
  '/settings/index.cfm?method=websiteSettings.CopyEventCalendars',
  '/settings/index.cfm?method=websiteSettings.CopyShipping',
  '/settings/index.cfm?method=websiteSettings.editQuickSettings'];
  var initCheckboxes = function() {
    casper.wait(1000, function() {
      casper.evaluate(function() {
        $('.websiteSettingsFunctions').contents().find('input').prop('checked', true);
      });
    });
  }
  var initSelectOptions = function() {
    casper.wait(1000, function() {
      casper.evaluate(function() {
        var copyPagesBoolean;
        var setWebsiteID = function(id) {
          $('.websiteSettingsFunctions').contents().find('select').not("[name='countryCode']").val(id);
        }
        $('.websiteSettingsFunctions').contents().find('select').not("[name='countryCode']").find('option').each(function(){
          if($(this).text() === "Vin65 Designer Launch Template") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Pages Template Vin65") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Pages Template Vin65Cloud") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Pages Template Vin65Cloud2 ") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Pages Template Vin65cloud3") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Pages Template Vin65Cloud4") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Australia Template 1") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Pages Template IBG") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else if($(this).text() === "Vin65 Development Kelton") {
            setWebsiteID($(this).val());
            copyPagesBoolean = true;
            return false;
          } else {
            copyPagesBoolean = false;
          }
        });
        return copyPagesBoolean;
      });
    });
  }
  var initSubmit = function() {
    casper.wait(1000, function() {
      casper.withFrame('websiteSettingsFunctions', function() {
        this.click('#popupFooterRight > a > img');
      });
    });
  }
  //Website Settings Automation
  oneClick.addFrame("websiteSettings", "/settings/index.cfm?method=websiteSettings.loadSettings");
  casper.then(function() {
    this.wait(1000, function(){
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[0]);
    });
    initCheckboxes();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[1]);
    });
    initSelectOptions();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[2]);
    });
    initCheckboxes();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[3]);
    });
    initCheckboxes();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[4]);
    });
    initSelectOptions();
    initCheckboxes();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[5]);
    });
    initSelectOptions();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[6]);
    });
    initSelectOptions();
    initSubmit();
    this.wait(4000, function() {
      oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[7]);
    });
    initSelectOptions();
    initSubmit();
    // Quick Settings
    this.then(function() {
      this.wait(4000, function(){
        oneClick.addFrame("websiteSettingsFunctions", websiteSettingsPagesArray[8]);
      });
      this.wait(1000, function() {
        this.evaluate(function(userInputWebsiteCountry) {
          $('.websiteSettingsFunctions').contents().find('[name="countryCode"]').val(userInputWebsiteCountry);
        }, userInputWebsiteCountry);
      });
      this.wait(2000, function() {
        initSelectOptions();
      });
      this.wait(1000, function() {
        casper.withFrame('websiteSettingsFunctions', function() {
          this.fill('[action="index.cfm?method=websiteSettings.editQuickSettingsSuccess"]', {}, true);
        });
      });
    });
    this.then(function() {
      this.wait(35000, function() {
        this.capture("websiteSEttings.png");
        oneClick.addFrame("websiteFunctionsComplete");
      });
    });
  });
oneClick.stageComplete('.websiteFunctionsComplete', 'Website Functions were run successfully!');
};
