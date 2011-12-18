
  YoutubeManager.SelectableView = Ember.View.extend({
    template: Ember.Handlebars.compile('{{content}}'),
    classNameBindings: ["selected"],
    selectedBinding: "content.selected",
    click: function() {
      return this.setPath("contentView.selected", this.get("content"));
    }
  });
