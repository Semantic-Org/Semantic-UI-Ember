import Ember from 'ember';
import BaseMixin from 'semantic-ui-ember/mixins/base';
import { module, test } from 'qunit';

module('Unit | Mixin | base');

// Replace this with your real tests.
test('it works', function(assert) {
  let BaseObject = Ember.Object.extend(BaseMixin, {
    module: 'test'
  });
  let subject = BaseObject.create();
  assert.ok(subject);
});
