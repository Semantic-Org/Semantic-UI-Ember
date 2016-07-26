import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-rating', 'Integration | Component | ui rating', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{ui-rating initialRating=3 maxRating=6}}
  `);

  assert.equal(this.$('.ui.rating').length, 1);
  assert.equal(this.$('.ui.rating i').length, 6);
  assert.equal(this.$('.ui.rating .active').length, 3);
});

test('it updates with bound values', function(assert) {
  assert.expect(4);

  this.set('rating', 3);
  this.render(hbs`
    {{ui-rating rating=rating maxRating=7}}
  `);

  assert.equal(this.$('.ui.rating').length, 1);
  assert.equal(this.$('.ui.rating i').length, 7);
  assert.equal(this.$('.ui.rating .active').length, 3);
  this.set('rating', 6);
  assert.equal(this.$('.ui.rating .active').length, 6);
});

test('clicking updates with bound values', function(assert) {
  assert.expect(5);

  this.set('rating', 3);
  this.render(hbs`
    {{ui-rating rating=rating maxRating=7 onRate=(action (mut rating))}}
  `);

  assert.equal(this.$('.ui.rating').length, 1);
  assert.equal(this.$('.ui.rating i').length, 7);
  assert.equal(this.$('.ui.rating .active').length, 3);
  this.$('.ui.rating i:nth-child(4)').click();
  assert.equal(this.$('.ui.rating .active').length, 4);
  assert.equal(4, this.get('rating'));
});

test('clicking updates with bound values and clicking again clears', function(assert) {
  assert.expect(7);

  this.set('rating', 3);
  this.render(hbs`
    {{ui-rating rating=rating onRate=(action (mut rating)) clearable=true}}
  `);

  assert.equal(this.$('.ui.rating').length, 1);
  assert.equal(this.$('.ui.rating i').length, 4);
  assert.equal(this.$('.ui.rating .active').length, 3);
  this.$('.ui.rating i:nth-child(4)').click();
  assert.equal(this.$('.ui.rating .active').length, 4);
  assert.equal(4, this.get('rating'));
  this.$('.ui.rating i:nth-child(4)').click();
  assert.equal(this.$('.ui.rating .active').length, 0);
  assert.equal(0, this.get('rating'));
});
