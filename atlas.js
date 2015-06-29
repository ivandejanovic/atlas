/*
 * Atlas 0.3.0
 *
 * The MIT License (MIT)
 *
 * Copyright 2008-2015 Ivan Dejanovic and Quine Interactive
 * www.quineinteractive.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function(root, factory) {
  // Set up Atlas appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Atlas.
      root.Atlas = factory(root, exports, (root.jQuery || root.Zepto || root.ender || root.$), root._, root.Backbone);
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var $ = require('jQuery')
      , _ = require('underscore')
      , Backbone = require('Backbone');
    factory(root, exports, $, Handlebars, _, Backbone);

  // Finally, as a browser global.
  } else {
    root.Atlas = factory(root, {}, (root.jQuery || root.Zepto || root.ender || root.$), root._, root.Backbone);
  }

}(this, function(root, Atlas, $, _, Backbone) {
  // Basic setup.
  var previousVersion = root.Atlas;
  
  Atlas.VERSION = '0.3.0';
  
  // Set references.
  Atlas.$ = $;
  Atlas._ = _;
  Atlas.Backbone = Backbone;
  Atlas.Events = Backbone.Events;
  Atlas.Model = Backbone.Model;
  Atlas.Collection = Backbone.Collection;
  Atlas.Router = Backbone.Router;
  Atlas.history = Backbone.history;
  
  Atlas.noConflict = function() {
    root.Atlas = previousVersion;
    return this;
  };
  
  // Template helper function.
  Atlas.templateFactory = function(name) {
    return _.template($('#' + name + '-template').html());
  };
  
  // Create basic Atlas view.
  Atlas.View = Backbone.View.extend({
    // This function should be reimplemented if some action need to be taken prior to rendering a view.
    beforeRender : function(options) {
      
    },
    // This function should be reimplemented if some action need to be taken after rendering a view.
    onRender : function(options) {
      
    },
    // Render serialized data.
    renderData : function(data, options) {
      this.$el.html(this.template(data));
    },
    // Serialize data to be rendered.
    serializeData: function(options) {
      return {data: {}};
    },
    // Render method.
    render : function(options) {
      this.beforeRender(options);
      this.renderData(this.serializeData(options), options);
      this.onRender(options);
      
      return this;
    },
    // Default debounce interval. Reimplement if different interval is needed.
    debounceInterval : 100,
    // Debounced render method.
    debounceRender : _.debounce(function(options){
      return this.render(options);
    }, this.debounceInterval),
    // This function should be reimplemented if some action need to be taken before closing a view.
    beforeClose : function(options) {
      
    },
    // This method should be reimplemented if some action need to be taken after closing a view.
    onClose : function(options){
      
    },
    // Close method that properly clears resources.
    close : function(options) {
      this.beforeClose(options);
      this.remove(options);
      this.onClose(options);
      
      return this;
    },
    // History back handler.
    handleBackClick : function() {
      root.history.back();
    }
  });
  
  // Create basic Atlas item view. Used for displaying a single model.
  Atlas.ItemView = Atlas.View.extend({
    model : new Backbone.Model(),
    serializeData : function(options) {
      return {data: this.model.toJSON()};
    }
  });
  
  // Create basic collection view. Used for displaying collection that does not require nested views.
  Atlas.CollectionView = Atlas.View.extend({
    collection : new Backbone.Collection(),
    serializeData : function(options) {
      return {data: this.collection.toJSON()};
    }
  });
  
  // Create basic collection item view. Used for displaying a parent collection with nested model views inside.
  Atlas.CollectionItemView = Atlas.View.extend({
    collection : new Backbone.Collection(),
    itemView : Atlas.ItemView,
    children : [],
    clearChildren : function(options) {
      _.each(this.children, function(child, index, children){
        child.close(options);
      });
    },
    createChildView : function (model, options) {
      return new this.itemView({model : model});
    },
    renderData : function(data, options) {
      this.clearChildren(options);
      var parent = this;
      this.$el.html(this.template(data));
      this.collection.each(function (model, index, collection) {
        var view = parent.createChildView(model, options);
        view.render(options);
        parent.children.push(view);
        parent.$el.append(view.$el);
      });
    },
    close : function(options) {
      this.beforeClose(options);
      this.clearChildren(options);
      this.remove(options);
      this.onClose(options);
      
      return this;
    }
  });
  
  // Create view region. Used for managing disposable views.
  Atlas.Region = Backbone.View.extend({
    showView : function(view, options) {
      if (this.view) {
        this.view.close(options);
      }
      
      this.view = view;
      this.view.render(options);
      this.$el.append(this.view.$el);
      
      return this;
    }
  });
  
  return Atlas;
}));
