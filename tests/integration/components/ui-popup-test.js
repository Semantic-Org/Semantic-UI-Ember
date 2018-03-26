import Ember from 'ember';
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

test('title works with attribute bindings and popup title', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#ui-popup content="Add users to your feed" title="A title"}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  this.$('div').popup('show');

  let done = assert.async();

  setTimeout(() => {
    assert.equal(window.$('.ui.popup').length, 1);
    let popup = window.$('.ui.popup');

    assert.equal(popup.find('.header').text(), 'A title');
    // This isn't working right at the moment
    // https://github.com/Semantic-Org/Semantic-UI/pull/4614
    // assert.equal(popup.find('.content').text(), 'A title');
    // assert.equal(popup.find('.content').text(), 'Add users to your feed');

    done();
  }, 500);
});

test('position sets initially, then doesnt after that init', function(assert) {
  assert.expect(3);

  this.set('content', 'something');

  this.render(hbs`
    {{#ui-popup content=content position="bottom right"}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  this.$('div').popup('show');

  let done = assert.async();

  setTimeout(() => {
    assert.equal(window.$('.ui.popup').length, 1);
    let popup = window.$('.ui.popup');
    assert.equal(popup.text(), 'something');

    this.set('content', 'something else');

    assert.equal(popup.text(), 'something else');
    done();
  }, 500);
});

test('changing class doesnt throw error', function(assert) {
  assert.expect(5);

  this.set('class', 'some style');

  this.render(hbs`
    {{#ui-popup content="something" class=class}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  this.$('div').popup('show');

  let done = assert.async();

  setTimeout(() => {
    assert.equal(window.$('.ui.popup').length, 1);
    let popup = window.$('.ui.popup');
    assert.equal(popup.text(), 'something');

    assert.ok(this.$('div').attr('class').includes('some style'));

    this.set('class', 'other style');

    assert.equal(popup.text(), 'something');

    assert.ok(this.$('div').attr('class').includes('other style'));
    done();
  }, 500);
});

test('popup unwraps safe string', function(assert) {
  assert.expect(2);

  this.set('html', Ember.String.htmlSafe('<b>Awesome</b>'));

  this.render(hbs`
    {{#ui-popup html=html}}
      <div class="ui icon button">
        <i class="add icon"></i>
      </div>
    {{/ui-popup}}
  `);

  this.$('div').popup('show');

  let done = assert.async();

  setTimeout(() => {
    assert.equal(window.$('.ui.popup').length, 1);
    let popup = window.$('.ui.popup');
    assert.equal(popup.html(), '<b>Awesome</b>');
    done();
  }, 500);
});
