import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ui-dropdown', 'Integration | Component | ui dropdown', {
  integration: true
});

var objectCollection = [
  {id: 1, class: 'Wizard'},
  {id: 2, class: 'Muggle'},
  {id: 3, class: 'House Elf'}
];

var arrayCollection = [
  'Wizard',
  'Muggle',
  'House Elf'
];

test('It renders options from plain array', function(assert) {

  this.set('content', arrayCollection);
  this.render(hbs`{{ui-dropdown content=content}}`);
  var options = [];
  this.$('option').each((index, item) => {
    options.push(item.textContent);
  });
  assert.deepEqual(options, arrayCollection);
});

test('It renders options from an object array', function(assert) {
  this.set('content', objectCollection);
  this.render(hbs`{{ui-dropdown content=content optionLabel='class' optionValue='id'}}`);
  var options = [];
  this.$('option').each((index, item) => {
    options.push({id: parseInt(item.value) ,class: item.textContent});
  });
  assert.deepEqual(options, objectCollection);
});

test('It has option selected', function(assert) {
  this.set('content', objectCollection);
  this.set('selectedValue', 1);
  this.render(hbs`{{ui-dropdown selectedValue=selectedValue content=content optionLabel='class' optionValue='id'}}`);

  var result = this.$('option').filter((index, item) => {
    return item.selected;
  });

  assert.deepEqual(result[0].label, objectCollection[0].class);
});

test('It triggers action', function (assert){
  this.set('content', objectCollection);
  this.set('selectedValue', 1);
  this.set('onSelect', (obj) => {
    assert.equal(obj.id, 2);
    assert.equal(obj.class, 'Muggle');
  });
  this.render(hbs`{{ui-dropdown onSelect=onSelect selectedValue=selectedValue content=content optionLabel='class' optionValue='id'}}`);
  this.$('select').val("2").change();
});
