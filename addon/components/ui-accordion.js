import Ember from 'ember';
import Base from '../mixins/base';

var Accordion = Ember.Component.extend(Base,{
  module: 'accordion',
  classNames: ['ui', 'accordion']
});

export default Accordion;
