import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ui-checkbox', 'Integration | Component | ui checkbox', {
  integration: true
});

test('it binds value to checkbox', function(assert) {
  this.set('havingFun', true);

  this.render(hbs`{{ui-checkbox checked=havingFun}}`);

  var input = this.$('input')[0];
  assert.ok(input.checked);

  this.set('havingFun', false);
  assert.ok(!input.checked);

});

test('it sends checked action', function(assert) {
  this.render(hbs`{{ui-checkbox value='expelliarmus' checked=havingFun action='doStuff'}}`);

  this.on('doStuff', (e) => {
    assert.ok(true);
    assert.equal(e.value, 'expelliarmus');
  });

  this.$('input').click();
});
