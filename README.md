atlas
=====

Atlas is a thin layer over Backbone providing some common boilerplate functionality. Backbone if used by itself can require non trivial amount of boilerplate code in order to perform a lot of common task like properly cleaning the view when it is no longer needed, rendering nested view etc.

There are plenty of libraries build on top of Backbone that provide a lot of best practices out of the box (Marionette, Thorax, Chaplin etc.). But when applications are being developed for a low end handheld devices with poor connectivity the size of the Backbone addidions can prove to much.

Idea behind Atlas is to provide the drop in replacement for Backbone with addition of most commonly used constructs, while keeping the size of the library to a minimum. Atlas can for the most part be used in the exactly same way as Backbone. Atlas is by no means a replacement for libraries like Marionette, Thorax, Chaplin etc. If you are building a Backbone based web application that targets more capable clients and the size of the code is not critical previously mentioned libraries are probably a better option.

References

Atlas keeps a reference to DOM manipulation library with which it was initialized in Atlas.$. Atlas also keeps a reference to Underscore, Handlebars and Backbone in Atlas._, Atlas.Handlebars and Atlas.Backbone respectively.

Templating

Until version 0.3.0 Atlas used Handlebars as a templating engine. This is now changed to Underscore template in order do reduce dependency size. Atlas provide template factory function Atlas.templateFactory that searches templates by id. Templates id should end with "-template". Id prefix should be passed to Atlas.templateFactory function. See example below.

Place your template in the script tag

script id="some-view-template" type="text/template"

Then reference it from a view

var view = Atlas.View.extend({
  template : Atlas.template('some-view')
});

Events

Atlas.Events are direct reference to Backbone.Events and can be used interchangeable.

Model

Atlas.Model is direct reference to Backbone.Model and can be used interchangeable.

Collection

Atlas.Collection is direct reference to Backbone.Collection and can be used interchangeable.

Router

Atlas.Router is direct reference to Backbone.Router and can be used interchangeable.

History

Atlas.history is direct reference to Backbone.history and can be used interchangeable.

View

Atlas.View is the basic view provided by Atlas. It is the extension to Backbone.View with some functionality added. It can be used for rendering view that are not backed by a model or a collection. All other Atlas views are extended from Atlas.View.

View methods

Atlas.View.render takes optional options parameter. It first call Atlas.View.beforeRender with empty implementation by default. Atlas.View.beforerender should be reimplemented if some logic needs to be run prior to rendering a view. It then calls Atlas.View.serializeData which returns an empty object. Result of serialization are then passed to Atlas.View.renderData which renders results of serialization to template. After rendering Atlas.View.onRender method with empty implementation by default is called. Atlas.View.onRender should be reimplemented if some logic needs to be run after rendering a view. All these methods as their last parameter receive an options parameter that was originally passed to render method.

Atlas.View.debounceRender is by default a render method debounced for 100 miliseconds by underscore debounce method. If view is listening to a data source that can change in short interval it is recommended to use debounceRender as a listenTo callback for performace. If default debounce interval of 100 miliseconds is not satisfactory reimplement it.

Atlas.View.close is a method for properly desposing of a view. It takes optional options parameter that is passed to all methods called by close. It first calls Atlas.View.beforeClose with empty implementation by default. Atlas.View.beforeClose should be reimplemented if some logic needs to be run prior to disposing of the view. It then calls Backbone.View.remove that removes event listeners and removes view element from the DOM. It then calls Atlas.View.onClose with empty implementation by default. Atlas.View.onClose should be reimplemented if some logic needs to be run after closing the view. All these methods as their last parameter receive an options parameter that was originally passed to close method.

Atlas.View.handleBackClick is a method that perform History.back.

ItemView

Atlas.ItemView is extension to Atlas.View. This views main use is to render a single model. The miminum user is required to do is set up a template and a model object. When user calls Atlas.ItemView.render method the view will serialize the model it has and pass the serialization result to the template function.

CollectionView

Atlas.Collection view is extension to Atlas.View. This views main use is to render a collection of models when handling each model is simple and subviews are not required. The minimum user is required to do is set up a template and a collection object. When user calls Atlas.CollectionView.render method the view will serialize the collection it has and pass the serialization result to the template function.

ColectionItemView

Atlas.CollectionItemView is extension to Atlas.View. This views main use is to render a collection of models when handling each model requires a subview. The minimun user is required to do is set up a template, collection object and provide a ItemView that will be used to handle the subview. When user calls Atlas.CollectionItemView.render method the view render its template, and then creates a subview for each model in a collection and calls its render method to render the children. Atlas.CollectionItemView manages the lifecycle of its children and prevent memory leaks.

Region

TODO