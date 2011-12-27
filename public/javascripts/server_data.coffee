YoutubeManager.ServerData = Ember.ArrayProxy.extend
  path: ""
  content: []
  isLoaded: false
  loading: false

  init: ->
    @_super()

    @fetchAll()

  fetchAll: (force = false) ->
    return if @get("loading") or (!force and @get("isLoaded"))

    @set("loading", true)

    jQuery.getJSON @get("path"), (data) =>
      @set("loading", false)
      @set("content", data)
      @set("isLoaded", true)
