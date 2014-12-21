atlas
=====

Atlas is a thin layer over Backbone providing some common boilerplate functionality. Backbone if used by itself can require non trivial amount of boilerplate code in order to perform a lot of common task like properly cleaning the view when it is no longer needed, rendering nested view etc.

There are plenty of libraries build on top of Backbone that provide a lot of best practices out of the box (Marionette, Thorax, Chaplin etc.). But when applications are being developed for a low end handheld devices with poor connectivity the size of the Backbone addidions can prove to much.

Idea behind Atlas is to provide the most commonly used constructs, while keeping the size of the library to a minimum. Atlas is by no means a replacament for libraries like Marionette, Thorax, Chaplin etc. If you are building a Backbone based web application that targets more capable clients and the size of the code is not critical previously mentioned libraries are probably a better option.
