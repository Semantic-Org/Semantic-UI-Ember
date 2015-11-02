import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  moduleName: 'search',
  classNames: [ 'ui', 'search' ],

  /**
    Proxying all the attributes to apiSettings
  */
  apiSettings: Ember.computed.alias('attrs')
});
