
  YoutubeManager.SelectableView = Ember.View.extend({
    template: Ember.Handlebars.compile('<a {{bindAttr href="content.link"}}>{{content.label}}</a>'),
    classNameBindings: ["selected"],
    selectedBinding: "content.selected",
    didInsertElement: function() {
      return this.$("a").click(function(e) {
        return e.preventDefault();
      });
    },
    click: function() {
      return this.setPath("contentView.selected", this.get("content"));
    }
  });

  YoutubeManager.SelectableCollectionView = Ember.CollectionView.extend({
    tagName: "ul",
    itemViewClass: YoutubeManager.SelectableView,
    selectedBinding: "content.selected",
    selectionWillChange: Ember.beforeObserver(function() {
      var current;
      current = this.get("selected");
      if (current) return Ember.set(current, "selected", false);
    }, "selected"),
    selectionChanged: (function() {
      var current;
      current = this.get("selected");
      if (current) return Ember.set(current, "selected", true);
    }).observes("selected")
  });

  window.Application = Ember.Application.create();

  Application.navigation = Ember.ArrayProxy.create({
    content: [
      {
        link: "uploads",
        label: "Uploads"
      }, {
        link: "playlists",
        label: "Playlists"
      }, {
        link: "history",
        label: "History"
      }, {
        link: "watch-later",
        label: "Watch Later"
      }, {
        link: "favorites",
        label: "Favorites"
      }, {
        link: "likes",
        label: "Likes"
      }
    ]
  });

  Application.router = YoutubeManager.Router.create({
    notFoundView: function() {
      return Ember.View.create({
        template: function() {
          return "Hey, there is no such view!";
        }
      });
    },
    current: "uploads",
    routes: {
      "uploads": function() {
        return Ember.View.create({
          templateName: "uploads"
        });
      },
      "playlists": function() {
        return Ember.View.create({
          templateName: "playlists"
        });
      }
    }
  });

  Ember.Binding.transform({
    to: function(value, nav) {
      return nav.find(function(o) {
        return o.link === value;
      });
    },
    from: function(value) {
      if (value) return Ember.get(value, "link");
    }
  }).from("Application.router.current").to("selected").connect(Application.navigation);
