import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'dropdown',
  classNames: ['ui', 'dropdown'],
  ignorableAttrs: ['selected'],

  didInitSemantic() {
    this._super(...arguments);
    var selected = this.get('selected');
    if (this.get('_settableAttrs').contains('selected')) {
      this.get('_settableAttrs').removeObject('selected');
      this.get('_bindableAttrs').addObject('selected');
    }

    if (Ember.isPresent(selected)) {
      this.execute('set selected', this.getSelected(selected));
    }
  },

  getSelected(selected) {
    return selected;
  },

  getSemanticAttr(attrName) {
    if (attrName === 'selected') {
      return this.execute('get value');
    }
    return this._super(...arguments);
  },

  setSemanticAttr(attrName, attrValue) {
    if (attrName === 'selected') {
      let selected = this.get(attrName);
      let value = this.getSelected(selected);
      if (Ember.isBlank(value)) {
        return this.execute('clear');
      }
      return this.execute('set selected', value);
    }
    return this._super(...arguments);
  }
});
