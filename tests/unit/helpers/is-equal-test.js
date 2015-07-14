import { isEqual } from '../../../helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

test('It strict equals', function(assert) {
  var result = isEqual([42, 42]);
  assert.ok(result);
  var failure = isEqual(['42', 42]);
  assert.ok(!failure);
});
