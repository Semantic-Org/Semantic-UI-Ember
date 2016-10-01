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

test('values are equal', function(assert) {
  assert.expect(13);

  let BaseObject = Ember.Object.extend(BaseMixin, {
    module: 'test'
  });
  let subject = BaseObject.create();

  assert.ok(subject.areAttrValuesEqual('', 5, '5'));
  assert.ok(subject.areAttrValuesEqual('', 5, 5));
  assert.ok(subject.areAttrValuesEqual('', '5', 5));
  assert.notOk(subject.areAttrValuesEqual('', 5, '4'));

  assert.ok(subject.areAttrValuesEqual('', 'test', 'test'));
  assert.ok(subject.areAttrValuesEqual('', 'test', Ember.String.htmlSafe('test')));
  assert.ok(subject.areAttrValuesEqual('', Ember.String.htmlSafe('test'), 'test'));
  assert.ok(subject.areAttrValuesEqual('', 5, Ember.String.htmlSafe('5')));

  assert.ok(subject.areAttrValuesEqual('', true, Ember.String.htmlSafe('true')));
  assert.ok(subject.areAttrValuesEqual('', Ember.String.htmlSafe('true'), true));
  assert.ok(subject.areAttrValuesEqual('', true, true));
  assert.notOk(subject.areAttrValuesEqual('', false, true));
  assert.notOk(subject.areAttrValuesEqual('', true, false));
});

test('setting attr unwraps html safe string', function(assert) {
  assert.expect(2);

  let BaseObject = Ember.Object.extend(BaseMixin, {
    module: 'test',

    execute(command, value) {
      assert.equal(value, 'unwrapped');
    }
  });
  let subject = BaseObject.create();

  let wrapped = Ember.String.htmlSafe('unwrapped');

  assert.notDeepEqual(wrapped, 'unwrapped', 'Unwrapped value isnt equal');

  subject.setSemanticAttr('property', wrapped);
});