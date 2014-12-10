`import Ember from 'ember'`
`import Semantic from '../semantic'`

Semantic.BaseMixin = Ember.Mixin.create

  init: ->
    @_super()
    unless @get('module')
      Ember.Logger.error('Module was not declared on semantic extended type')

  settings: (module) ->
    component = $.fn[module]
    unless component
      throw "Unable to find semantic module: #{module}"

    custom = {
      debug: Semantic.UI_DEBUG
      performance: Semantic.UI_PERFORMANCE
      verbose: Semantic.UI_VERBOSE
    }
    for key, prop of component.settings
      # Only getting settings
      continue if key in Semantic.BaseMixin.DEBUG
      continue if key in Semantic.BaseMixin.STANDARD
      continue if typeof prop == 'function' and typeof @get(key) != 'function'

      if key in Semantic.BaseMixin.EMBER
        # Have to prefix with ui_ instead of just _, because ember has private variables name with and without _
        value = @get("ui_#{key}")
      else
        value = @get(key)
      if value?
        if typeof value == 'function'
          custom[key] = Em.run.bind(@, value)
        else
          custom[key] = value

    custom

  didInsertElement: ->
    @$()[@get("module")](
      @settings(@get("module"))
    )

  willDestroyElement: ->
    @$()?[@get("module")]?('destroy')

  execute: ->
    @$()?[@get('module')]?.apply(@$(), arguments)

# Static properties to ignore
Semantic.BaseMixin.DEBUG = ['debug', 'performance', 'verbose']
Semantic.BaseMixin.STANDARD = ['name', 'namespace', 'className', 'error', 'metadata', 'selector']
Semantic.BaseMixin.EMBER = ['context', 'on', 'template', 'execute']

`export default Semantic.BaseMixin`
