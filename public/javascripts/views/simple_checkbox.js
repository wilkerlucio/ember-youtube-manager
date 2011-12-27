
  YoutubeManager.Checkbox = Ember.View.extend({
    value: false,
    disabled: false,
    tagName: "span",
    classNames: ['custom-checkbox'],
    template: Ember.Handlebars.compile('<input type="checkbox" {{bindAttr checked="value" disabled="disabled"}}><span></span>'),
    change: function() {
      return Ember.run.once(this, this._updateElementValue);
    },
    _updateElementValue: function() {
      var input;
      input = this.$('input:checkbox');
      return this.set('value', !!input.prop('checked'));
    }
  });
