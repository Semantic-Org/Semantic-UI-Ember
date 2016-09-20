/* jshint node: true */
var test = require('tape');
var generate = require('./generation');

var oldDefaults = {
  css: true,
  javascript: true,
  fonts: false,
  images: true,
};

var defaults = function() {
  return {
    imports: {
      css: true,
      javascript: true,
      fonts: true,
      images: true,
    },
    paths: {
      'source': 'bower_components/semantic-ui/dist',
      'theme': 'default',
    }
  };
};

test('use the default path of the theme if not in the options', function (t) {
  t.plan(4);
  t.equal(generate.default('paths', 'theme', [{}, defaults()]), 'default');
  t.equal(generate.default('paths', 'theme', [null, defaults()]), 'default');
  t.equal(generate.default('paths', 'theme', [undefined, defaults()]), 'default');
  t.equal(generate.default('paths', 'theme', [{'fonts': true}, defaults()]), 'default');
});

test('use the user option path of the theme if in the options', function (t) {
  t.plan(4);
  t.equal(generate.default('paths', 'theme', [{'paths': {'theme': 'boston'}}, defaults()]), 'boston');
  t.equal(generate.default('paths', 'theme', [{'paths': {'theme': ''}}, defaults()]), '');
  t.equal(generate.default('paths', 'theme', [{'paths': {'theme': null}}, defaults()]), null);
  t.equal(generate.default('paths', 'theme', [{'paths': {}}, defaults()]), 'default');
});

test('use new default location of imports', function (t) {
  t.plan(1);
  t.equal(generate.default('imports', 'fonts', [{}, defaults()]), true);
});

test('use new location of imports', function (t) {
  t.plan(1);
  t.equal(generate.default('imports', 'fonts', [{'imports': {'fonts': false}}, defaults()]), false);
});

test('use new location of imports if undefined in user options', function (t) {
  t.plan(1);
  t.equal(generate.default('imports', 'javascript', [{'imports': {'fonts': false}}, defaults()]), true);
});

test('use old default location of imports', function (t) {
  t.plan(1);
  t.equal(generate.default('imports', 'fonts', [oldDefaults, defaults()]), false);
});


test('format removes null, undefined, and whitespace values', function (t) {
  t.plan(4);
  t.equal(generate.format('j', 1, 'a b', '/'), 'j/1/a b//');
  t.equal(generate.format(null, 1, 'a b', '/'), '1/a b//');
  t.equal(generate.format(null, 1, 'a b', undefined), '1/a b');
  t.equal(generate.format(null, 1, 'a b', undefined, 'couldItBe', '    '), '1/a b/couldItBe');
});
