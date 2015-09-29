/* global $ */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-sidebar', 'Integration | Component | ui sidebar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-sidebar}}
      <a class="item">1</a>
      <a class="item">2</a>
      <a class="item">3</a>
    {{/ui-sidebar}}
  `);

  assert.equal($('.ui.sidebar').length, 1);
  assert.equal($('.ui.sidebar a').length, 3);
});
