YoutubeManager.History = Ember.Object.create
  init: ->
    @_super()

    History.Adapter.bind(window, 'statechange', => @stateChanged()) if History.enabled

  state: null
  lastState: null

  stateChanged: ->
    state = History.getState()
    @set("state", state.data.link) if state.data.link

  updateState: (->
    state = @get("state")
    History.pushState({link: state}, null, state) if History.enabled
  ).observes("state")
