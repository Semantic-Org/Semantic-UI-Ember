import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui dropdown', {
  integration: true
});

test('it renders from an array', function(assert) {
  assert.expect(3);

  this.set('people', [ "Sherlock Homes", "Patrick Bateman" ]);
  this.render(hbs`
    {{#ui-dropdown value=value}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person}}>{{person}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('value'), undefined);

  this.$(".menu .item[data-value='Sherlock Homes']").click();
  assert.equal(this.get('value'), 'Sherlock Homes');
});

test('it renders from an object array', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown value=value}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('value'), undefined);

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('value'), 1);
});

test('it renders with an option selected', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.set('value', 2);
  this.render(hbs`
    {{#ui-dropdown value=value}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('value'), 2);

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('value'), 1);
});

test('it renders multiple', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown class='multiple' value=value}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('value'), undefined);

  this.$(".menu .item[data-value=1]").click();
  this.$(".menu .item[data-value=2]").click();
  assert.equal(this.get('value'), '1,2');
});

test('it binds to an object', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown value=value}}
      <div class='menu'>
      {{#each people as |person|}}
        {{#ui-dropdown-item content=person}}
          {{person.name}}
        {{/ui-dropdown-item}}
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('value'), undefined);

  this.$(".menu .item")[1].click();
  assert.equal(this.get('value'), this.get('people')[1]);
});
