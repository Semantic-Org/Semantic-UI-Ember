import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-sticky', 'Integration | Component | ui sticky', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#ui-sticky}}
      <p>Some text</p>
    {{/ui-sticky}}
  `);

  assert.equal(this.$('.ui.sticky').length, 1);
  assert.ok(this.$('.ui.sticky').css('width') !== undefined);
  assert.ok(this.$('.ui.sticky').css('height') !== undefined);
});
