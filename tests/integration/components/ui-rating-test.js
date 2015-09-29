import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-rating', 'Integration | Component | ui rating', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{ui-rating initialRating=3 maxRating=7}}
  `);

  assert.equal(this.$('.ui.rating').length, 1);
});

test('it updates with bound values', function(assert) {
  this.set('rating', 3);
  this.render(hbs`
    {{ui-rating rating=rating maxRating=7}}
  `);

  assert.equal(this.$('.ui.rating').length, 1);
  assert.equal(this.$('.ui.rating .active').length, 3);
  this.set('rating', 6);
  assert.equal(this.$('.ui.rating .active').length, 6);
});
