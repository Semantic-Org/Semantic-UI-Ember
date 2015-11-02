import Ember from 'ember';
import Base from '../mixins/base';

var Accordion = Ember.Component.extend(Base,{
  moduleName: 'accordion',
  classNames: [ 'ui', 'accordion' ],
  didInsertElement() {
    this.setSettings();
  }
});

export default Accordion;
