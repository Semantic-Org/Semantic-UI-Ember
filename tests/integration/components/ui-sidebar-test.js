import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-sidebar', 'Integration | Component | ui sidebar', {
  integration: true
});

test('it renders as sub context', function(assert) {
  assert.expect(2);

  this.render(hbs`
    <div class="component context">
      {{#ui-sidebar context=".component.context"}}
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
