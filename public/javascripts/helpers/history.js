
  YoutubeManager.History = Ember.Object.create({
    init: function() {
      var _this = this;
      this._super();
      if (History.enabled) {
        return History.Adapter.bind(window, 'statechange', function() {
          return _this.stateChanged();
        });
      }
    },
    state: null,
    lastState: null,
    stateChanged: function() {
      var state;
      state = History.getState();
      if (state.data.link) return this.set("state", state.data.link);
    },
    updateState: (function() {
      var state;
      state = this.get("state");
      if (History.enabled) {
        return History.pushState({
          link: state
        }, null, state);
      }
    }).observes("state")
  });
