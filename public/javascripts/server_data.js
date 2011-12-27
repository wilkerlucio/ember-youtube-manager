
  YoutubeManager.ServerData = Ember.ArrayProxy.extend({
    path: "",
    content: [],
    isLoaded: false,
    loading: false,
    per_page: 0,
    total: 0,
    page: 0,
    init: function() {
      return this._super();
    },
    fetchAll: function(force) {
      var _this = this;
      if (force == null) force = false;
      if (this.get("loading") || (!force && this.get("isLoaded"))) return;
      this.set("loading", true);
      return jQuery.getJSON(this.get("path"), {
        page: this.get("page")
      }, function(data) {
        _this.set("loading", false);
        _this.set("per_page", data.per_page);
        _this.set("total", data.total);
        _this.set("content", data.content);
        return _this.set("isLoaded", true);
      });
    },
    reload: (function() {
      return this.fetchAll(true);
    }).observes("page")
  });
