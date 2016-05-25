import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-embed', 'Integration | Component | ui embed', {
  integration: true
});

test('it embeds youtube by id', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{ui-embed data-source="youtube" data-id="pfdu_gTry8E"}}
  `);

  assert.equal(this.$('.ui.embed .embed iframe').length, 1);
  let src = this.$('.ui.embed .embed iframe').attr('src');
  assert.ok(src.includes('youtube.com'));
});

test('it embeds through a url', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{ui-embed data-url="https://www.youtube.com/embed/pfdu_gTry8E"}}
  `);

  assert.equal(this.$('.ui.embed .embed iframe').length, 1);
  let src = this.$('.ui.embed .embed iframe').attr('src');
  assert.ok(src.includes('youtube.com'));
});

test('embeds works through parameters', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{ui-embed url="https://www.youtube.com/embed/pfdu_gTry8E"}}
  `);

  assert.equal(this.$('.ui.embed .embed iframe').length, 1);
  let src = this.$('.ui.embed .embed iframe').attr('src');
  assert.ok(src.includes('youtube.com'));
});
