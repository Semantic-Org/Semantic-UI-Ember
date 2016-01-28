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
