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
  casper.thenEvaluate(function() {
    $('html').prepend('<iframe name="customDrilldown" class="customDrilldown"></iframe>');
  });
  casper.then(function() {
    this.wait(2000, function() {
      this.evaluate(function() {
        $('.customDrilldown').attr('src', '/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DdesignerLaunch');
      });
    });
    this.wait(4000, function() {
      this.evaluate(function() {
        $('.customDrilldown').contents().find("#iFramePopup").contents().find("select[name='ProductCustomDrilldown']").val("product-drilldown.htm");
      });
    });
    this.wait(1000, function(){
      this.withFrame('customDrilldown', function() {
        this.withFrame('EditWindow', function() {
          this.click("#parseFile");
        });
      });
    });
  });
};