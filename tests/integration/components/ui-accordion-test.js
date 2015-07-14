import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ui-accordion', 'Integration | Component | ui accordion', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
    {{#ui-accordion}}
      template block text
    {{/ui-accordion}}
  `);
  
  assert.equal(this.$().text().trim(), 'template block text');
});
