YoutubeManager.Button = Ember.Button.extend
  templateName: "button"
  classNames: "action"

YoutubeManager.ButtonDropdown = YoutubeManager.Button.extend
  content: []
  selected: null
  dialogVisible: false

  setInitial: (->
    content = @get("content")

    if content and content.length > 0
      @set("selected", content.objectAt(0))
    else
      @set("selected", null)
  ).observes("content")

  title: (->
    sel = @get("selected")

    if sel then sel.title else ""
  ).property("selected")

  value: (->
    sel = @get("selected")

    if sel then sel.value else null
  ).property("selected")

  click: ->
    @set("dialogVisible", !@get("dialogVisible"))
