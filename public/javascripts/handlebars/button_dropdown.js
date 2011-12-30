
  Handlebars.registerHelper("ymButtonDropdown", function(block) {
    var button, content;
    button = Ember.Handlebars.ViewHelper.viewClassFromHTMLOptions(YoutubeManager.ButtonDropdown, block.hash, this).create();
    content = [];
    block(content);
    button.set("content", content);
    block.data.view.appendChild(button);
    return null;
  });

  Handlebars.registerHelper("ymOption", function(options) {
    this.pushObject(options.hash);
    return null;
  });
