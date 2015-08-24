import Ember from 'ember';
import Base from '../mixins/base';
// import DataAttributes from '../mixins/data-attributes';

export default Ember.Component.extend(Base, {
  module: 'modal',
  classNames: [ 'ui', 'modal' ],
  detachable: false,
  name: null,

  /**
    Check that the name parameter was passed in. The name is required and must
    be unique per modal

    @name String
  */
  init: function() {
    this._super();

    if (!this.get('name')) {
      return Ember.Logger.error('All modals must include a name so they can be triggered properly');
    }
  },

  /**
    Initialize the events that are called from the controller
  */
  createEvent: Ember.on('didInsertElement', function() {
    var component = this;
    var target = this.get('targetObject');
    if (typeof target === "undefined") {
      return;
    }

    if (Ember.testing) {
      target.context.on('showModal', function(name) {
        return component.showModal.apply(component, [ name ]);
      });
      return;
    }

    if (typeof target.on !== "function") {
      return;
    }

    target.on('showModal', this, component.showModal);
  }),

  /**
    Destroy any event handlers that we create upon initialization
  */
  destroyEvent: Ember.on('willClearRender', function() {
    var target = this.get('targetObject');
    if (typeof target === "undefined") {
      return;
    }

    if (Ember.testing) {
      return;
    }

    if (typeof target.on !== "function") {
      return;
    }

    target.off('showModal', this, this.showModal);
  }),

  /**
    Callback that is fired from the Controller when we want to open a modal
  */
  showModal: function(name) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      // This will trigger on all modals so we
      // have to compare the name.
      if (name !== _this.get('name')) {
        reject();
        return;
      }

      _this.execute('show', function() {
        resolve();
      });
    });
  },

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
  },

  /**
    Helper to get the targetObject for this component

    @action String
  */
  checkTargetForAction: function(action) {
    var target = this.get('targetObject');
    if (typeof target !== "undefined" && target !== null &&
        typeof target._actions !== "undefined" && target._actions !== null &&
        typeof target._actions[action] !== "undefined" && target._actions[action] !== null) {
      return target;
    }

    return false;
  }
});
