YoutubeManager.CardView = Ember.View.extend
  # by default, when a view is going to be replaced it will be destroyed
  # if you wanna share the view of CardView somewhere else, or wanna cache
  # it, set it to false to keep the control of view destruction
  autoDestroyView: true,

  render: ->
    view = @get("currentView")
    @appendChild(view)

  viewWillUpdate: Ember.beforeObserver ->
    view = @get("currentView")
    destroy = @get("autoDestroyView")

    view.destroy() if view and destroy
  , 'currentView'

  updateCurrentView: (->
    @rerender()
  ).observes("currentView")
