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
      let response = this.execute('setting', attrName, attrValue);
      if (this.execute('is visible')) {
        let html;
        if (attrName === 'html') {
          html = attrValue;
        } else {
          let text;
          if (attrName === 'content')  {
            text = {
              title: this.get('title'),
              content: attrValue
            };
          } else {
            text = {
              title: attrValue,
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
