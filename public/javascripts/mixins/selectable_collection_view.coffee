YoutubeManager.SelectableCollectionView = Ember.Mixin.create
  itemViewClass: YoutubeManager.SelectableView
  selectedBinding: "content.selected"

  selectionWillChange: Ember.beforeObserver ->
    current = @get("selected")
    Ember.set(current, "selected", false) if current
  , "selected"

  selectionChanged: (->
    current = @get("selected")
    Ember.set(current, "selected", true) if current
  ).observes("selected")
