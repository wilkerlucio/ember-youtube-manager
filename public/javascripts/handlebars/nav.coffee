Handlebars.registerHelper "nav", (collectionView, content) ->
  {target} = content.hash

  collectionClass = Ember.getPath(this, collectionView)
  data = Ember.ArrayProxy.create(content: [])

  data.beginPropertyChanges()
  content(data)
  data.endPropertyChanges()

  Ember.setPath(null, target, data)

  content.data.view.appendChild(collectionClass, contentBinding: target)

  null

Handlebars.registerHelper "navItem", (options) ->
  this.pushObject(Ember.Object.create(options.hash))
  null
