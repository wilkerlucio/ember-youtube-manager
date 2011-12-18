YoutubeManager.SelectableView = Ember.View.extend
  template: Ember.Handlebars.compile('{{content}}')
  classNameBindings: ["selected"]
  selectedBinding: "content.selected"

  click: -> @setPath("contentView.selected", @get("content"))
