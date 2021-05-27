import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import afterRender from 'dummy/tests/helpers/after-render';
import Ember from 'ember';

moduleForComponent('ui-radio', 'Integration | Component | ui radio', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="fruit" label="Once a week"}}
        </div>
        <div class="field">
          {{ui-radio name="fruit" label="2-3 times a week"}}
        </div>
        <div class="field">
          {{ui-radio name="fruit" label="Once a day"}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
});

test('will start with selected current property', function(assert) {
  assert.expect(3);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.ok(this.$(this.$('.ui.radio')[0]).hasClass('checked'));
  assert.equal(count, 0, 'onChange shouldnt have been called');
});

test('selecting will update the bound property', function(assert) {
  assert.expect(3);

  let count = 0;
  this.set('changed', (value) => {
    this.set('frequency', value);
    count++;
  });

  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[2].click();
  assert.equal('daily', this.get('frequency'));
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('selecting twice will update the bound property to the latest', function(assert) {
  assert.expect(8);

  let count = 0;
  this.set('changed', (value) => {
    this.set('frequency', value);
    count++;
  });

  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[2].click();
  assert.equal('daily', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[2]).hasClass('checked'));

  this.$('.ui.radio')[0].click();
  assert.equal('weekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[0]).hasClass('checked'));

  this.$('.ui.radio')[1].click();
  assert.equal('biweekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
  assert.equal(count, 3, 'onChange should have been called three times');
});

test('setting disabled ignores click', function(assert) {
  assert.expect(6);

  let count = 0;
  this.set('changed', (value) => {
    this.set('frequency', value);
    count++;
  });

  this.set('checked', false);
  this.set('disabled', true);
  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency disabled=disabled onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[1].click();

  assert.equal('weekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[0]).hasClass('checked'));

  this.set('disabled', false);

  this.$('.ui.radio')[1].click();
  assert.equal('biweekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('setting readonly ignores click', function(assert) {
  assert.expect(6);

  let count = 0;
  this.set('changed', (value) => {
    this.set('frequency', value);
    count++;
  });

  this.set('checked', false);
  this.set('readonly', true);
  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency readonly=readonly onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[1].click();

  assert.equal('weekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[0]).hasClass('checked'));

  this.set('readonly', false);

  this.$('.ui.radio')[1].click();
  assert.equal('biweekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('setting readonly to null allows click', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('frequency', value);
    count++;
  });

  this.set('checked', false);
  this.set('readonly', null);
  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency readonly=readonly onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[1].click();

  assert.equal('biweekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('setting binded value updates to current', function(assert) {
  assert.expect(7);

  let count = 0;
  this.set('changed', (value) => {
    this.set('frequency', value);
    count++;
  });

  this.set('checked', false);
  this.set('disabled', true);
  this.set('frequency', 'weekly');
  this.set('value1', 'weekly1');
  this.set('value2', 'biweekly');
  this.set('value3', 'daily');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value=value1 current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value=value2 current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value=value3 current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.equal(this.$('.ui.radio.checked').length, 0);

  assert.equal('weekly', this.get('frequency'));
  this.set('value1', 'weekly');
  assert.ok(this.$(this.$('.ui.radio')[0]).hasClass('checked'));

  this.set('frequency', 'biweekly');
  assert.equal('biweekly', this.get('frequency'));
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
  assert.equal(count, 0, 'onChange should not have been called');
});

test('will selected when current promise resolves', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  let deferred = Ember.RSVP.defer();

  this.set('frequency', deferred.promise);
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.equal(this.$('.ui.radio.checked').length, 0);

  deferred.resolve('weekly');

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.ui.radio.checked').length, 1);
    assert.ok(this.$(this.$('.ui.radio')[0]).hasClass('checked'));
    assert.equal(count, 0, 'onChange should not have been called');
  });
});

test('will selected when value promise resolves', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  let deferred = Ember.RSVP.defer();

  this.set('frequency', 'biweekly');
  this.set('value2', deferred.promise);
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value=value2 current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.equal(this.$('.ui.radio.checked').length, 0);

  deferred.resolve('biweekly');

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.ui.radio.checked').length, 1);
    assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
    assert.equal(count, 0, 'onChange should not have been called');
  });
});

test('will selected when value promise resolves', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  let deferredCurrent = Ember.RSVP.defer();
  let deferredValue = Ember.RSVP.defer();

  this.set('frequency', deferredCurrent.promise);
  this.set('value3', deferredValue.promise);
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value=value2 current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.equal(this.$('.ui.radio.checked').length, 0);

  deferredCurrent.resolve('daily');
  deferredValue.resolve('daily');

  return afterRender(Ember.RSVP.all([deferredCurrent.promise, deferredValue.promise])).then(() => {
    assert.equal(this.$('.ui.radio.checked').length, 1);
    assert.ok(this.$(this.$('.ui.radio')[2]).hasClass('checked'));
    assert.equal(count, 0, 'onChange should not have been called');
  });
});

test('will update properly if a static value is replaced for a promise on value', function(assert) {
  assert.expect(7);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  let value2 = 'biweekly';

  this.set('frequency', 'biweekly');
  this.set('value2', value2);
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value=value2 current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));

  let deferred = Ember.RSVP.defer();

  this.set('value2', deferred.promise);

  // No changes should take place until the promise resolves
  assert.equal(this.$('.ui.radio').length, 3);
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));

  deferred.resolve('bi-weekly');

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.ui.radio').length, 3);
    assert.equal(this.$('.ui.radio.checked').length, 0);
    assert.equal(count, 0, 'onChange should not have been called');
  });
});

test('will update properly if a static value is replaced for a promise on current', function(assert) {
  assert.expect(8);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  let current = 'biweekly';

  this.set('frequency', current);
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action changed)}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action changed)}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));

  let deferred = Ember.RSVP.defer();

  this.set('current', deferred.promise);

  // No changes should take place until the promise resolves
  assert.equal(this.$('.ui.radio').length, 3);
  assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));

  deferred.resolve('biweekly');

  return afterRender(deferred.promise).then(() => {
    assert.equal(this.$('.ui.radio').length, 3);
    assert.equal(this.$('.ui.radio.checked').length, 1);
    assert.ok(this.$(this.$('.ui.radio')[1]).hasClass('checked'));
    assert.equal(count, 0, 'onChange should not have been called');
  });
});