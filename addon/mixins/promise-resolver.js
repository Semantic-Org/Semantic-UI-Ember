import Ember from 'ember';
import { isPromise } from '../utils/promise-tools';
import { isFulfilled } from '../utils/promise-tools';
import { getPromiseContent } from '../utils/promise-tools';

// Code referenced from https://github.com/fivetanley/ember-promise-helpers
export default Ember.Mixin.create({
  resolvePromise(maybePromise, immediateResolve, delayedResolve) {
    if (!isPromise(maybePromise)) {
      return immediateResolve.call(this, maybePromise);
    }
    // If we've already fulfilled, just return to avoid returning null
    // Probably could tie into SetValue, something to think about later
    if (isFulfilled(maybePromise)) {
      return immediateResolve.call(this, getPromiseContent(maybePromise));
    }

    // If the type wasn't a PromiseProxy or RSVP, check if we resolved for .then
    if (maybePromise === this._currentPromise) {
      if (this._promiseWasSettled) {
        return immediateResolve.call(this, this._promiseValue);
      }
      return null; // Return we don't need to check the latest again
    }

    this.ensureLatestPromise(maybePromise, (promise) => {
      promise.then((value) => {
        if (maybePromise === this._currentPromise) {
          this._promiseWasSettled = true;
          this._promiseValue = value;
          // This will recompue the value and fire the _wasSettled check above
          return (delayedResolve || immediateResolve).call(this, value);
        }
      }).catch((error) => {
        Ember.Logger.error('Promise died in Semantic-UI-Ember promise-resolver');
        Ember.Logger.error(error);
      });
    });
    return null;
  },

  ensureLatestPromise(promise, callback) {
    // It's a new promise, reset
    this._promiseWasSettled = false;
    this._currentPromise = promise;

    callback.call(this, Ember.RSVP.Promise.resolve(promise));
  }
});
