import Ember from 'ember';

const isPromise = function(maybePromise) {
  if (Ember.PromiseProxyMixin.detect(maybePromise)) {
    return true;
  }

  if (maybePromise instanceof Ember.RSVP.Promise) {
    return true;
  }

  if (maybePromise != null && typeof maybePromise.then === 'function') {
    return true;
  }
  return false;
};

// It's assumed if you call this method, it was previously checked that it is a promise
const isFulfilled = function(promise) {
  if (Ember.PromiseProxyMixin.detect(promise)) {
    if (promise.get('isFulfilled')) {
      return true;
    }

    return false;
  }

  if (promise instanceof Ember.RSVP.Promise) {
    if (promise._state === 1) { // Fulfilled
      return true;
    }
    return false;
  }

  // Can't detect it if its not one of the two kinds above
  return false;
};

// It's assumed if you call this method, it was previously checked that it was a promise
// and is fulfilled
const getPromiseContent = function(promise) {
  if (Ember.PromiseProxyMixin.detect(promise)) {
    return promise.get('content');
  }

  if (promise instanceof Ember.RSVP.Promise) {
    return promise._result;
  }

  // Only can get the content for one of the two above
  return null;
};

export { isPromise };
export { isFulfilled };
export { getPromiseContent };