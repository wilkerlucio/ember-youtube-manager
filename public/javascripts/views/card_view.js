
  YoutubeManager.CardView = Ember.View.extend({
    autoDestroyView: true,
    render: function() {
      var view;
      view = this.get("currentView");
      return this.appendChild(view);
    },
    viewWillUpdate: Ember.beforeObserver(function() {
      var destroy, view;
      view = this.get("currentView");
      destroy = this.get("autoDestroyView");
      if (view && destroy) return view.destroy();
    }, 'currentView'),
    updateCurrentView: (function() {
      return this.rerender();
    }).observes("currentView")
  });
