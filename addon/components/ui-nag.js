import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'nag',
  classNames: [ 'ui', 'nag' ],

  init: function() {
    this._super();
    this.execute('show');
  }
});
