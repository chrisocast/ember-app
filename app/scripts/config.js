requirejs.config({
  
  deps: ['main'],

  shim: {
    'jquery': {
      exports: '$'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'ember': {
      deps: ['jquery', 'handlebars'],
      exports: 'Em'
    },
    'templates': {
      deps: ['ember'],
      exports: 'Ember.TEMPLATES'
    }
  },

  paths: {
    jquery: '../../components/jquery/jquery',
    ember: '../../components/ember/index',
    handlebars: '../../components/handlebars/index',
    templates: '../build/templates/templates',
    text: '../../components/requirejs-text/text'
  }
});