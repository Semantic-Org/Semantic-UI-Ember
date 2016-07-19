import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui dropdown', {
  integration: true
});

test('it renders from an array', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', [ "Sherlock Homes", "Patrick Bateman" ]);
  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed)}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders from an object array', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed)}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders with an option selected', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.set('selected', 2);
  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed)}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders multiple', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown class='multiple' selected=selected onChange=(action changed)}}
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
  assert.equal(count, 2, 'onChange should have been called only once');
});

test('it sets the value from the binding', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people_id', 2);
  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown selected=people_id onChange=(action changed)}}
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
  assert.equal(count, 0, 'onChange should have not been called');
});

test('it updates the value if updated from the binding', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people_id', 2);
  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown selected=people_id onChange=(action changed)}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it can set the selected value without binding for full DDAU', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', (value) => {
    this.set('people_id', value);
    count++;
  });

  this.set('people_id', 2);
  this.set('people', [
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]);

  this.render(hbs`
    {{#ui-dropdown onChange=(action changed)}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders and clears the value if it changes and isnt found', function(assert) {
  assert.expect(11);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected.id', value);
    count++;
  });

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected.id onChange=(action changed)}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});


///
// Object mapping
///
test('it renders from a mapper', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed) as |execute mapper|}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});


test('it renders from a mapper and preselects the right value', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.set('selected', this.get('people').objectAt(1));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed) as |execute mapper|}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders from a mapper and selects the right value if late', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed) as |execute mapper|}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders from a mapper and clears the value if it changes and isnt found', function(assert) {
  assert.expect(11);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed) as |execute mapper|}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders from a mapper and clears the value if it changes and isnt found on sub property', function(assert) {
  assert.expect(8);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected.sub', value);
    count++;
  });

  this.set('people', Ember.A([
    { id: 1, name: "Sherlock Homes" },
    { id: 2, name: "Patrick Bateman" }
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected.sub onChange=(action changed) as |execute mapper|}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('it renders from a mapper and binds to value', function(assert) {
  assert.expect(8);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('numbers', Ember.A([
    1,
    2
  ]));

  this.render(hbs`
    {{#ui-dropdown selected=selected onChange=(action changed) as |execute mapper|}}
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
  assert.equal(count, 1, 'onChange should have been called only once');
});

test('The correct number of items are pre selected on selected array', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('numbers', Ember.A([
    '1',
    '2',
    '3',
    '4',
    '5'
  ]));

  this.set('selected', ['2', '4']);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{number}} data-id={{number}}>{{number}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 2, "Pre selected count");
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.ok(this.$('.item[data-id=4]').hasClass('active'));
  assert.equal(count, 0, 'onChange should not have been called');
});

test('The correct number of items are pre selected on selected item', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('numbers', Ember.A([
    '1',
    '2',
    '3',
    '4',
    '5'
  ]));

  this.set('selected', '2');

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{number}} data-id={{number}}>{{number}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 1, "Pre selected count");
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.equal(count, 0, 'onChange should not have been called');
});

test('The correct number of items are pre selected on selected object array', function(assert) {
  assert.expect(5);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  let numbers = Ember.A([
    { item: 1, name: 'One' },
    { item: 2, name: 'Two' },
    { item: 3, name: 'Three' },
    { item: 4, name: 'Four' },
    { item: 5, name: 'Five' }
  ]);

  this.set('numbers', numbers);

  this.set('selected', [numbers[1], numbers[3]]);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{map-value mapper number}} data-id={{number.item}}>{{number.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 2, "Pre selected count");
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.ok(this.$('.item[data-id=4]').hasClass('active'));
  assert.equal(count, 0, 'onChange should not have been called');
});

test('The correct number of items are pre selected on selected object item', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  let numbers = Ember.A([
    { item: 1, name: 'One' },
    { item: 2, name: 'Two' },
    { item: 3, name: 'Three' },
    { item: 4, name: 'Four' },
    { item: 5, name: 'Five' }
  ]);

  this.set('numbers', numbers);

  this.set('selected', numbers[1]);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{map-value mapper number}} data-id={{number.item}}>{{number.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 1, "Pre selected count");
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.equal(count, 0, 'onChange should not have been called');
});

