import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui dropdown', {
  integration: true
});

test('it renders from an array', function(assert) {
  assert.expect(3);

  this.set('people', [ "Sherlock Homes", "Patrick Bateman" ]);
  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected))}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person}}>{{person}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('selected'), undefined);

  this.$(".menu .item[data-value='Sherlock Homes']").click();
  assert.equal(this.get('selected'), 'Sherlock Homes');
});

test('it renders from an object array', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected))}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('selected'), undefined);

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected'), 1);
});

test('it renders with an option selected', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.set('selected', 2);
  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected))}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('selected'), 2);

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected'), 1);
});

test('it renders multiple', function(assert) {
  assert.expect(3);

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown class='multiple' selected=selected onChange=(action (mut selected))}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.get('selected'), undefined);

  this.$(".menu .item[data-value=1]").click();
  this.$(".menu .item[data-value=2]").click();
  assert.equal(this.get('selected'), '1,2');
});

test('it sets the value from the binding', function(assert) {
  assert.expect(3);

  this.set('people_id', 2);
  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown selected=people_id onChange=(action (mut selected))}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class="item" data-value="{{person.id}}">
          {{person.name}}
        </div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.$('.item.selected').length, 1);
  assert.equal(this.$('.item.selected').data('value'), 2);
});

test('it updates the value if updated from the binding', function(assert) {
  assert.expect(3);

  this.set('people_id', 2);
  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown selected=people_id onChange=(action (mut selected))}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class="item" data-value="{{person.id}}">
          {{person.name}}
        </div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);

  this.set('people_id', 1);
  assert.equal(this.$('.item.selected').data('value'), 1);

  $(this.$('.item')[0]).click();
  assert.equal(this.get('people_id'), 1);
});

test('it can set the selected value without binding for full DDAU', function(assert) {
  assert.expect(4);

  this.set('people_id', 2);
  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown onChange=(action (mut people_id))}}
      <input type="hidden" name="person" value="{{people_id}}" />
      <div class='menu'>
      {{#each people as |person|}}
        <div class="item" data-value="{{person.id}}">
          {{person.name}}
        </div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2);
  assert.equal(this.$('.item.selected').length, 0);

  $(this.$('.item')[0]).click();
  assert.equal(this.$('.item.selected').data('value'), 1);
  assert.equal(this.get('people_id'), 1);
});

test('it renders and clears the value if it changes and isnt found', function(assert) {
  assert.expect(10);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected.id onChange=(action (mut selected.id))}}
      <i class="dropdown icon"></i>
      <div class="default text"></div>
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");
  assert.equal(this.$('.ui.dropdown > .text').text(), '', "Default text isn't blank");

  this.set('selected', this.get('people').objectAt(1));
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");
  assert.equal(this.$('.ui.dropdown > .text').text(), 'Patrick Bateman', "Default text isn't correct");

  this.$(".menu .item[data-value=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");

  // Now clear the property
  this.set('selected', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.$('.ui.dropdown > .text').text(), '', "Default text isn't blank");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");
});


///
// Object mapping
///
test('it renders from a mapper', function(assert) {
  assert.expect(3);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected)) as |execute mapper|}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{map-value mapper person}} data-id={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.$(".menu .item[data-id=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");
});


test('it renders from a mapper and preselects the right value', function(assert) {
  assert.expect(3);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.set('selected', this.get('people').objectAt(1));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected)) as |execute mapper|}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{map-value mapper person}} data-id={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected.id'), "2", "Patrick has been selected");

  this.$(".menu .item[data-id=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");
});

test('it renders from a mapper and selects the right value if late', function(assert) {
  assert.expect(4);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected)) as |execute mapper|}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{map-value mapper person}} data-id={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.set('selected', this.get('people').objectAt(1));
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");

  this.$(".menu .item[data-id=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");
});

test('it renders from a mapper and clears the value if it changes and isnt found', function(assert) {
  assert.expect(10);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected)) as |execute mapper|}}
      <i class="dropdown icon"></i>
      <div class="default text"></div>
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{map-value mapper person}} data-id={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");
  assert.equal(this.$('.ui.dropdown > .text').text(), '', "Default text isn't blank");

  this.set('selected', this.get('people').objectAt(1));
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");
  assert.equal(this.$('.ui.dropdown > .text').text(), 'Patrick Bateman', "Default text isn't correct");

  this.$(".menu .item[data-id=1]").click();
  assert.equal(this.get('selected.id'), "1", "Sherlock has been selected");

  // Now clear the property
  this.set('selected', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.$('.ui.dropdown > .text').text(), '', "Default text isn't blank");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");
});

test('it renders from a mapper and clears the value if it changes and isnt found on sub property', function(assert) {
  assert.expect(7);

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected.sub onChange=(action (mut selected.sub)) as |execute mapper|}}
      <div class='menu'>
      {{#each people as |person|}}
        <div class='item' data-value={{map-value mapper person}} data-id={{person.id}}>{{person.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  let selected = Ember.Object.create({ sub: this.get('people').objectAt(1) });

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected.sub'), undefined, "Nothing is selected");

  this.set('selected', selected);
  assert.equal(this.$('.item.active').text(), "Patrick Bateman");

  this.$(".menu .item[data-id=1]").click();
  assert.equal(this.get('selected.sub.id'), "1", "Sherlock has been selected");

  // Now clear the property
  this.set('selected.sub', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.get('selected.sub'), undefined, "Nothing is selected");
});

test('it renders from a mapper and binds to value', function(assert) {
  assert.expect(7);

  this.set('numbers', Ember.A([
    1,
    2
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action (mut selected)) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{map-value mapper number}} data-id={{number}}>{{number}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.get('selected'), undefined, "Nothing is selected");

  this.set('selected', 2);
  assert.equal(this.$('.item.active').text(), "2");

  this.$(".menu .item[data-id=1]").click();
  assert.equal(this.get('selected'), 1, "Sherlock has been selected");

  // Now clear the property
  this.set('selected', null);

  assert.equal(this.$('.item').length, 2, "Right number of items");
  assert.equal(this.$('.item.active').length, 0);
  assert.equal(this.get('selected'), null, "Nothing is selected");
});

// TODO: Add dropdown multiple binded tests