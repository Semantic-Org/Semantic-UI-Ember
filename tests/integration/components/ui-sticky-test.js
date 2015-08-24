import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui sticky', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-sticky}}
      <p>Some text</p>
    {{/ui-sticky}}
  `);

  assert.equal($('.ui.sticky').length, 1);
  assert.ok($('.ui.sticky').css('width') !== undefined);
  assert.ok($('.ui.sticky').css('height') !== undefined);
});
