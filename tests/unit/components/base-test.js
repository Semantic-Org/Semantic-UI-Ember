import Ember from 'ember';
import BaseMixin from 'semantic-ui-ember/mixins/base';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let baseComponent = Ember.Component.extend(BaseMixin, {
  module: 'test',

  initSemanticModule() {
    // Do nothing
  },
  didInitSemantic() {
    // Do nothing
  },
  execute(command) {
    if (command === "internal") {
      return {};
    }
  }
});

moduleForComponent('base-component', 'Unit | Component | base component', {
  integration: true,
  beforeEach() {
    this.register('component:base-component', baseComponent);
  }
});

test('it renders and has right properties', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{base-component class="base-component" title="semantic ui ember" tabindex=5 autofocus=true}}`);

  assert.equal(this.$('.base-component').attr('title'), "semantic ui ember");
  assert.equal(this.$('.base-component').attr('tabindex'), "5");
  assert.equal(this.$('.base-component').attr('autofocus'), "autofocus");
});