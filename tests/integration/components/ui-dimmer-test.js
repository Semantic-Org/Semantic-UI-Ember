/* global stop, start */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dimmer', 'Integration | Component | ui dimmer', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  // Template block usage:
  this.render(hbs`
    {{#ui-dimmer class="ui segment"}}
      template block text
    {{/ui-dimmer}}
  `);

  assert.equal(this.$('.ui.segment .ui.dimmer').length, 1);
});

test('dimmer shows and hides on click', function(assert) {
  assert.expect(3);
  // Template block usage:
  this.render(hbs`
    {{#ui-dimmer class="ui segment" on="click" duration=(hash show=0 hide=0)}}
      template block text
    {{/ui-dimmer}}
  `);

  assert.equal(this.$('.ui.segment .ui.dimmer.active').length, 0);
  this.$('.ui.segment').click();

  stop();
  setTimeout(() => {
    start();
    assert.equal(this.$('.ui.segment .ui.dimmer.active').length, 1);
    this.$('.ui.segment').click();

    stop();
    setTimeout(() => {
      start();
      assert.equal(this.$('.ui.segment .ui.dimmer.active').length, 0);
    }, 100);
  }, 100);
});

test('dimmer only works on scoped element for shows and hides on click', function(assert) {
  assert.expect(3);
  // Template block usage:
  this.render(hbs`
    {{#ui-dimmer on="click" onElement=".ui.segment" duration=(hash show=0 hide=0)}}
      <div class="ui segment">
        template block text
      </div>
    {{/ui-dimmer}}
  `);

  assert.equal(this.$().children('.ui.dimmer').length, 0);
  this.$().click();

  stop();
  setTimeout(() => {
    start();
    // Check all dimmers
    assert.equal(this.$('.ui.dimmer.active').length, 0);
    this.$('.ui.segment').click();

    stop();
    setTimeout(() => {
      start();
      // animation takes a second after click
      assert.equal(this.$('.ui.segment .ui.dimmer.active').length, 1);
    }, 100);
  }, 100);
});

test('dimmer shows and hides from composable action', function(assert) {
  assert.expect(3);
  // Template block usage:
  this.render(hbs`
    {{#ui-dimmer on="click" onElement=".ui.segment" duration=(hash show=0 hide=0) as |execute|}}
      <div class="ui button" {{action execute "show"}} data-id="show">Show</div>
      <div class="ui button" {{action execute "hide"}} data-id="hide">Hide</div>
      <div class="ui segment">
        template block text
      </div>
    {{/ui-dimmer}}
  `);

  assert.equal(this.$().children('.ui.dimmer').length, 0);
  this.$('[data-id=show]').click();

  stop();
  setTimeout(() => {
    start();
    assert.equal(this.$('.ui.segment .ui.dimmer.active').length, 1);
    this.$('[data-id=hide]').click();

    stop();
    setTimeout(() => {
      start();
      // animation takes a second after click
      assert.equal(this.$('.ui.segment .ui.dimmer.active').length, 0);
    }, 100);
  }, 100);
});
