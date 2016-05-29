import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-search', 'Integration | Component | ui search', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#ui-search url="/search"}}
      <input class="prompt" type="text" placeholder="Common passwords...">
      <div class="results"></div>
    {{/ui-search}}
  `);

  assert.equal(this.$('.ui.search').length, 1);
});

test('searching content works', function(assert) {
  assert.expect(5);

  this.set('commonPasswords', [
    { title: "bobby" },
    { title: "12345" }
  ]);

  this.set('query', null);
  this.set('selected', null);

  this.render(hbs`
    {{#ui-search source=commonPasswords onSearchQuery=(action (mut query)) onSelect=(action (mut selected))}}
      <input class="prompt" type="text" placeholder="Common passwords...">
      <div class="results"></div>
    {{/ui-search}}
  `);

  assert.equal(this.$('.ui.search').length, 1);
  assert.equal(this.get('query'), null);
  assert.equal(this.get('selected'), null);

  this.$('input').focus();
  this.$('input').val('123');
  this.$('.ui.search').search('query');

  assert.equal(this.get('query'), "123");

  this.$('.ui.search').search('show results');

  let done = assert.async();

  setTimeout(() => {
    this.$('.result').addClass('active');
    this.$('input').trigger(window.jQuery.Event('keydown', { which: 13 }));

    assert.equal(this.get('selected.title'), "12345");
    done();
  }, 500);
});
