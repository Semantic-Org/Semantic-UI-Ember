![Semantic](http://www.semantic-ui.com/images/logo.png)

# Semantic-UI-Ember

We have ported our internal Ember Semantic-UI components for an official Semantic-UI integration. The code was original built for [CrowdOx](http://crowdox.com) and later [SpruceMail](http://sprucemail.com). This is officially in Alpha. We would appreciate any feedback that you might have.

## Project Philosophy

We feel that the Semantic-UI-Ember project should be an extension of Semantic-UI and not a complete rewrite. With that in mind, we will only be creating components to extend Semantic-UI modules, all other uses of Semantic-UI in your project should [follow the official documentation](http://semantic-ui.com/).

## Release Schedule

As mentioned our goal is to let Semantic do most of the work and we will simply maintain small bits of code to make it native for Ember. We will release when there are new components or incompatibilities but otherwise the same version should continue to work.

# Installation

Include the library as an [NPM](https://www.npmjs.com/) dependency, from within an [ember-cli](http://www.ember-cli.com/) app.

```
ember install:addon semantic-ui-ember
```

*Before 1.5*

```
npm install --save-dev Semantic-Org/Semantic-UI-Ember
```

Run the library's blueprint to pull in its Bower dependencies. This only needs to be done once.

```
ember generate semantic-ui-ember
```

# Modules

## Accordion

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/accordion.html)
 * **Class**: `ui accordion`
 * **Component**: `ui-accordion`

Replace `<div class="ui accordion">` with `{{#ui-accordion}}` and fill the inside content with standard Semantic-UI.

```handlebars
{{#ui-accordion}}
  <div class="title">
    Semantic UI
  </div>
  <div class="content">
    Accordion Component
  </div>
{{/ui-accordion}}
```

Variations can be used with `{{#ui-accordion class="styled"}}`.

```handlebars
{{#ui-accordion class="styled"}}
  <div class="active title">
    <i class="dropdown icon"></i>
    What is a dog?
  </div>
  <div class="active content">
    <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
  </div>
  <div class="title">
    <i class="dropdown icon"></i>
    What kinds of dogs are there?
  </div>
  <div class="content">
    <p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
  </div>
  <div class="title">
    <i class="dropdown icon"></i>
    How do you acquire a dog?
  </div>
  <div class="content">
    <p>Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.</p>
    <p>A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.</p>
  </div>
{{/ui-accordion}}
```

## Checkbox

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/checkbox.html)
 * **Class**: `ui checkbox`
 * **Component**: `ui-checkbox`

Replace `<div class="ui checkbox">` with `{{ui-checkbox}}` and bind to a property on your model/controller/component.

### Controller
```javascript
export default Ember.Controller.extend({
  havingFun: false
});
```

### Template
```handlebars
{{ui-checkbox checked=havingFun}}
```

## Radio

* **Class**: `ui radio`
* **Component**: `ui-radio`

Replace `<div class="ui radio">` with `{{ui-radio}}` and bind to a property on your model/controller/component.

### Controller
```javascript
export default Ember.Controller.extend({
  fruit: null
});
```

### Template
```handlebars
<div class="ui form">
  <div class="grouped inline fields">
    <div class="field">
      {{ui-radio name="fruit" label="Once a week" value="apple" current=fruit}}
    </div>
    <div class="field">
      {{ui-radio name="fruit" label="2-3 times a week" value="orange" current=fruit}}
    </div>
    <div class="field">
      {{ui-radio name="fruit" label="Once a day" value="grape" current=fruit}}
    </div>
  </div>
</div>
```

## Dimmer

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/dimmer.html)

There isn't a corresponding Ember component for this since it isn't rendered to the screen but instead invoked.

## Dropdown

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/dropdown.html)
 * **Ember.Select**: [Follows Ember.Select Style](http://emberjs.com/api/classes/Ember.Select.html#sts=Ember.Select Class packages/ember-handlebars/lib/controls/select.js:93)
 * **Class**: `ui dropdown`
 * **Component**: `ui-dropdown`
 * **Parameters**
    * **content**: List of data that you want displayed. _Required_
    * **value**: Bound value that is set to `optionValuePath`
    * **prompt**: Text to display before an option has been chosen
    * **icon**: Icon you want to use. _Default is `dropdown`_
    * **optionLabelPath**: Path to the label that is displayed for each item. _Default is`content`_
    * **optionValuePath**: Path to the value that is used when an item is selected. _Default is `content`_

Replace `<div class="ui dropdown">` with `{{ui-dropdown}}` and bind to a list and set a bound property.

### Controller
```javascript
export default Ember.Controller.extend({
	itemActions: [ "Edit", "Remove", "Hide"],
	selectedAction: null
});
```

### Template
```handlebars
{{ui-dropdown
	content=itemActions
	value=selectedAction
	prompt="Select"
}}
```

## Modal

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/modal.html)
 * **Class**: `ui modal`
 * **View**: `ui-modal`

