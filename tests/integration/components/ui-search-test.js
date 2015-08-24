import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui search', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-search url="/search"}}
      <input class="prompt" type="text" placeholder="Common passwords...">
      <div class="results"></div>
    {{/ui-search}}
  `);

  assert.equal(this.$('.ui.search').length, 1);
});
