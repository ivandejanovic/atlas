!function(e,t){if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(n,i,o){e.Atlas=t(e,o,e.jQuery||e.Zepto||e.ender||e.$,e._,e.Backbone)});else if("undefined"!=typeof exports){var n=require("jQuery"),i=require("underscore"),o=require("Backbone");t(e,exports,n,Handlebars,i,o)}else e.Atlas=t(e,{},e.jQuery||e.Zepto||e.ender||e.$,e._,e.Backbone)}(this,function(e,t,n,i,o){var r=e.Atlas;return t.VERSION="0.3.0",t.$=n,t._=i,t.Backbone=o,t.Events=o.Events,t.Model=o.Model,t.Collection=o.Collection,t.Router=o.Router,t.history=o.history,t.noConflict=function(){return e.Atlas=r,this},t.templateFactory=function(e){return i.template(n("#"+e+"-template").html())},t.View=o.View.extend({beforeRender:function(){},onRender:function(){},renderData:function(e){this.$el.html(this.template(e))},serializeData:function(){return{data:{}}},render:function(e){return this.beforeRender(e),this.renderData(this.serializeData(e),e),this.onRender(e),this},debounceInterval:100,debounceRender:i.debounce(function(e){return this.render(e)},this.debounceInterval),beforeClose:function(){},onClose:function(){},close:function(e){return this.beforeClose(e),this.remove(e),this.onClose(e),this},handleBackClick:function(){e.history.back()}}),t.ItemView=t.View.extend({model:new o.Model,serializeData:function(){return{data:this.model.toJSON()}}}),t.CollectionView=t.View.extend({collection:new o.Collection,serializeData:function(){return{data:this.collection.toJSON()}}}),t.CollectionItemView=t.View.extend({collection:new o.Collection,itemView:t.ItemView,children:[],clearChildren:function(e){i.each(this.children,function(t){t.close(e)})},createChildView:function(e){return new this.itemView({model:e})},renderData:function(e,t){this.clearChildren(t);var n=this;this.$el.html(this.template(e)),this.collection.each(function(e){var i=n.createChildView(e,t);i.render(t),n.children.push(i),n.$el.append(i.$el)})},close:function(e){return this.beforeClose(e),this.clearChildren(e),this.remove(e),this.onClose(e),this}}),t.Region=o.View.extend({showView:function(e,t){return this.view&&this.view.close(t),this.view=e,this.view.render(t),this.$el.append(this.view.$el),this}}),t});