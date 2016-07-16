import Ember from 'ember';
import PromiseResolverMixin from 'semantic-ui-ember/mixins/promise-resolver';
import { module, test } from 'qunit';

module('Unit | Mixin | promise resolver');

// Replace this with your real tests.
test('it works', function(assert) {
  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();
  assert.ok(subject);
});
