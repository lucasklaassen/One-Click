//Google Analytics Setup
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
  googleAnalytics.login();
  googleAnalytics.addUATrackingCode();
};

exports.login = function() {
  casper.thenOpen('https://www.google.com/analytics', function() {
    this.click("#ga-product-links > span > a:nth-child(1)");
    this.waitForSelector('form[action="https://accounts.google.com/ServiceLoginAuth"]', function() {
      this.fill('form[action="https://accounts.google.com/ServiceLoginAuth"]', {
        'Email': auth.GAuser(),
        'Passwd': auth.GApass()
      }, true);
    });
  });
};

exports.addUATrackingCode = function() {
  casper.then(function() {
    this.wait(4000, function() {
    casper.page.injectJs('./one-click-casper-scripts/utilities/jquery.js');
      var analyticsMaxName = googleAnalytics.findGreatestProperty();
      this.wait(4000, function() {
        this.echo(analyticsMaxName);
        this.thenOpen('https://www.google.com/analytics/web/?hl=en#management/Settings', function() {
          this.wait(4000, function() {
            this.click('div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > ul > li[title="'+ analyticsMaxName +'"]');
            googleAnalytics.isPropertyFull(analyticsMaxName);
            googleAnalytics.vin65UATrackingCode();
          });
        });
      });
    });
  });
};

exports.findGreatestProperty = function() {
  var analyticsMaxName =  casper.evaluate(function() {
      var analyticsMaxNum = 0;
      var setMaxName = "";
      var websiteAnalytics = $("table > tbody > tr > td > div > div > a").filter(function(idx) {
         return this.innerHTML.indexOf("Web Analytics") == 0;
      });
      websiteAnalytics.each(function() {
        var analyticsNum = $(this).text().replace('Web Analytics ', '');
        if(analyticsNum.length === 1) {
          analyticsNum = '0' + analyticsNum;
        }
        if(analyticsNum > analyticsMaxNum){
          console.log(analyticsNum + " is greater than " + analyticsMaxNum + " " + $(this).text());
          analyticsMaxNum = analyticsNum;
          setMaxName = $(this).text();
        }
      });
      return setMaxName;
    });
  return analyticsMaxName
};

exports.isPropertyFull = function(analyticsMaxName) {
  casper.wait(4000, function() {
    this.page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
    this.waitFor(function check() {
        return !this.exists("[title='Limit reached']");
    }, function then() {    // step to execute when check() is ok
        //Account is not full, add site to new property
        this.clickLabel('Create new property', 'span');
        this.wait(4000, function() {
          this.echo("Setting up a UA-Tracking code for your website...");
          this.click('[data-value="FOOD_AND_DRINK"]');
          this.evaluate(function(userInputWebsiteURL) {
            $('[data-name="webSiteName"]').add('[data-name="defaultUrl"]').val(userInputWebsiteURL);
            $('[data-value="FOOD_AND_DRINK"]').trigger('click');
          }, userInputWebsiteURL);
          this.wait(4000, function() {
            this.click('[data-name="actionFormButton"]');
          });
        });
    }, function timeout() { // step to execute if check has failed
        //Account is full, add a new Account and add site to a new property
        this.wait(1000, function() {
          this.echo( analyticsMaxName + " has 50 websites. Setting up a fresh one...");
          this.clickLabel('Create new account', 'span');
        });
        this.wait(4000, function() {
          this.click('[data-value="FOOD_AND_DRINK"]');
          this.evaluate(function(analyticsMaxName,userInputWebsiteURL) {
            var analyticsNum = analyticsMaxName.replace('Web Analytics ', '');
            $('[data-name="accountName"]').val("Web Analytics " + ++analyticsNum);
            $('[data-name="webSiteName"]').add('[data-name="defaultUrl"]').val(userInputWebsiteURL);
          }, analyticsMaxName,userInputWebsiteURL);
          this.wait(4000, function() {
            this.click('[data-name="actionFormButton"]');
          });
          this.wait(4000, function() {
            this.click('.ACTION-confirmToS');
          });
        });
    });
  });
};

exports.vin65UATrackingCode = function() {
  casper.waitForSelector('#ID-m-content-header > div > div > div', function() {
    this.wait(4000, function() {
      var googleAnalyticsUAcode = this.evaluate(function() {
        var UAcode = $('#ID-m-content-header > div > div > div:eq(1)').text();
        return UAcode;
      });
      this.echo("Tracking Code: " + googleAnalyticsUAcode);
      vin65LoginAndValidate.init();
      googleAnalytics.initGoogleAnalytics(googleAnalyticsUAcode);
      oneClick.stageComplete('#analyticsComplete', 'Google Anayltics were successfully added!');
    });
  });
};


exports.initGoogleAnalytics = function(googleAnalyticsUAcode) {
  casper.thenEvaluate(function(googleAnalyticsUAcode) {
    var regexMatch = googleAnalyticsUAcode.match(/-([^-]+)-/);
    var decodeGoogleUA = regexMatch[1];
    $('html').prepend('<iframe src="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings" class="websiteSettings"></iframe>');
    setTimeout(function(){
      $('.websiteSettings').contents().find('#iFramePopup').contents().find('[name="vin65AnalyticUsername"]').val("wga1@vin65analytics.com");
      $('.websiteSettings').contents().find('#iFramePopup').contents().find('[name="vin65UACode"]').val(googleAnalyticsUAcode);
      $('.websiteSettings').contents().find('#iFramePopup').contents().find('[name="vin65AnalyticAccount"]').val(decodeGoogleUA);
      setTimeout(function(){
        $('.websiteSettings').contents().find('#iFramePopup').contents().find('form[action="index.cfm?method=websiteSettings.SettingsSuccess"]').submit();
        $('html').prepend('<div id="analyticsComplete"></div>');
      }, 2000);
    }, 3000);
  }, googleAnalyticsUAcode);
};
