YoutubeManager.ServerData = Ember.ArrayProxy.extend
  path: ""
  content: []
  isLoaded: false
  loading: false
  per_page: 0
  total: 0
  page: 0

  init: ->
    @_super()

  fetchAll: (force = false) ->
    return if @get("loading") or (!force and @get("isLoaded"))

    @set("loading", true)

    jQuery.getJSON @get("path"), {page: @get("page")}, (data) =>
      @set("loading", false)
      @set("per_page", data.per_page)
      @set("total", data.total)
      @set("content", data.content)
      @set("isLoaded", true)

  reload: (->
    @fetchAll(true)
  ).observes("page")
