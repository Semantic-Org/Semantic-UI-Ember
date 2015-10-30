import Ember from 'ember';
import SemanticSettingsMixin from '../../../mixins/semantic-settings';
import { module, test } from 'qunit';

module('Unit | Mixin | semantic settings');

// Replace this with your real tests.
test('it works', function(assert) {
  var SemanticSettingsObject = Ember.Object.extend(SemanticSettingsMixin);
  var subject = SemanticSettingsObject.create();
  assert.ok(subject);
});
