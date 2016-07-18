import Ember from 'ember';
import PromiseResolverMixin from 'semantic-ui-ember/mixins/promise-resolver';
import { module, test } from 'qunit';

module('Unit | Mixin | promise resolver');

// Replace this with your real tests.
test('it works', function(assert) {
  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();
  assert.ok(subject);
});

test('resolves null until the promise is resolved', function (assert) {
  let deferred = Ember.RSVP.defer();

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), null);

  const text = 'yass!';

  deferred.resolve(text);

  return deferred.promise.then(() => {
    assert.equal(resultImmediate, null, 'immediate result is null');
    assert.equal(resultDelayed, text, 'delayed result is correct');
  });
});

test('resolves null until the promise is rejected', function (assert) {
  let deferred = Ember.RSVP.defer();

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), null);

  deferred.reject(new Error('oops'));

  return deferred.promise.catch(() => {
    assert.equal(resultImmediate, null, 'immediate result is null');
    assert.equal(resultDelayed, null, 'delayed result is null');
  });
});

test('changing the promise changes the eventually resolved value', function (assert) {
  let deferred1 = Ember.RSVP.defer();
  let deferred2 = Ember.RSVP.defer();

  const deferred1Text = 'hi';
  const deferred2Text = 'bye';

  deferred1.resolve(deferred1Text);

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred1.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), deferred1Text);

  return deferred1.promise.then(() => {
    assert.equal(resultImmediate, deferred1Text, 'immediate result matches expected');
    assert.equal(resultDelayed, null, 'delayed result is null');
    assert.equal(subject.resolvePromise(deferred2.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), null);
    deferred2.resolve(deferred2Text);
    return deferred2.promise;
  }).then(() => {
    assert.equal(resultImmediate, deferred1Text, 'immediate result matches expected');
    assert.equal(resultDelayed, deferred2Text, 'delayed result matches expected');
  });
});

test('always resolves with the last promise set', function (assert) {
  let deferred1 = Ember.RSVP.defer();
  let deferred2 = Ember.RSVP.defer();

  const deferred1Text = 'hi';
  const deferred2Text = 'bye';

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred1.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), null);

  assert.equal(subject.resolvePromise(deferred2.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), null);

  deferred1.resolve(deferred1Text);

  return deferred1.promise.then(() => {
    assert.equal(resultImmediate, null, 'immediate result is null');
    assert.equal(resultDelayed, null, 'delayed result is null');
    deferred2.resolve(deferred2Text);
    return deferred2.promise;
  }).then(() => {
    assert.equal(resultImmediate, null, 'immediate result is null');
    assert.equal(resultDelayed, deferred2Text, 'delayed result matches expected');
  });
});


test('passes through non-promise values unchanged', function (assert) {
  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(42, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), 42);
  assert.equal(resultImmediate, 42, 'immediate result is 42');
  assert.equal(resultDelayed, null, 'delayed result is null');
});

test('switching from promise to non-promise correctly ignores promise resolution', function (assert) {
  let deferred = Ember.RSVP.defer();

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), null);

  assert.equal(subject.resolvePromise(42, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), 42);

  const text = 'yass!';

  deferred.resolve(text);

  return deferred.promise.catch(() => {
    assert.equal(resultImmediate, 42, 'immediate result is 42');
    assert.equal(resultDelayed, null, 'delayed result is null');
  });
});

test('previously fullfilled promise right away', function (assert) {
  const text = 'yass!';

  let deferred = Ember.RSVP.defer();
  deferred.resolve(text);

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred.promise, (resolved) => resultImmediate = resolved, (resolved) => resultDelayed = resolved), text);

  assert.equal(resultImmediate, text, 'immediate result matches text');
  assert.equal(resultDelayed, null, 'delayed result is null');

  return deferred.promise.catch(() => {
    assert.equal(resultImmediate, text, 'immediate result matches text');
    assert.equal(resultDelayed, null, 'delayed result is null');
  });
});

test('if delayed function isnt passed in, uses immediate function', function (assert) {
  const text = 'yass!';

  let deferred = Ember.RSVP.defer();

  let PromiseResolverObject = Ember.Object.extend(PromiseResolverMixin);
  let subject = PromiseResolverObject.create();

  let resultImmediate = null;
  let resultDelayed = null;
  assert.equal(subject.resolvePromise(deferred.promise, (resolved) => resultImmediate = resolved), null);

  deferred.resolve(text);

  return deferred.promise.catch(() => {
    assert.equal(resultImmediate, text, 'immediate result matches text');
    assert.equal(resultDelayed, null, 'delayed result is null');
  });
});