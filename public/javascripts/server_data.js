
  YoutubeManager.ServerData = Ember.ArrayProxy.extend({
    path: "",
    content: [],
    isLoaded: false,
    loading: false,
    init: function() {
      this._super();
      return this.fetchAll();
    },
    fetchAll: function(force) {
      var _this = this;
      if (force == null) force = false;
      if (this.get("loading") || (!force && this.get("isLoaded"))) return;
      this.set("loading", true);
      return jQuery.getJSON(this.get("path"), function(data) {
        _this.set("loading", false);
        _this.set("content", data);
        return _this.set("isLoaded", true);
      });
    }
  });
