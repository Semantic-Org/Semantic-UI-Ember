import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui checkbox', {
  integration: true
});

test('it renders', function(assert) {
  this.set('checked', false);
  this.render(hbs`
    {{ui-checkbox label="Make my profile visible" checked=checked}}
  `);

  assert.equal($('.ui.checkbox').length, 1);
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