In order to use the modal you must first prepare your Ember application for modals. This follows the same instructions [found on ember.js](http://emberjs.com/guides/cookbook/user_interface_and_interaction/using_modal_dialogs/).

### Application Template
You must add the `modal` outlet to the main application layout

  * templates/application.hbs OR
  * pods/application/template.hbs

```handlebars
{{outlet}}
{{outlet 'modal'}}
```

### ApplicationRoute
This provides the `openModal` and `closeModal` actions that allows modals to be opened from any controller.

  * routes/application.js OR
  * pods/application/route.js

```javascript
import SemanticRouteMixin from 'semantic-ui-ember/mixins/application-route';

var ApplicationRoute = Ember.Route.extend(SemanticRouteMixin, {});
```

Now to use the modal the bare minimum is to create a template and trigger `openModal`.

### Template
```handlebars
<i class="close icon"></i>
<div class="header">
  Demo Modal
</div>
<div class="content">
  Content
</div>
<div class="actions">
  <div class="ui black button">
    Cancel
  </div>
  <div class="ui positive right labeled icon button">
    Ok
    <i class="checkmark icon"></i>
  </div>
</div>
```

Then you can fire `openModal` from any controller

### Controller (no model)
```javascript
export default Ember.Controller.extend({
  actions: {
    confirm: function() {
      this.send('openModal', 'projects/confirm');
    }
  }
});
```

If you want to send a model in just use the third parameter

### Controller (model)
```javascript
export default Ember.Controller.extend({
  actions: {
    confirm: function() {
      this.send('openModal', 'projects/confirm', this.get('model'));
    }
  }
});
```

If a controller is found with the same name as the template it will be used. You can also use your own view if necessary. You just need to make sure to inherit from the base class.

### View
```javascript
import Ember from 'ember';
import SemanticModalMixin from 'semantic-ui-ember/mixins/modal';

export default Ember.View.extend(SemanticModalMixin, {
  templateName: 'shared/modal'
})
```

## Popup

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/popup.html)
 * **Class**: `ui popup`
 * **Component**: `ui-popup`

Replace `<div class="ui popup">` with `{{ui-popup}}` and fill the inside content with standard Semantic-UI.

```handlebars
{{ui-popup content="The text you'd like to show"}}
```

You can also create an icon version by specifying the tagName

```handlebars
{{ui-popup tagName="i" class="icon link" content="The text you'd like to show"}}
```

## Rating

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/rating.html)
 * **Class**: `ui rating`

_NOT IMPLEMENTED_

## Shape

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/shape.html)
 * **Class**: `ui shape`

_NOT IMPLEMENTED_

## Sidebar

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/sidebar.html)
 * **Class**: `ui sidebar`

_NOT IMPLEMENTED_

## Transition

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/transition.html)
 * **Class**: `ui sidebar`

There isn't a cooresponding Ember component for this since it isn't rendered to the screen but instead invoked.

