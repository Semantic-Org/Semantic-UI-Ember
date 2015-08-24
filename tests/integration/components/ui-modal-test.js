/* global stop, start */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown', 'Integration | Component | ui modal', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{ui-modal name='profile'}}
  `);

  assert.equal(this.$('.ui.modal').length, 1);
});

test('it will show if triggered', function(assert) {
  assert.expect(3);

  var _this = this;

  this.on('openModal', function() {
    _this.$('.ui.modal').modal('show', function() {
      start();
      assert.equal(_this.$('.ui.modal.visible').length, 1, ".ui.modal is visible after showing");
    });
  });

  this.render(hbs`
    <div class="ui button" {{action 'openModal' 'profile'}}>
      Open
    </div>

    {{ui-modal name='profile'}}
  `);

  assert.equal(this.$('.ui.modal').length, 1, ".ui.modal exists");
  assert.equal(this.$('.ui.modal.visible').length, 0, ".ui.modal is not visible");

  stop();
  this.$('.ui.button').click();
});

test('it will send approve back to controller and hide', function(assert) {
  assert.expect(3);

  var _this = this;

  this.on('openModal', function() {
    _this.$('.ui.modal').modal('show', function() {
      assert.equal(_this.$('.ui.modal.visible').length, 1, ".ui.modal is visible after showing");
      _this.$('.ui.modal .ui.positive.button').click();
    });
  });

  this.on('approve', function(name) {
    assert.equal('profile', name, 'approve is called');
    setTimeout(function() {
      start();
      assert.equal(_this.$('.ui.modal.visible').length, 0, ".ui.modal is not visible after clicking");
    }, 1000);
    return true;
  });

  this.render(hbs`
    <div class="ui open button" {{action 'openModal' 'profile'}}>
      Open
    </div>

    {{#ui-modal name='profile' approve=(action 'approve')}}
      <div class="actions">
        <div class="ui negative button">No</div>
        <div class="ui positive button">Yes</div>
      </div>
    {{/ui-modal}}
  `);

  stop();
  this.$('.ui.open.button').click();
});

test('it will send approve back to controller and skip the hide', function(assert) {
  assert.expect(3);

  var _this = this;

  this.on('openModal', function() {
    _this.$('.ui.modal').modal('show', function() {
      assert.equal(_this.$('.ui.modal.visible').length, 1, ".ui.modal is visible after showing");
      _this.$('.ui.modal .ui.positive.button').click();
    });
  });

  this.on('approve', function(name) {
    assert.equal('profile', name, 'approve is called');
    setTimeout(function() {
      start();
      assert.equal(_this.$('.ui.modal.visible').length, 1, ".ui.modal is visible after clicking");
    }, 1000);
    return false;
  });

  this.render(hbs`
    <div class="ui open button" {{action 'openModal' 'profile'}}>
      Open
    </div>

    {{#ui-modal name='profile' approve=(action 'approve')}}
      <div class="actions">
        <div class="ui negative button">No</div>
        <div class="ui positive button">Yes</div>
      </div>
    {{/ui-modal}}
  `);

  stop();
  this.$('.ui.open.button').click();
});

test('it will send deny back to controller', function(assert) {
  assert.expect(1);

  var _this = this;

  this.on('openModal', function() {
    _this.$('.ui.modal').modal('show', function() {
      _this.$('.ui.modal.negative').click();
    });
  });

  this.on('deny', function(name) {
    start();
    assert.equal('profile', name);
  });

  this.render(hbs`
    <div class="ui button" {{action 'openModal' 'profile'}}>
      Open
    </div>

    {{#ui-modal name='profile' deny=(action 'deny')}}
      <div class="actions">
        <div class="ui negative button">No</div>
        <div class="ui positive button">Yes</div>
      </div>
    {{/ui-modal}}
  `);

  stop();
  this.$('.ui.button').click();
});
