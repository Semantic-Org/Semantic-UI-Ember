import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-sidebar', 'Integration | Component | ui sidebar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    <div class="component context">
      {{#ui-sidebar ui_context=".component.context"}}
        <a class="item">1</a>
        <a class="item">2</a>
        <a class="item">3</a>
      {{/ui-sidebar}}
      <div class="pusher">
        Main Content here
      </div>
    </div>
  `);

  assert.equal(this.$('.ui.sidebar').length, 1);
  assert.equal(this.$('.ui.sidebar a').length, 3);
});
