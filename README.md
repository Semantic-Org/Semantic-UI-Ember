![Semantic](http://www.semantic-ui.com/images/logo.png)

# Semantic-UI-Ember

This is the official Ember library for the Semantic-UI modules. The code was original built for [CrowdOx](http://crowdox.com) and other projects that we were building for clients. We would appreciate any feedback that you have.

## Project Philosophy

We feel that the Semantic-UI-Ember project should be an extension of Semantic-UI and not a complete rewrite. With that in mind, we will always be a very lightweight layer on top to make the integration a first-class Ember experience. Please [follow the official documentation](http://semantic-ui.com/) for futher information.


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

## Dimmer

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/dimmer.html)

There isn't a corresponding Ember component for this since it isn't rendered to the screen but instead invoked.

## Dropdown

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/dropdown.html)
 * **Class**: `ui dropdown`
 * **Component**: `ui-dropdown`
 * **Parameters**
    * **selected**: Bound value that is set to `optionValuePath`
    * **onChange**: Event to bind changes too

Replace `<div class="ui dropdown">` with `{{ui-dropdown}}` and fill in your content

### Controller
```javascript
export default Ember.Controller.extend({
	itemActions: [ "Edit", "Remove", "Hide"],
	selectedAction: null,

	actions: {
	  updateSelected: function(component, id, value) {
	    this.set('selectedAction', id);
	  }
	}
});
```

### Template
```handlebars
{{#ui-dropdown class="selection" onChange=(action 'updateSelected')}}
  <div class="default text">Select an item</div>
  <i class="dropdown icon"></i>
  <div class="menu">
  {{#each itemActions as |item|}}
    <div class="item" data-id="{{item}}">
      {{item}}
    </div>
  {{/each}}
  </div>
{{/ui-dropdown}}
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

Embed the Modal within your page's template, similar to the semantic-ui master documentation.
Except instead of using `<div class='ui modal'>` you can use `{{ui-modal}}`. Each
modal MUST include a name so it knows which one you are referring too.

### Template

```handlebars
{{#ui-modal name="profile" class="profile" onApprove=(action 'approveModal') onDeny=(action 'denyModal')}}
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

In order to open the modal you just need to execute the show command.

### Controller
```javascript
export default Ember.Controller.extend({
  actions: {
    openModal: function(name) {
      $('.ui.modal').modal('show');
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
{{#ui-popup content="The text you'd like to show"}}
  <div class="ui button">BUTTON</div>
{{/ui-popup}}
```

You can also create an icon version by specifying the tagName

```handlebars
{{ui-popup tagName="i" class="icon info" content="The text you'd like to show"}}
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

The sidebar, as per Semantic-UI's documentation, will need to be directly below the body element. Since Ember by default renders a container element you need to utilize a little trick to get rid of it.

### Application View/Component
```javascript
export default Ember.Component.extend({
  tagName: ''
});
```

### Application Template
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

<div class="ui grid pusher">
</div>
```

### Scoped Template
If you need to have the sidebar under a specific scope or can't have it directly under the body element, you can also specify the context in which the sidebar will exist.
```handlebars
<body>
  <div class="something">
    <div class="sidebar context">
      {{#ui-sidebar ui_context=".sidebar.context"}}
        <a class="item">1</a>
        <a class="item">2</a>
        <a class="item">3</a>
      {{/ui-sidebar}}
      <div class="pusher">
        Main Content here
        or
        {{outlet}}
      </div>
    </div>
  </div>
</body>
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

## Sticky

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/sticky.html)
 * **Class**: `ui sticky`

### Template
```handlebars
{{#ui-sticky}}
  <div class="ui three item menu">
    <a class="active item">Editorials</a>
    <a class="item">Reviews</a>
    <a class="item">Upcoming Events</a>
  </div>
{{/ui-sticky}}
<div>
<!-- Any arbitary content -->
</div>
```

## Tab

Not implemented. Better suited to use routes through Ember. If you disagree please open an issue with how you would see it used.

## Transition

 * **Documentation**: [Official Documentation](http://semantic-ui.com/modules/transition.html)
 * **Class**: `ui transition`

You can invoke the semantic javascript directly.

### Controller
```javascript
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    transition: function() {
      $('img').transition('horizontal flip', '500ms');
    }
  }
});
```
