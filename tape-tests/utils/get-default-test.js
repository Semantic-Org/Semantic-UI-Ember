/* jshint node: true */
var test = require('tape');
var getDefault = require('../../lib/utils/get-default');

var oldDefaults = {
  css: true,
  javascript: true,
  fonts: false,
  images: true,
};

var defaults = function() {
  return {
    imports: {
      javascript: true,
      fonts: true
    },
    paths: {
      theme: 'default',
      fonts: 'other'
    }
  };
};

let customOptions = {
  import: {
    css: false
  }
}

test('use the default path of the theme if not in the options', function (assert) {
  assert.plan(4);
  assert.equal(getDefault('paths', 'theme', [{}, defaults()]), 'default');
  assert.equal(getDefault('paths', 'theme', [null, defaults()]), 'default');
  assert.equal(getDefault('paths', 'theme', [undefined, defaults()]), 'default');
  assert.equal(getDefault('paths', 'theme', [{'fonts': true}, defaults()]), 'default');
});

test('use the user option path of the theme if in the options', function (assert) {
  assert.plan(5);
  assert.equal(getDefault('paths', 'theme', [{'paths': {'theme': 'boston'}}, defaults()]), 'boston');
  assert.equal(getDefault('paths', 'theme', [{'paths': {'theme': ''}}, defaults()]), '');
  assert.equal(getDefault('paths', 'theme', [{'paths': {'theme': null}}, defaults()]), null);
  assert.equal(getDefault('paths', 'theme', [{'paths': {}}, defaults()]), 'default');
  assert.equal(getDefault('paths', 'theme', [{'theme': 'pizza'}, defaults()]), 'pizza');
});

test('can change the font destination directory', function (assert) {
  assert.plan(1);
  assert.equal(getDefault('paths', 'fonts', [{'paths': {'fonts': 'assets/themes/material/assets/fonts/'}}, defaults()]), 'assets/themes/material/assets/fonts/');
});

test('use new default location of imports', function (assert) {
  assert.plan(1);
  assert.equal(getDefault('imports', 'fonts', [{}, defaults()]), true);
});

test('use new location of imports', function (assert) {
  assert.plan(1);
  assert.equal(getDefault('imports', 'fonts', [{'imports': {'fonts': false}}, defaults()]), false);
});

test('use new location of imports if undefined in user options', function (assert) {
  assert.plan(1);
  assert.equal(getDefault('imports', 'javascript', [{'imports': {'fonts': false}}, defaults()]), true);
});

test('use old default location of imports', function (assert) {
  assert.plan(1);
  assert.equal(getDefault('imports', 'fonts', [oldDefaults, defaults()]), false);
});

test('user-defined options are read', function (assert) {
  assert.plan(1);
  assert.equal(getDefault('import', 'css', [customOptions]), false);
});