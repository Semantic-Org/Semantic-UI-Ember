import Ember from 'ember';
import ModuleSettings from '../mixins/module-settings';

var Accordion = Ember.Component.extend(ModuleSettings, {
  module: 'accordion',
  classNames: [ 'ui', 'accordion' ]
});

export default Accordion;
