require([
  './politics-app'
], function(App) {

  // by requiring an app, we've initialized the Ember app for this page
  // main.js could be an extension/customization point w/r/t default app behavior
  window.App = App;
});