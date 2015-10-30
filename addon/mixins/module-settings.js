import Ember from 'ember';

export default Ember.Mixin.create({
  module: null,
  init() {
    this._super();
    Ember.assert('You must set a module', this.get('module'));
  },
  didInsertElement() {
    const moduleName = this.get('module');
    this._super();
    const moduleSettings = this.get('settings');
    if(Ember.$.isPlainObject(moduleSettings)) {
      this.$()[moduleName](moduleSettings);
    } else {
      this.$()[moduleName]();
    }
  },
  setModuleSettings(settings) {
    this.set('settings', Ember.$.merge(settings, this.getWithDefault('settings', {})));
  }
});
