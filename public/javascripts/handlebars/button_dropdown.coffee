Handlebars.registerHelper "ymButtonDropdown", (block) ->
  button = YoutubeManager.ButtonDropdown.create(block.hash)
  content = []
  block(content)
  button.set("content", content)

  block.data.view.appendChild(button)
  null

Handlebars.registerHelper "ymOption", (options) ->
  this.pushObject(options.hash)
  null
