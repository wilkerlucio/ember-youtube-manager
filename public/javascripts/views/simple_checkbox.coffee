YoutubeManager.Checkbox = Ember.View.extend
  value: false
  disabled: false

  tagName: "span"
  classNames: ['custom-checkbox']

  template: Ember.Handlebars.compile('<input type="checkbox" {{bindAttr checked="value" disabled="disabled"}}><span></span>'),

  change: ->
    Ember.run.once(this, this._updateElementValue)

  _updateElementValue: ->
    input = this.$('input:checkbox')
    @set('value', !!input.prop('checked'))
