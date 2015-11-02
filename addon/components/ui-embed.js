import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  moduleName: 'embed',
  classNames: [ 'ui', 'embed' ],
  attributeBindings: ['data-id', 'data-source', 'data-placeholder', 'data-url', 'data-icon']
});
