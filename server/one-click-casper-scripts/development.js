// Assets
var oneClick = require('./utilities/globalFunctions');
var jQuery = require('./utilities/jquery');
var auth = require('./utilities/authentication');
var googleAnalytics = require('./googleAnalytics');
var vin65LoginAndValidate = require('./vin65LoginAndValidate');
var vin65DefaultProductLayouts = require('./vin65DefaultProductLayouts');
var vin65ResponsiveResourceBundle = require('./vin65ResponsiveResourceBundle');
var vin65Template1Check = require('./vin65Template1Check');
var vin65WebsiteSettingsFunctions = require('./vin65WebsiteSettingsFunctions');
var vin65ParseCustomDrilldown = require('./vin65ParseCustomDrilldown');
var twilio = require('./twilio');
var utils = require('utils');

// Casper Module
var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  waitTimeout: 25000,
  viewportSize: {
    width: 1000, height: 2000
  },
  pageSettings: {
    loadImages: true,
    loadPlugins: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/35 Mozilla/5.0'
  }
});

var consoleRead = function(userMessage) {
  var system = require('system');
  system.stdout.writeLine(userMessage);
  var line = system.stdin.readLine();
  return line;
};

//If username and password were not passed in as arg's ask for them now
if(casper.cli.args.length < 10 ) {
  casper.echo("ERROR: Please ensure all fields have been filled out.").exit();
} else {
  var username = casper.cli.get(0);
  var password = casper.cli.get(1);
  var userFullName = casper.cli.get(2);
  var userInputWebsiteName = casper.cli.get(3);
  var userInputWebsiteURL = casper.cli.get(4);
  var userInputWineryEmail = casper.cli.get(5);
  var userInputWebsiteCity = casper.cli.get(6);
  var userInputWebsiteState = casper.cli.get(7);
  var userInputWebsiteCountry = casper.cli.get(8);
  var vin65plus = casper.cli.get(9);
}

casper.start();

//Init Vin65 Template 1 Check//
// vin65Template1Check.init();
//End Vin65 Template 1 Check//

//Init Google Analytics//
// googleAnalytics.login();
// googleAnalytics.addUATrackingCode();
//End Google Analytics//

//Init Login and Validate//
vin65LoginAndValidate.init();
//End Login and Validate//

//Init Product Layout Defaults
// vin65DefaultProductLayouts.init();
//End Product Layout Defaults

//Init Website Settings Functions
vin65WebsiteSettingsFunctions.init();
//End Website Settings Functions

//Init Resource Bundle Defaults//
// vin65ResponsiveResourceBundle.init();
//End Resource Bundle Defaults//

//Init Parse Custom Drilldown//
// vin65ParseCustomDrilldown.init();
//End Parse Custom Drilldown//

//Init Vin65Plus Setup//
// if(vin65plus) {
//   twilio.init();
// }
//End Vin65Plus Setup//

casper.run();
