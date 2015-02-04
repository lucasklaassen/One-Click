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
    casper.evaluate(function() {
      $('.websiteSettingsFunctions').contents().find('input').prop('checked', true);
    });
  }
  var initSelectOptions = function() {
    casper.evaluate(function() {
      var copyPagesBoolean;
      var setWebsiteID = function(id) {
        $('.websiteSettingsFunctions').contents().find("select[name='fromWebsiteID']").val(id);
      }
      $('.websiteSettingsFunctions').contents().find("select[name='fromWebsiteID']").find('option').each(function(){
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
        } else {
          copyPagesBoolean = false;
        }
      });
      return copyPagesBoolean;
    });
  }
  var initSubmit = function() {
    casper.withFrame('websiteSettingsFunctions', function() {
      this.click('#popupFooterRight > a > img');
    });
  }
  //Website Settings Automation
  casper.then(function() {
      this.evaluate(function() {
        $('html').prepend('<iframe src="/settings/index.cfm?method=websiteSettings.loadSettings" name="websiteSettings" class="websiteSettings"></iframe');
        $('html').prepend('<iframe name="websiteSettingsFunctions" class="websiteSettingsFunctions"></iframe>');
      });
    this.wait(1000, function(){
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[0]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function(){
      initCheckboxes();
      this.wait(1000, function() {
        initSubmit();
      });
    });
    this.wait(4000, function() {
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[1]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function(){
      var copyPages = initSelectOptions();
      this.wait(2000, function() {
        if(copyPages === false) {
          this.echo("There are no websites to copy pages from. :( ").exit();
        }
      });
      this.wait(1000, function() {
        initSubmit();
      });
      this.wait(4000, function() {
        this.evaluate(function(websiteSettingsPagesArray) {
          $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[2]);
        }, websiteSettingsPagesArray);
      });
      this.wait(1000, function() {
        initCheckboxes();
      });
      this.wait(1000, function() {
        initSubmit();
      });
    });
    this.wait(4000, function() {
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[3]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function() {
      initCheckboxes();
    });
    this.wait(1000, function() {
      initSubmit();
    });
    this.wait(4000, function() {
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[4]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function() {
      var copyPages = initSelectOptions();
      this.wait(2000, function() {
        if(copyPages === false) {
          this.echo("There are no websites to copy pages from. :( ").exit();
        }
      });
    });
    this.wait(1000, function() {
      initCheckboxes();
    });
    this.wait(1000, function() {
      initSubmit();
    });
    this.wait(4000, function() {
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[5]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function() {
      var copyPages = initSelectOptions();
      this.wait(2000, function() {
        if(copyPages === false) {
          this.echo("There are no websites to copy pages from. :( ").exit();
        }
      });
    });
    this.wait(1000, function() {
      initSubmit();
    });
    this.wait(4000, function() {
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[6]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function() {
      var copyPages = initSelectOptions();
      this.wait(2000, function() {
        if(copyPages === false) {
          this.echo("There are no websites to copy pages from. :( ").exit();
        }
      });
    });
    this.wait(1000, function() {
      initSubmit();
    });
    this.wait(4000, function() {
      this.evaluate(function(websiteSettingsPagesArray) {
        $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[7]);
      }, websiteSettingsPagesArray);
    });
    this.wait(1000, function() {
      var copyPages = initSelectOptions();
      this.wait(2000, function() {
        if(copyPages === false) {
          this.echo("There are no websites to copy pages from. :( ").exit();
        }
      });
    });
    this.wait(1000, function() {
      initSubmit();
    });
    // Quick Settings
    this.then(function() {
      this.wait(4000, function(){
        this.evaluate(function(websiteSettingsPagesArray) {
          $('.websiteSettingsFunctions').attr("src", websiteSettingsPagesArray[8]);
        }, websiteSettingsPagesArray);
      });
      this.wait(1000, function() {
        var copyPages = initSelectOptions();
        this.wait(2000, function() {
          if(copyPages === false) {
            this.echo("There are no websites to copy pages from. :( ").exit();
          }
        });
      });
      this.wait(1000, function() {
        this.evaluate(function(userInputWebsiteCountry) {
          $('.websiteSettingsFunctions').contents().find('[name="countryCode"]').val(userInputWebsiteCountry);
        }, userInputWebsiteCountry);
        initSelectOptions();
      });
      this.wait(1000, function() {
        initSubmit();
      });
    });
    this.then(function() {
      this.wait(30000, function() {
        this.evaluate(function() {
          $('html').prepend('<div id="websiteFunctionsComplete"></div>');
        });
      });
    });
  });
oneClick.stageComplete('#websiteFunctionsComplete', 'Website Functions were run successfully!');
};
