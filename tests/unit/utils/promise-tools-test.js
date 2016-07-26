import Ember from 'ember';
import DS from 'ember-data';
import { isPromise } from 'semantic-ui-ember/utils/promise-tools';
import { isFulfilled } from 'semantic-ui-ember/utils/promise-tools';
import { getPromiseContent } from 'semantic-ui-ember/utils/promise-tools';
import { module, test } from 'qunit';

module('Unit | Utils | promise tools');

test('Ember Promise Proxy mixin is detected', function(assert) {
  let deferred = Ember.RSVP.defer();
  let promiseObject = DS.PromiseObject.create({ promise: deferred.promise });

  assert.ok(isPromise(promiseObject));
});

test('Ember Promise proxy mixin detects its fulfilled', function(assert) {
  let deferred = Ember.RSVP.defer();
  let promiseObject = DS.PromiseObject.create({ promise: deferred.promise });

  assert.ok(isPromise(promiseObject));

  assert.equal(isFulfilled(promiseObject), false);

  deferred.resolve(true);

  deferred.promise.then(() => {
    assert.equal(isFulfilled(promiseObject), true);
  });
});

test('Ember Promise Proxymixin gets fulfilled content', function(assert) {
  let deferred = Ember.RSVP.defer();
  let promiseObject = DS.PromiseObject.create({ promise: deferred.promise });

  assert.ok(isPromise(promiseObject));

  assert.equal(isFulfilled(promiseObject), false);

  deferred.resolve('done');

  deferred.promise.then(() => {
    assert.equal(isFulfilled(promiseObject), true);
    assert.equal(getPromiseContent(promiseObject), 'done');
  });
});

test('RSVP Promise mixin is detected', function(assert) {
  let deferred = Ember.RSVP.defer();

  assert.ok(isPromise(deferred.promise));
});

test('RSVP Promise mixin detects its fulfilled', function(assert) {
  let deferred = Ember.RSVP.defer();

  assert.ok(isPromise(deferred.promise));

  assert.equal(isFulfilled(deferred.promise), false);

  deferred.resolve(true);

  deferred.promise.then(() => {
    assert.equal(isFulfilled(deferred.promise), true);
  });
});

test('RSVP Promise mixin gets fulfilled content', function(assert) {
  let deferred = Ember.RSVP.defer();

  assert.ok(isPromise(deferred.promise));

  assert.equal(isFulfilled(deferred.promise), false);

  deferred.resolve('done');

  deferred.promise.then(() => {
    assert.equal(isFulfilled(deferred.promise), true);
    assert.equal(getPromiseContent(deferred.promise), 'done');
  });
});

test('Duck typed promise is detected', function(assert) {
  let promise = { then() {}, catch() {} };

  assert.ok(isPromise(promise));
});

test('Duck typed promise cant detect fulfilled', function(assert) {
  let promise = {
    then() { this.done = true; },
    catch() {},
    done: false
  };

  assert.ok(isPromise(promise));

  assert.equal(isFulfilled(promise), false);

  promise.then();

  assert.equal(isFulfilled(promise), false);
  assert.equal(promise.done, true);
});

test('Duck typed promise cant get fulfilled content', function(assert) {
  let promise = {
    then(result) {
      this.done = true;
      this.result = result;
    },
    catch() {},
    done: false,
    result: null
  };

  assert.ok(isPromise(promise));

  assert.equal(isFulfilled(promise), false);

  promise.then('done');

  assert.equal(isFulfilled(promise), false);
  assert.equal(promise.done, true);
  assert.equal(getPromiseContent(promise), null);
  assert.equal(promise.result, 'done');
});

