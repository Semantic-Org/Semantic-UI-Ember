import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-checkbox', 'Integration | Component | ui checkbox', {
  integration: true
});

test('it renders', function(assert) {
  this.set('checked', false);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
});

test('checking will update the bound property', function(assert) {
  this.set('checked', false);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
});

test('setting disabled ignores click', function(assert) {
  this.set('checked', false);
  this.set('disabled', true);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked disable=disabled}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(false, this.get('checked'));

  this.set('disabled', false);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
});

test('setting readonly ignores click', function(assert) {
  this.set('checked', false);
  this.set('readonly', true);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked readonly=readonly}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(false, this.get('checked'));

  this.set('readonly', false);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
});