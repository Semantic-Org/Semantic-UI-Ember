import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'popup',

  didInitSemantic() {
    this._super(...arguments);
    this.get('_settableAttrs').addObjects(['content', 'title', 'html']);
  },

  setSemanticAttr(attrName, attrValue) {
    if (attrName === 'content' || attrName === 'title' || attrName === 'html') {
      this.execute('setting', attrName, attrValue);
    } else {
      this._super(...arguments);
    }
  }
});
