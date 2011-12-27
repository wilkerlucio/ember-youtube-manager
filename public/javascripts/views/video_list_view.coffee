YoutubeManager.VideoListView = Ember.CollectionView.extend
  tagName: "ul"
  classNames: ["video-list"]
  itemViewClass: YoutubeManager.VideoView
