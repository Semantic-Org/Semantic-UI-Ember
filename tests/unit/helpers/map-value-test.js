import Ember from 'ember';
import { mapValue } from 'dummy/helpers/map-value';
import { module, test } from 'qunit';

module('Unit | Helper | map value');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = mapValue([function(value) { return Ember.guidFor(value); }, { test: true }]);
  assert.ok(result);
});
