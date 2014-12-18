# Semantic-ui-ember

We are porting our internal Ember Semantic-UI components to an Ember CLI addon project. The code was original built for [http://www.crowdox.com](CrowdOx). We should have a beta of Semantic-UI-Ember available by end of 2014.

# Project Philosophy

We feel that the Semantic-UI-Ember project should be an extension of Semantic-UI and not a complete rewrite. With that in mind, we will only be creating components to extend Semantic-UI modules, but all other uses of Semantic-UI in your project should be plain HTML.

A simple example of this is the Accordion module. The component that wraps the Semantic-UI JavaScript is an Ember component, but inside the component should follow Semantic-UI's usage.

```
{{#ui-accordion}}
  <div class="title">
    Semantic UI
  </div>
  <div class="content">
    Accordion Component
  </div>
{{/ui-accordion}}
```

We want to ensure that Semantic-UI documentation is the source, and any components built in this project is just an extension of the base framework.

# How to Install

Include the library as an NPM dependency, from within an Ember CLI app.

```
npm install --save-dev Semantic-Org/Semantic-UI-Ember
```

Run the library's blueprint to pull in its Bower dependencies. This only needs to be done once.

```
ember generate semantic-ui-ember
```
