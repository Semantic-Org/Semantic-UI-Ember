import Ember from 'ember';
import Base from '../mixins/base';

var Progress = Ember.Component.extend(Base, {
  module: 'progress',
  classNames: [ 'ui', 'progress' ],

  init() {
    this._super(...arguments);
    this.get('settableAttrs').addObject('progress');
  }
});

export default Progress;
