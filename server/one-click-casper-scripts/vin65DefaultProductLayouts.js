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
  casper.waitForSelector('#iFrameWrapper', function() {
    this.wait(3000,function(){
      this.evaluate(function() {
        $('html').prepend('<iframe src="/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DwebsiteSettings" class="websiteSettings"></iframe>');
        setTimeout(function(){
          $('html').prepend('<iframe src="/settings/index.cfm?method=websiteSettings.ProductSettings" name="websiteSettingsTwo" class="websiteSettingsTwo"></iframe>');
        },6000);
      });
    });
  });
  casper.then(function() {
    this.wait(8000, function(){
      this.withFrame('websiteSettingsTwo', function() {
        this.evaluate(function() {
          $("input[name='productLayouts']").prop('checked', true);
          $('input[value="EventTicket"]').prop('checked', true);
          $("input[name='listDisplayColumns']").val("ProductTitle");
          $("select[name='drilldownDisplay']").val("Custom");
          $('form[action="index.cfm?method=websiteSettings.ProductSettingsSuccess"]').submit();
        });
      });
      this.evaluate(function() {
        $('html').prepend('<div id="productLayoutsComplete"></div>');
      });
    });
  });
  oneClick.stageComplete('#productLayoutsComplete', 'Product Layouts were initialized!');
};
