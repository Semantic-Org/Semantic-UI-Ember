import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'search',
  classNames: ['ui', 'search'],

  didInitSemantic(...args) {
    this._super(...args);
    this.get('_bindableAttrs').addObject('source');
  },
  execute(...args){
    const cmd = args[0];
    const attrValue = args[1];

    if(cmd === 'set source') {
      let module = this.getSemanticModule();
      if (module) {
        return module.apply(this.getSemanticScope(), [{
          source: attrValue
        }]);
      }
    }
    return this._super(...args);
  }
});
