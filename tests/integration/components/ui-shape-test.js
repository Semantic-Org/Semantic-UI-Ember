import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui shape', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-shape}}
      <p>Content</p>
    {{/ui-shape}}
  `);

  assert.equal(this.$('.ui.shape').length, 1);
});
