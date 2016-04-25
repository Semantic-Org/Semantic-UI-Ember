/* global stop, start */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-progress', 'Integration | Component | ui progress', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-progress percent=40 class="teal indicating"}}
      <div class="bar"></div>
      <div class="label">Completed</div>
    {{/ui-progress}}
  `);

  assert.equal(this.$('.ui.progress').length, 1);
});

test('binding updates value progress', function(assert) {
  assert.expect(4);

  this.set('progress', 40);
  this.render(hbs`
    {{#ui-progress percent=progress class="teal indicating"}}
      <div class="bar"></div>
      <div class="label">Completed</div>
    {{/ui-progress}}
  `);

  assert.equal(this.$('.ui.progress').length, 1);
  assert.equal(this.$('.ui.progress').attr('data-percent'), 40);
  var width = this.$('.ui.progress .bar').css('width');
  this.set('progress', 60);

  stop();
  setTimeout(() => {
    start();

    assert.equal(this.$('.ui.progress').attr('data-percent'), 60);
    assert.notEqual(this.$('.ui.progress .bar').css('width'), width);
  }, 500);
});

test('binding updates progress', function(assert) {
  assert.expect(4);

  this.set('value', 15);
  this.render(hbs`
    {{#ui-progress value=(unbound value) progress=value total=30 class="teal indicating"}}
      <div class="bar"></div>
      <div class="label">Completed</div>
    {{/ui-progress}}
  `);

  assert.equal(this.$('.ui.progress').length, 1);
  assert.equal(this.$('.ui.progress').attr('data-percent'), 50);
  var width = this.$('.ui.progress .bar').css('width');
  this.set('value', 21);

  stop();
  setTimeout(() => {
    start();

    assert.equal(this.$('.ui.progress').attr('data-percent'), 70);
    assert.notEqual(this.$('.ui.progress .bar').css('width'), width);
  }, 500);
});
