requirejs.config({
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
    'faker': {
      exports: 'Faker'
    },
    'templates': {
      deps: ['ember'],
      exports: 'Ember.TEMPLATES'
    }
  },

  paths: {
    'jquery': '../../components/jquery/jquery',
    'ember': '../../components/ember/ember',
    'handlebars': '../../components/handlebars/handlebars.runtime',
    'faker': '../../node_modules/Faker/Faker',
    'templates': './templates',
    'text': '../../components/requirejs-text/text'
  }
});