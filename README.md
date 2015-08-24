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
ember install semantic-ui-ember
```

*If using ember-cli 0.1.5 – 0.2.3*

```
ember install:addon semantic-ui-ember
```

*If using ember-cli < 0.1.5*

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

## Embed

* **Documentation**: [Official Documentation](http://semantic-ui.com/modules/embed.html)
* **Class**: `ui embed`
* **Parameters**
   * **data-id**: The id of the video you wanted embedded
   * **data-source**: The source provider of the video (youtube for example)
   * **data-icon**: Icon to show for the play button
   * **data-place**: Placeholder image to show before the video starts

### Template
```handlebars
  {{ui-embed
    data-source="youtube"
 	  data-id="pfdu_gTry8E"}}
```

## Modal

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/modal.html)
 * **Class**: `ui modal`
 * **View**: `ui-modal`

In order to use the modal you must include Ember.Evented in your controller.

### Controller

```javascript
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {

});
```

Embed the Modal within your page's template, similar to the semantic-ui master documentation.
Except instead of using `<div class='ui modal'>` you can use `{{ui-modal}}`. Each
modal MUST include a name so it knows which one you are referring too.

### Template
```handlebars
{{#ui-modal name="profile" class="profile" approve=(action 'approveModal') deny=(action 'denyModal')}}
  <i class="close icon"></i>
  <div class="header">
    Profile Picture
  </div>
  <div class="image content">
    <div class="ui medium image">
      <img src="http://semantic-ui.com/images/avatar/large/chris.jpg">
    </div>
    <div class="description">
      <div class="ui header">We've auto-chosen a profile image for you.</div>
      <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
      <p>Is it okay to use this photo?</p>
    </div>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      Nope
    </div>
    <div class="ui positive right labeled icon button">
      Yep, that's me
      <i class="checkmark icon"></i>
    </div>
  </div>
{{/ui-modal}}
```

In order to open the modal you just need to create an action and fire the `showModal` event.

### Controller (no model)
```javascript
export default Ember.Controller.extend({
  actions: {
    openModal: function(name) {
      this.trigger('showModal', name);
    }
  }
});
```

## Nag

* **Documentation**: [Official Documentation](http://semantic-ui.com/modules/nag.html)
* **Class**: `ui nag`

### Template
```handlebars
  {{#ui-nag}}
    <span class="title">
      We use cookies to ensure you get the best experience on our website
    </span>
    <i class="close icon"></i>
  {{/ui-nag}}
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

## Progress

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/progress.html)
 * **Class**: `ui progress`

### Template
```handlebars
{{#ui-progress percent=40 classNames="teal indicating"}}
  <div class="bar"></div>
  <div class="label">Completed</div>
{{/ui-progress}}
```

## Rating

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/rating.html)
 * **Class**: `ui rating`

### Template
```handlebars
{{ui-rating initialRating=3 maxRating=7}}
```

## Search

* **Documentation**: [Official Documentation](http://semantic-ui.com/modules/search.html)
* **Class**: `ui search`
* **Parameters**
   * **url**: The url used for searching

### Template
```handlebars
{{#ui-search url="/search"}}
  <input class="prompt" type="text" placeholder="Common passwords...">
  <div class="results"></div>
{{/ui-search}}
```

## Shape

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/shape.html)
 * **Class**: `ui shape`

### Template
```handlebars
{{#ui-shape}}
 <p>Content</p>
{{/ui-shape}}
```

### Controller
You control the shape through semantic's regular javascript code

```javascript
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    flip: function(direction) {
      $('.ui.shape').shape('flip ' + direction);
    }
  }
});
```

## Sidebar

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/sidebar.html)
 * **Class**: `ui sidebar`

### Template
```handlebars
{{#ui-sidebar class="inverted vertical menu"}}
  <a class="item">
    1
  </a>
  <a class="item">
    2
  </a>
  <a class="item">
    3
  </a>
{{/ui-sidebar}}
```

When you want to invoke the sidebar you simply use the semantic methods.

### Controller
```javascript
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    toggle: function(direction) {
      $('.ui.sidebar').sidebar('toggle');
    }
  }
});
```

## Tab

Not implemented. Better suited to use routes through Ember. If you disagree please open an issue with how you would see it used.

## Transition

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/transition.html)
 * **Class**: `ui sidebar`

There isn't a cooresponding Ember component for this since it isn't rendered to the screen but instead invoked.
