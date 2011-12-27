
  YoutubeManager.VideoView = Ember.View.extend({
    tagName: "li",
    templateName: "video",
    classNameBindings: ["selected"],
    selectedBinding: "content.selected",
    init: function() {
      this._super();
      return this.setPath("content.selected", !!this.getPath("content.selected"));
    }
  });
