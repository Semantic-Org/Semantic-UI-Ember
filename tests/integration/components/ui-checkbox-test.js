import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-checkbox', 'Integration | Component | ui checkbox', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('checked', false);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
});

test('checking will update the bound property', function(assert) {
  assert.expect(2);

  this.set('checked', false);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked onChange=(action (mut checked))}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
});

test('setting disabled ignores click', function(assert) {
  assert.expect(3);

  this.set('checked', false);
  this.set('disabled', true);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked disabled=disabled onChange=(action (mut checked))}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(false, this.get('checked'));

  this.set('disabled', false);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
});

test('setting readonly ignores click', function(assert) {
  assert.expect(3);

  this.set('checked', false);
  this.set('readonly', true);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked readonly=readonly onChange=(action (mut checked))}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(false, this.get('checked'));

  this.set('readonly', false);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
});