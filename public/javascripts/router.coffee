YoutubeManager.Router = Ember.Object.extend
  notFoundView: -> Ember.View.create template: -> "Page not found"

  current: "main"

  currentView: (->
    route = this.routeForPath(@get("current"))

    if route then route.call(this) else @notFoundView()
  ).property("current", "routes").cacheable()

  routeForPath: (path) ->
    routes = this.get("routes")
    routes[path] || null
