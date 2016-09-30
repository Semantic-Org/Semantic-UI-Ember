/* globals blanket, module */

var options = {
  modulePrefix: 'semantic-ui-ember',
  filter: '//.*semantic-ui-ember/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['lcov'],
    autostart: false
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
