Handlebars.registerHelper "ymButtonDropdown", (block) ->
  button = Ember.Handlebars.ViewHelper.viewClassFromHTMLOptions(YoutubeManager.ButtonDropdown, block.hash, this).create()
  content = []
  block(content)
  button.set("content", content)

  block.data.view.appendChild(button)
  null

Handlebars.registerHelper "ymOption", (options) ->
  this.pushObject(options.hash)
  null
