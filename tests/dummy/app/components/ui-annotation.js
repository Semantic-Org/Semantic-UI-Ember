import Ember from 'ember';

export default Ember.Component.extend({
  type: "handlebars",
  classNames: ['annotation', 'transition'],
  classNameBindings: ['showing:visible:hidden']
});
