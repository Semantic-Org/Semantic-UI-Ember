import Ember from 'ember';
import UiDropdown from 'semantic-ui-ember/components/ui-dropdown';

const _proxyCallback = function(callbackName) {
  return function(value, text, $element) {
    if (!$element) {
      return;
    }

    let contentValue = this._findValue(value);
    this.attrs[callbackName](contentValue, text, $element, this);
  }
};

export default UiDropdown.extend({
  content: null,
  find_by: 'id',

  getSemanticIgnorableAttrs() {
    let ignorableAttrs = this._super(...arguments);
    ignorableAttrs.pushObjects(['content', 'find_by']);
    return ignorableAttrs;
  },

  willInitSemantic(settings) {
    this._super(...arguments);
    if (settings.onChange) {
      settings.onChange = this._onChange;
    }
    if (settings.onAdd) {
      settings.onAdd = this._onAdd;
    }
    if (settings.onRemove) {
      settings.onRemove = this._onRemove;
    }
  },

  getSelectedValue(selected) {
    if (Ember.isBlank(selected)) {
      return null;
    }
    return Ember.get(selected, this.get('find_by'));
  },

  _onChange: _proxyCallback('onChange'),
  _onAdd: _proxyCallback('onAdd'),
  _onRemove: _proxyCallback('onRemove'),

  _findValue(value) {
    return this.get('content').find((item) => {
      var current = Ember.get(item, this.get('find_by'));
      return this.areAttrValuesEqual("selected", current, value);
    });
  }
});
