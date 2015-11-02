import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  moduleName: 'modal',
  classNames: [ 'ui', 'modal' ],
  detachable: false,
  name: null
});
