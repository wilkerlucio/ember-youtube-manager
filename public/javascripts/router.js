
  YoutubeManager.Router = Ember.Object.extend({
    notFoundView: function() {
      return Ember.View.create({
        template: function() {
          return "Page not found";
        }
      });
    },
    current: "main",
    currentView: (function() {
      var route;
      route = this.routeForPath(this.get("current"));
      if (route) {
        return route.call(this);
      } else {
        return this.notFoundView();
      }
    }).property("current", "routes").cacheable(),
    routeForPath: function(path) {
      var routes;
      routes = this.get("routes");
      return routes[path] || null;
    }
  });
