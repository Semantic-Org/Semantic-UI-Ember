import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui embed', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{ui-embed data-source="youtube" data-id="pfdu_gTry8E"}}
  `);

  assert.equal(this.$('.ui.embed .embed iframe').length, 1);
});
