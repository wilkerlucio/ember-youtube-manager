
  Handlebars.registerHelper("nav", function(collectionView, content) {
    var collectionClass, data, target;
    target = content.hash.target;
    collectionClass = Ember.getPath(this, collectionView);
    data = Ember.ArrayProxy.create({
      content: []
    });
    data.beginPropertyChanges();
    content(data);
    data.endPropertyChanges();
    Ember.setPath(null, target, data);
    content.data.view.appendChild(collectionClass, {
      contentBinding: target
    });
    return null;
  });

  Handlebars.registerHelper("navItem", function(options) {
    this.pushObject(Ember.Object.create(options.hash));
    return null;
  });
