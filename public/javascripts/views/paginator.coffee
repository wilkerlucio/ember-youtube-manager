YoutubeManager.Paginator = Ember.View.extend
  tagName: "div"
  classNames: ["pagination"]
  templateName: "paginator"

  isVisible: (->
    @get("totalPages") > 1
  ).property("totalPages")

  didInsertElement: ->
    self = this

    @$("button:not(.toggled)").live "click", (e) ->
      page = $(this).attr("data-page")
      n = parseInt(page)

      if page.match(/^[+-]/)
        cur = self.getPath("content.page")
        n = cur + n

      self.setPath("content.page", n, true)

  totalPages: (->
    Math.ceil(@getPath("content.total") / @getPath("content.per_page")) || 0
  ).property("content.total", "content.per_page")

  pages: (->
    cur = @getPath("content.page")
    total = @get("totalPages")

    pages = ({number: page + 1, realNumber: page, toggled: page == cur, action: true} for page in [0...total])
    pages
  ).property("totalPages", "content.page").cacheable()

  isFirstPage: (->
    @getPath("content.page") == 0
  ).property("content.page")

  isLastPage: (->
    @getPath("content.page") == (@get("totalPages") - 1)
  ).property("content.page", "totalPages")
