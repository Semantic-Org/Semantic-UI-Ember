import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-accordion', 'Integration | Component | ui accordion', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-accordion class="styled"}}
      <div class="title">
        Semantic UI
      </div>
      <div class="content">
        Accordion Component
      </div>
      <div class="title">
        Section Two
      </div>
      <div class="content">
        Content Two
      </div>
    {{/ui-accordion}}
  `);

  assert.equal($('.ui.accordion').length, 1);
});
