YoutubeManager.VideoView = Ember.View.extend
  tagName: "li"
  templateName: "video"
  classNameBindings: ["selected"]
  selectedBinding: "content.selected"

  init: ->
    @_super()
    @setPath("content.selected", !!@getPath("content.selected"))
