import Ember from 'ember';

export default Ember.Component.extend({
  module: 'search',
  classNames: [ 'ui', 'search' ],

  /**
    Proxying all the attributes to apiSettings
  */
  apiSettings: Ember.computed.alias('attrs')
});
