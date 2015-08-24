import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui popup', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-popup content="Add users to your feed"}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  assert.equal(this.$('div[data-content]').length, 1);
});
