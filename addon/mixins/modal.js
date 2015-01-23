import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    openModal: function(name, model, properties) {
      var container,
          controller,
          key,
          prop,
          result,
          view,
          viewName;

      try {
        container = this.get('container');
        try {
          controller = this.controllerFor(name);
        } catch (e) {
          controller = Ember.generateController(container, name, model);
        }

        controller.set('model', model);
        if (Ember.$.isPlainObject(properties)) {
          for (key in properties) {
            prop = properties[key];
            controller.set(key, prop);
          }
        }

        view = container.lookup('view:' + name);
        if (view) {
          viewName = name;
        } else {
          viewName = 'ui-modal';
        }

        return result = this.render(name, {
          into: 'application',
          outlet: 'modal',
          controller: controller,
          view: viewName
        });
      } catch (e) {
        return Ember.Logger.log(e);
      }
    },

    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
