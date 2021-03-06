
  window.Application = Ember.Application.create();

  Ember.TRUE = true;

  Application.uploadData = YoutubeManager.ServerData.create({
    path: "/uploads"
  });

  Application.NavigationItem = YoutubeManager.SelectableView.extend({
    template: Ember.Handlebars.compile('<a {{bindAttr href="content.link"}}>{{content.label}}</a>'),
    didInsertElement: function() {
      return this.$("a").click(function(e) {
        return e.preventDefault();
      });
    }
  });

  Application.NavigationView = Ember.CollectionView.extend(YoutubeManager.SelectableCollectionView, {
    tagName: "ul",
    itemViewClass: Application.NavigationItem
  });

  Application.router = YoutubeManager.Router.create({
    notFoundView: function() {
      return Ember.View.create({
        template: function() {
          return "Hey, there is no such view!";
        }
      });
    },
    current: PageData.current,
    routes: {
      "uploads": function() {
        Application.uploadData.fetchAll();
        return Ember.View.create({
          templateName: "uploads",
          content: Application.uploadData,
          allSelected: (function(key, value) {
            if (value !== void 0) {
              this.get("content").setEach("selected", value);
              return value;
            } else {
              return this.get("content").everyProperty("selected", true);
            }
          }).property("content.@each.selected")
        });
      },
      "playlists": function() {
        return Ember.View.create({
          templateName: "playlists"
        });
      }
    }
  });

  Ember.Binding.from("Application.router.current").to("state").connect(YoutubeManager.History);

  Ember.addObserver(Application, "navigation", function() {
    return Ember.Binding.transform({
      to: function(value, nav) {
        return nav.find(function(o) {
          return o.link === value;
        });
      },
      from: function(value) {
        if (value) return Ember.get(value, "link");
      }
    }).from("Application.router.current").to("selected").connect(Application.navigation);
  });
