import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['item'],
  tagName: 'div',

  initialize: Ember.on('init', function() {
    Ember.run.scheduleOnce('afterRender', this, this.update_data);
  }),

  update_data: function() {
    if (this.$().data('value')) {
      return;
    }
    
    this.$().data('value', this.get('content'));
  }
});
