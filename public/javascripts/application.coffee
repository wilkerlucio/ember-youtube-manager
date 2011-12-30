window.Application = Ember.Application.create()

Ember.TRUE = true
Application.uploadData = YoutubeManager.ServerData.create(path: "/uploads")

Application.NavigationItem = YoutubeManager.SelectableView.extend
  template: Ember.Handlebars.compile('<a {{bindAttr href="content.link"}}>{{content.label}}</a>')
  didInsertElement: -> @.$("a").click (e) -> e.preventDefault()

Application.NavigationView = Ember.CollectionView.extend YoutubeManager.SelectableCollectionView,
  tagName: "ul"
  itemViewClass: Application.NavigationItem

Application.router = YoutubeManager.Router.create
  notFoundView: -> Ember.View.create template: -> "Hey, there is no such view!"

  current: PageData.current

  routes:
    "uploads": ->
      Application.uploadData.fetchAll()

      Ember.View.create
        templateName: "uploads"
        content: Application.uploadData
        allSelected: ((key, value) ->
          if value != undefined
            @get("content").setEach("selected", value)
            value
          else
            @get("content").everyProperty("selected", true)
        ).property("content.@each.selected")

    "playlists": -> Ember.View.create(templateName: "playlists")

# connecting separated components
Ember.Binding.from("Application.router.current").to("state").connect(YoutubeManager.History)
Ember.addObserver Application, "navigation", ->
  Ember.Binding.transform(
    to: (value, nav) -> nav.find (o) -> o.link == value
    from: (value) -> Ember.get(value, "link") if value
  ).from("Application.router.current").to("selected").connect(Application.navigation)
