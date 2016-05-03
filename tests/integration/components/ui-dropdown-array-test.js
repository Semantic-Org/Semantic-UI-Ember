import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown-array', 'Integration | Component | ui dropdown array', {
  integration: true
});

test('it renders from an array', function(assert) {
  assert.expect(3);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown-array content=people selected=selected}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown-array}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");
});


test('it renders from an array and preselects the right value', function(assert) {
  assert.expect(3);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.set('selected', this.get('people').objectAt(1));

  this.render(hbs`
    {{#ui-dropdown-array content=people selected=selected}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown-array}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected.id'), "2", "Patrick has been selected");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");
});

test('it renders from an array and selects the right value if late', function(assert) {
  assert.expect(4);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown-array content=people selected=selected}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown-array}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.set('selected', this.get('people').objectAt(1));
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");
});

test('it renders from an array and clears the value if it changes and isnt found', function(assert) {
  assert.expect(7);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown-array content=people selected=selected}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown-array}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.set('selected', this.get('people').objectAt(1));
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");

  // Now clear the property
  this.set('selected', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.get('selected'), undefined, "Nothing is selected");
});

test('it renders from an array and clears the value if it changes and isnt found on sub property', function(assert) {
  assert.expect(7);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown-array content=people selected=selected.sub}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown-array}}
  `);

  let selected = Ember.Object.create({ sub: this.get('people').objectAt(1) });

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected.sub'), undefined, "Nothing is selected");

  this.set('selected', selected);
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected.sub.id'), "1", "Sherlock has been selected");

  // Now clear the property
  this.set('selected.sub', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.get('selected.sub'), undefined, "Nothing is selected");
});

test('it renders from an array and binds to value if find_by is empty (value binding)', function(assert) {
  assert.expect(7);

  this.set('numbers', Ember.A([
    1,
    2
  ]));

  this.render(hbs`
    {{#ui-dropdown-array content=numbers selected=selected find_by=''}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{number}}>{{number}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown-array}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.set('selected', 2);
  assert.equal(this.$('.item.active').text(), "2");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected'), 1, "Sherlock has been selected");

  // Now clear the property
  this.set('selected', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.get('selected'), undefined, "Nothing is selected");
});
