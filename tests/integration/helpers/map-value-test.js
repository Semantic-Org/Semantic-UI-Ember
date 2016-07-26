import { test, moduleForComponent } from 'ember-qunit';
import afterRender from 'dummy/tests/helpers/after-render';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ui-accordion', 'Integration | Helper | map value', {
  integration: true
});

test('renders value passed in on non-promise', function (assert) {
  this.set('value', 42);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  assert.equal(this.$('.item').attr('data-value'), '42');
  assert.equal(this.$('.item').text().trim(), 'Forty Two');
});

test('when unresolved renders is passed in, null is rendered', function (assert) {
  let deferred = Ember.RSVP.defer();

  this.set('value', deferred.promise);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  assert.equal(this.$('.item').attr('data-value'), undefined);
  assert.equal(this.$('.item').text().trim(), 'Forty Two');

  deferred.resolve('LIFE');

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.item').attr('data-value').trim(), 'LIFE', 'data value is updated to correct value');
  });
});

test('when unresolved renders is passed in, null is rendered', function (assert) {
  let deferred1 = Ember.RSVP.defer();
  let deferred2 = Ember.RSVP.defer();
  let deferred3 = Ember.RSVP.defer();

  this.set('value', deferred3.promise);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  assert.equal(this.$('.item').attr('data-value'), undefined);
  assert.equal(this.$('.item').text().trim(), 'Forty Two');

  deferred1.resolve('number 1');

  Ember.run.later(deferred2, 'resolve', 'number 2', 200);
  Ember.run.later(deferred3, 'resolve', 'number 3', 500);

  this.set('value', deferred2.promise);
  this.set('value', deferred3.promise);

  return afterRender(Ember.RSVP.all([deferred2.promise, deferred3.promise])).then(() => {
    assert.equal(this.$('.item').attr('data-value').trim(), 'number 3', 'data value is updated to correct value');
  });
});

test('renders null until the promise is rejected', function (assert) {
  let deferred = Ember.RSVP.defer();

  this.set('value', deferred.promise);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  assert.equal(this.$('.item').attr('data-value'), undefined);

  deferred.reject(new Error('oops'));

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.item').attr('data-value'), undefined, 'value of re-render does not reveal reason for rejection');
  });
});

test('changing the promise changes the eventually rendered value', function (assert) {
  let deferred1 = Ember.RSVP.defer();
  let deferred2 = Ember.RSVP.defer();

  this.set('value', deferred1.promise);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  const deferred1Text = 'hi';
  const deferred2Text = 'bye';

  deferred1.resolve(deferred1Text);

  return afterRender(deferred1.promise).then(() => {
    deferred2.resolve(deferred2Text);
    this.set('value', deferred2.promise);
    return afterRender(deferred2.promise);
  }).then(() => {
    assert.equal(this.$('.item').attr('data-value'), deferred2Text, 'value updates when the promise changes');
  });
});

test('switching from promise to non-promise correctly ignores promise resolution', function (assert) {
  let deferred = Ember.RSVP.defer();

  this.set('value', deferred.promise);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  this.set('value', 'iAmConstant');
  assert.equal(this.$('.item').attr('data-value'), 'iAmConstant');
  deferred.resolve('promiseFinished');

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.item').attr('data-value'), 'iAmConstant', 'ignores a promise that has been replaced');
  });
});

test('promises that get wrapped by RSVP.Promise.resolve still work correctly', function(assert) {
  let deferred = Ember.RSVP.defer();
  let ObjectPromiseProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
  let proxy = ObjectPromiseProxy.create({
    promise: deferred.promise
  });

  this.set('value', proxy);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);
  deferred.resolve('hasAValue');
  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.item').attr('data-value'), 'hasAValue');
  });
});

test('renders previously fullfilled promise right away', function (assert) {
  const text = 'yass!';

  let deferred = Ember.RSVP.defer();
  deferred.resolve(text);

  this.set('value', deferred.promise);
  this.set('mapper', function(value) { return value; });
  this.set('text', 'Forty Two');

  this.render(hbs`
    <div class="item" data-value={{map-value mapper value}}>{{text}}</div>
  `);

  assert.equal(this.$('.item').length, 1);
  assert.equal(this.$('.item').attr('data-value'), text);

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.item').attr('data-value'), text, 're-renders when the promise is resolved');
  });
});