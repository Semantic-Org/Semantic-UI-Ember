import Ember from 'ember';
import Base from '../mixins/base';
import DataAttributes from '../mixins/data-attributes';

export default Ember.Component.extend(Base, DataAttributes, {
  module: 'dropdown',
  classNames: [ 'ui', 'dropdown' ],
  tagName: 'div',

  initialize: Ember.on('didInsertElement', function() {
    var value = this.get('value');
    if (typeof value !== "undefined" && value !== null) {
      this.execute('set selected', value);
    }
  }),

  /**
    When `multiple` is `false`, the element of `content` that is currently
    selected, if any.
    When `multiple` is `true`, an array of such elements.
    @property selection
    @type Object or Array
    @default null
  */
  selection: null,

  /**
    In single selection mode (when `multiple` is `false`), value can be used to
    get the current selection's value or set the selection by its value.
    It is not currently supported in multiple selection mode.
    @property value
    @type String
    @default null
  */
  value: Ember.computed('selection', {
    get(/* key */) {
      return this.get('selection');
    },

    set(key, value) {
      return value;
    }
  }),

  onChange: function(value, text, $element) {
    if (value === undefined) {
      // The initial set selected doesn't have an value. This is potentially a problem
      // within the main Semantic library
      //
      // https://github.com/Semantic-Org/Semantic-UI/blob/master/src/definitions/modules/dropdown.js#L85
      value = $element.data('value');
    }
    return this.set('selection', value);
  },

  onUpdate: Ember.observer('value', function() {
    return Ember.run.scheduleOnce('afterRender', this, this.setValue);
  }),

  onContentChange: Ember.observer('content', function() {
    // Wait for the afterRender portion of the Run Loop to complete after
    // after a content change. Once that happens, re-initialize the
    // Semantic component the same way as Semantic.BaseMixin
    //
    // Without this, Dropdown Items will not be clickable if the content
    // is set after the initial render.
    Ember.run.scheduleOnce('afterRender', this, function() {
      if (this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }
      this.didInsertElement();
      this.setValue();
    });
  }),

  setValue: function() {
    var dropdownValue, inputValue;
    inputValue = this.get('value');
    dropdownValue = this.execute("get value");
    if (inputValue == null) {
      return this.execute("clear");
    } else if (inputValue !== dropdownValue) {
      return this.execute("set selected", this.get('value'));
    }
  }
});
