import Ember from 'ember';

export default Ember.SelectOption.extend({
  tagName: 'div',
  classNames: 'item',

  initialized: false,
  initialize: function() {
    _this = this
    Ember.run(function() {
      Ember.run.scheduleOnce('afterRender', _this, _this.set_value);
    });
  }.on('init'),

  set_value: function() {
    var valuePath = this.get('parentView.optionValuePath');

    if (!valuePath) {
      return;
    }
    if (this.$() == null) {
      return;
    }

    this.$().data('value', this.get(valuePath));
    this.set('initialized',true);
  }
});
