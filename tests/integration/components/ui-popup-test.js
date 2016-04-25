import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-popup', 'Integration | Component | ui popup', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#ui-popup content="Add users to your feed"}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  assert.equal(this.$('div').popup('get content')[0], 'Add users to your feed');
});

test('updating content updates popup', function(assert) {
  assert.expect(2);

  this.set('content', 'This is dynamic content');
  this.render(hbs`
    {{#ui-popup content=content}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  assert.equal(this.$('div').popup('get content')[0], 'This is dynamic content');

  this.set('content', 'Now it magically changed!');

  assert.equal(this.$('div').popup('get content')[0], 'Now it magically changed!');
});
