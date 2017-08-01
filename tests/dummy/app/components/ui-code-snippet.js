import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['annotation', 'transition'],
  classNameBindings: ['showing:visible:hidden']
});
