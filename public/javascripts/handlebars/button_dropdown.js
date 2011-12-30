
  Handlebars.registerHelper("ymButtonDropdown", function(block) {
    var button, content;
    button = YoutubeManager.ButtonDropdown.create(block.hash);
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
