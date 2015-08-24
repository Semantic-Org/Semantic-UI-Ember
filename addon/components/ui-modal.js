import Ember from 'ember';
import Base from '../mixins/base';
// import DataAttributes from '../mixins/data-attributes';

export default Ember.Component.extend(Base, {
  module: 'modal',
  classNames: [ 'ui', 'modal' ],
  detachable: false,
  name: null,

  /**
    Passing approve through to the calling controller if it was passed in
  */
  onApprove: function() {
    return this.triggerPassedInEvent('approve', [ this.get('name') ]);
  },

  /**
    Passing deny through to the calling controller if it was passed in
  */
  onDeny: function() {
    return this.triggerPassedInEvent('deny', [ this.get('name') ]);
  },

  /**
    Helper to conditionally trigger a passed in action.

    @action String
    @args Array
  */
  triggerPassedInEvent: function(action, args) {
    if (typeof this.attrs[action] !== "function") {
      return true;
    }

    if (this.attrs[action].apply(this, args)) {
      return true;
    }

    return false;
  }
});
