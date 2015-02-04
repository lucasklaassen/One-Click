//One Click Functions
var require = patchRequire(require);

// Assets
var utils = require('utils');

exports.stageComplete = function(selector, message) {
  casper.waitForSelector(selector, function() {
    this.echo(message);
    this.evaluate(function() {
      window.location.reload();
    });
  });
}
