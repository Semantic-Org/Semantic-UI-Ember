import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-popup';

export default Ember.Component.extend(Base, {
  layout,
  module: 'popup',

  didInitSemantic() {
    this._super(...arguments);
    let possibleAttrs = ['content', 'title', 'html'];
    for (let i = 0; i < possibleAttrs.length; i++) {
      let possibleAttr = possibleAttrs[i];
      if (this._hasOwnProperty(this.attrs, possibleAttr) || this.get(possibleAttr) != null) {
        this.get('_settableAttrs').addObject(possibleAttr);
      }
    }
    this.get('_settableAttrs').removeObject('position');
  },

  setSemanticAttr(attrName, attrValue) {
    if (attrName === 'content' || attrName === 'title' || attrName === 'html') {
      let value = this._unwrapHTMLSafe(attrValue);
      let response = this.execute('setting', attrName, value);
      if (this.execute('is visible')) {
        let html;
        if (attrName === 'html') {
          html = value;
        } else {
          let text;
          if (attrName === 'content')  {
            text = {
              title: this.get('title'),
              content: value
            };
          } else {
            text = {
              title: value,
              content: this.get('content')
            };
          }
          let moduleGlobal = this.getSemanticModuleGlobal();
          html = moduleGlobal.settings.templates.popup(text);
        }
        this.execute('change content', html);
      }
      return response;
    }
    return this._super(...arguments);
  }
});
