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
  oneClick.addFrame("customDrilldown", "/index.cfm?method=layout.showLayout&go=%2Fsettings%2Findex%2Ecfm%3Fmethod%3Dsettings%2Eframes%26deepLink%3DdesignerLaunch");
  casper.then(function() {
    this.wait(4000, function() {
      this.withFrame('customDrilldown', function() {
        this.withFrame('EditWindow', function() {
          this.evaluate(function() {
            $('[name="ProductCustomDrilldown"]').val("product-drilldown.htm");
          });
          this.wait(2000, function() {
            this.capture("test.png");
            this.click("#parseFile");
          });
        });
      });
    });
  });
};
