import Ember from 'ember';
import { isPromise } from '../utils/promise-tools';
import { isFulfilled } from '../utils/promise-tools';
import { getPromiseContent } from '../utils/promise-tools';

// Code referenced from https://github.com/fivetanley/ember-promise-helpers
export default Ember.Helper.extend({
  compute([action, maybePromise]) {
    if (!isPromise(maybePromise)) {
      return action(maybePromise);
    }
    // If we've already fulfilled, just return to avoid returning null
    // Probably could tie into SetValue, something to think about later
    if (isFulfilled(maybePromise)) {
      return action(getPromiseContent(maybePromise));
    }

    // If the type wasn't a PromiseProxy or RSVP, check if we resolved for .then
    if (this._wasSettled && maybePromise === this._promise) {
      return action(this._value);
    }

    this.ensureLatestPromise(maybePromise, (promise) => {
      promise.then((value) => {
        if (maybePromise === this._promise) {
          this._wasSettled = true;
          this._value = value;
          // This will recompue the value and fire the _wasSettled check above
          this.recompute();
        }
      }).catch((error) => {
        Ember.Logger.error('Promise died in map-value');
        Ember.Logger.error(error);
      });
    });
    return null;
  },

  ensureLatestPromise(promise, callback) {
    // It's a new promise, reset
    this._wasSettled = false;
    this._promise = promise;

    callback.call(this, Ember.Promise.resolve(promise));
  }
});