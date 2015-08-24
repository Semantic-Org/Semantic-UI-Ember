import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui embed', {
  integration: true
});

test('it embeds youtube by id', function(assert) {
  this.render(hbs`
    {{ui-embed data-source="youtube" data-id="pfdu_gTry8E"}}
  `);

  assert.equal(this.$('.ui.embed .embed iframe').length, 1);
});

test('it embeds through a url', function(assert) {
  this.render(hbs`
    {{ui-embed data-url="https://www.youtube.com/embed/pfdu_gTry8E"}}
  `);

  assert.equal(this.$('.ui.embed .embed iframe').length, 1);
});
