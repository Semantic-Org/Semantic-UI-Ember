import Ember from 'ember';
import ModuleSettingsMixin from '../../../mixins/module-settings';
import { module, test } from 'qunit';

module('Unit | Mixin | module settings');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModuleSettingsObject = Ember.Object.extend(ModuleSettingsMixin);
  var subject = ModuleSettingsObject.create();
  assert.ok(subject);
});
