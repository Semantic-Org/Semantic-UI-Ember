import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
  assert.expect(2);

  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  assert.equal(this.$('.ui.radio input:checked').val(), 'weekly');
});

test('selecting will update the bound property', function(assert) {
  assert.expect(2);

  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action (mut frequency))}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[2].click();
  assert.equal('daily', this.get('frequency'));
});

test('selecting twice will update the bound property to the latest', function(assert) {
  assert.expect(4);

  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action (mut frequency))}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[2].click();
  assert.equal('daily', this.get('frequency'));
  this.$(this.$('.ui.radio')[2]).hasClass('checked');

  this.$('.ui.radio')[0].click();
  assert.equal('weekly', this.get('frequency'));
  this.$(this.$('.ui.radio')[0]).hasClass('checked');

  this.$('.ui.radio')[1].click();
  assert.equal('biweekly', this.get('frequency'));
  this.$(this.$('.ui.radio')[1]).hasClass('checked');
});

test('setting disabled ignores click', function(assert) {
  assert.expect(3);

  this.set('checked', false);
  this.set('disabled', true);
  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency disabled=disabled onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action (mut frequency))}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[1].click();

  assert.equal('weekly', this.get('frequency'));
  this.$(this.$('.ui.radio')[0]).hasClass('checked');

  this.set('disabled', false);

  this.$('.ui.radio')[1].click();
  assert.equal('biweekly', this.get('frequency'));
  this.$(this.$('.ui.radio')[1]).hasClass('checked');
});

test('setting readonly ignores click', function(assert) {
  assert.expect(3);

  this.set('checked', false);
  this.set('readonly', true);
  this.set('frequency', 'weekly');
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="frequency" label="Once a week" value='weekly' current=frequency onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="2-3 times a week" value='biweekly' current=frequency readonly=readonly onChange=(action (mut frequency))}}
        </div>
        <div class="field">
          {{ui-radio name="frequency" label="Once a day" value='daily' current=frequency onChange=(action (mut frequency))}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
  this.$('.ui.radio')[1].click();

  assert.equal('weekly', this.get('frequency'));
  this.$(this.$('.ui.radio')[0]).hasClass('checked');

  this.set('readonly', false);

  this.$('.ui.radio')[1].click();
  assert.equal('biweekly', this.get('frequency'));
  this.$(this.$('.ui.radio')[1]).hasClass('checked');
});