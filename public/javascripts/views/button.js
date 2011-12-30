
  YoutubeManager.Button = Ember.Button.extend({
    templateName: "button",
    classNames: "action"
  });

  YoutubeManager.ButtonDropdown = YoutubeManager.Button.extend({
    content: [],
    selected: null,
    dialogVisible: false,
    setInitial: (function() {
      var content;
      content = this.get("content");
      if (content && content.length > 0) {
        return this.set("selected", content.objectAt(0));
      } else {
        return this.set("selected", null);
      }
    }).observes("content"),
    title: (function() {
      var sel;
      sel = this.get("selected");
      if (sel) {
        return sel.title;
      } else {
        return "";
      }
    }).property("selected"),
    value: (function() {
      var sel;
      sel = this.get("selected");
      if (sel) {
        return sel.value;
      } else {
        return null;
      }
    }).property("selected"),
    click: function() {
      return this.set("dialogVisible", !this.get("dialogVisible"));
    }
  });
