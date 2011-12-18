window.Application = Ember.Application.create()

Application.NavigationItem = YoutubeManager.SelectableView.extend
  template: Ember.Handlebars.compile('<a {{bindAttr href="content.link"}}>{{content.label}}</a>')
  didInsertElement: -> @.$("a").click (e) -> e.preventDefault()

Application.NavigationView = Ember.CollectionView.extend YoutubeManager.SelectableCollectionView,
  tagName: "ul"
  itemViewClass: Application.NavigationItem

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
