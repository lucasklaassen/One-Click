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
};

exports.addFrame = function(frameName, src) {
  casper.thenEvaluate(function(frameName, src) {
    $('html').prepend('<iframe name="' + frameName + '" class="' + frameName + '"></iframe>');
    if(src.length){
      $("[name='"+frameName+"']").attr('src', src);
    }
  }, frameName, src);
};
