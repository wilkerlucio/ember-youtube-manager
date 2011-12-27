
  window.Application = Ember.Application.create();

  Application.historyData = [
    {
      tagName: "li",
      templateName: "video",
      thumb: "/images/thumbs/cerveja.jpg",
      time: "0:41",
      title: "Abrindo cerveja com desodorante aqui",
      hd: "true",
      date: "Oct 8, 2011 06:55 PM",
      viewCount: "47",
      commentsCount: "0",
      privacy: "public"
    }, {
      tagName: "li",
      templateName: "video",
      thumb: "/images/thumbs/chimarruts.jpg",
      time: "2:58",
      title: "(Cover) Chimarruts - Do Lado de Ca",
      date: "Aug 8, 2011 04:05 PM",
      viewCount: "31",
      commentsCount: "0",
      privacy: "unlisted"
    }, {
      tagName: "li",
      classNames: "selected",
      templateName: "video",
      thumb: "/images/thumbs/raining.jpg",
      time: "0:34",
      title: "IMG 0704",
      hd: "true",
      date: "Jul 16, 2011 11:21 AM",
      viewCount: "13",
      commentsCount: "0",
      privacy: "private"
    }
  ];

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
        return Ember.View.create({
          templateName: "uploads",
          content: Application.historyData,
          allSelected: (function(key, value) {
            if (value != null) {
              this.get("content").setEach("selected", value);
              return value;
            } else {
              return !!this.get("content").length && this.get("content").everyProperty("selected", true);
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