test('The correct number of items get selected when clicked', function(assert) {
  assert.expect(7);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('numbers', Ember.A([
    '1',
    '2',
    '3',
    '4',
    '5'
  ]));

  this.set('selected', []);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{number}} data-id={{number}}>{{number}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 0, "Pre selected count");
  this.$('.item[data-id=2]').click();
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.equal(this.get('selected').join(','), ['2'].join(','));

  this.$('.item[data-id=4]').click();
  assert.ok(this.$('.item[data-id=4]').hasClass('active'));
  assert.equal(this.get('selected').join(','), ['2', '4'].join(','));
  assert.equal(count, 2, 'onChange should not have been called');
});

// clicking binded items updates collection
test('The correct number of items get selected when clicked', function(assert) {
  assert.expect(7);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  let numbers = Ember.A([
    { item: 1, name: 'One' },
    { item: 2, name: 'Two' },
    { item: 3, name: 'Three' },
    { item: 4, name: 'Four' },
    { item: 5, name: 'Five' }
  ]);

  this.set('numbers', numbers);

  this.set('selected', []);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{map-value mapper number}} data-id={{number.item}}>{{number.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 0, "Pre selected count");
  this.$('.item[data-id=2]').click();
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.equal(this.get('selected').join(','), [numbers[1]].join(','));

  this.$('.item[data-id=4]').click();
  assert.ok(this.$('.item[data-id=4]').hasClass('active'));
  assert.equal(this.get('selected').join(','), [numbers[1], numbers[3]].join(','));
  assert.equal(count, 2, 'onChange should not have been called');
});
// setting binded items, updates collection

test('The correct number of items get selected when array is modified', function(assert) {
  assert.expect(7);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  this.set('numbers', Ember.A([
    '1',
    '2',
    '3',
    '4',
    '5'
  ]));

  this.set('selected', []);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{number}} data-id={{number}}>{{number}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 0, "Pre selected count");
  this.set('selected', ['2']);

  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.equal(this.get('selected').join(','), ['2'].join(','));

  this.set('selected', ['2', '4']);
  // Have to clear the queue to ensure that property change gets notified
  // Doesn't clear in time on tests occasionally
  Ember.run.sync();

  assert.ok(this.$('.item[data-id=4]').hasClass('active'));
  assert.equal(this.get('selected').join(','), ['2', '4'].join(','));
  assert.equal(count, 0, 'onChange should not have been called');
});

// clicking binded items updates collection
test('The correct number of items get selected when array bindings is modified', function(assert) {
  assert.expect(7);

  let count = 0;
  this.set('changed', (value) => {
    this.set('selected', value);
    count++;
  });

  let numbers = Ember.A([
    { item: 1, name: 'One' },
    { item: 2, name: 'Two' },
    { item: 3, name: 'Three' },
    { item: 4, name: 'Four' },
    { item: 5, name: 'Five' }
  ]);

  this.set('numbers', numbers);

  this.set('selected', []);

  this.render(hbs`
    {{#ui-dropdown class="multiple" selected=selected onChange=(action changed) as |execute mapper|}}
      <div class='menu'>
      {{#each numbers as |number|}}
        <div class='item' data-value={{map-value mapper number}} data-id={{number.item}}>{{number.name}}</div>
      {{/each}}
      </div>
    {{/ui-dropdown}}
  `);

  assert.equal(this.$('.item').length, 5, "Right number of items");
  assert.equal(this.$('.item.active').length, 0, "Pre selected count");
  this.set('selected', [numbers[1]]);
  assert.ok(this.$('.item[data-id=2]').hasClass('active'));
  assert.equal(this.get('selected').join(','), [numbers[1]].join(','));

  this.set('selected', [numbers[1], numbers[3]]);
  assert.ok(this.$('.item[data-id=4]').hasClass('active'));
  assert.equal(this.get('selected').join(','), [numbers[1], numbers[3]].join(','));
  assert.equal(count, 0, 'onChange should not have been called');
});