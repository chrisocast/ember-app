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
    ember: '../../components/ember/ember',
    handlebars: '../../components/handlebars/handlebars',
    templates: './templates',
    text: '../../components/requirejs-text/text'
  }
});