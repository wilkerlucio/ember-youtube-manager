
  YoutubeManager.Paginator = Ember.View.extend({
    tagName: "div",
    classNames: ["pagination"],
    templateName: "paginator",
    isVisible: (function() {
      return this.get("totalPages") > 1;
    }).property("totalPages"),
    didInsertElement: function() {
      var self;
      self = this;
      return $("button:not(.toggled)").live("click", function(e) {
        var cur, n, page;
        page = $(this).attr("data-page");
        n = parseInt(page);
        if (page.match(/^[+-]/)) {
          cur = self.getPath("content.page");
          n = cur + n;
        }
        return self.setPath("content.page", n, true);
      });
    },
    willDestroyElement: function() {
      return $("button:not(.toggled)").die("click");
    },
    totalPages: (function() {
      return Math.ceil(this.getPath("content.total") / this.getPath("content.per_page")) || 0;
    }).property("content.total", "content.per_page"),
    pages: (function() {
      var cur, page, pages, total;
      cur = this.getPath("content.page");
      total = this.get("totalPages");
      pages = (function() {
        var _results;
        _results = [];
        for (page = 0; 0 <= total ? page < total : page > total; 0 <= total ? page++ : page--) {
          _results.push({
            number: page + 1,
            realNumber: page,
            toggled: page === cur,
            action: true
          });
        }
        return _results;
      })();
      return pages;
    }).property("totalPages", "content.page").cacheable(),
    isFirstPage: (function() {
      return this.getPath("content.page") === 0;
    }).property("content.page"),
    isLastPage: (function() {
      return this.getPath("content.page") === (this.get("totalPages") - 1);
    }).property("content.page", "totalPages")
  });
