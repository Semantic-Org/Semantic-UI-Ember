import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-radio', 'Integration | Component | ui radio', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    <div class="ui form">
      <div class="grouped inline fields">
        <div class="field">
          {{ui-radio name="fruit" label="Once a week" checked=fruit}}
        </div>
        <div class="field">
          {{ui-radio name="fruit" label="2-3 times a week" checked=fruit}}
        </div>
        <div class="field">
          {{ui-radio name="fruit" label="Once a day" checked=fruit}}
        </div>
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.radio').length, 3);
});

test('selecting will update the bound property', function(assert) {
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
  this.$('.ui.radio')[2].click();
  assert.equal('daily', this.get('frequency'));
});
