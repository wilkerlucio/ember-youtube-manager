
  YoutubeManager.SelectableCollectionView = Ember.Mixin.create({
    itemViewClass: YoutubeManager.SelectableView,
    selectedBinding: "content.selected",
    selectionWillChange: Ember.beforeObserver(function() {
      var current;
      current = this.get("selected");
      if (current) return Ember.set(current, "selected", false);
    }, "selected"),
    selectionChanged: (function() {
      var current;
      current = this.get("selected");
      if (current) return Ember.set(current, "selected", true);
    }).observes("selected")
  });
