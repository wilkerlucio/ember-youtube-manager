YoutubeManager.SelectableView = Ember.View.extend
  template: Ember.Handlebars.compile('<a {{bindAttr href="content.link"}}>{{content.label}}</a>')
  classNameBindings: ["selected"]
  selectedBinding: "content.selected"

  didInsertElement: -> @.$("a").click (e) -> e.preventDefault()

  click: -> @setPath("contentView.selected", @get("content"))

YoutubeManager.SelectableCollectionView = Ember.CollectionView.extend
  tagName: "ul"
  itemViewClass: YoutubeManager.SelectableView

  selectedBinding: "content.selected"

  selectionWillChange: Ember.beforeObserver ->
    current = @get("selected")
    Ember.set(current, "selected", false) if current
  , "selected"

  selectionChanged: (->
    current = @get("selected")
    Ember.set(current, "selected", true) if current
  ).observes("selected")

window.Application = Ember.Application.create()

Application.navigation = Ember.ArrayProxy.create
  content: [
    {link: "uploads", label: "Uploads"}
    {link: "playlists", label: "Playlists"}
    {link: "history", label: "History"}
    {link: "watch-later", label: "Watch Later"}
    {link: "favorites", label: "Favorites"}
    {link: "likes", label: "Likes"}
  ]

Application.router = YoutubeManager.Router.create
  notFoundView: -> Ember.View.create template: -> "Hey, there is no such view!"

  current: "uploads"

  routes:
    "uploads": -> Ember.View.create(templateName: "uploads")
    "playlists": -> Ember.View.create(templateName: "playlists")

# connecting separated components
Ember.Binding.transform(
  to: (value, nav) -> nav.find (o) -> o.link == value
  from: (value) -> Ember.get(value, "link") if value
).from("Application.router.current").to("selected").connect(Application.navigation)
