define([
  'ember',
  'templates'
], function(Ember) {

  var App = Ember.Application.create({
    LOG_ACTIVE_GENERATION: true,
    LOG_TRANSITIONS: true,
    LOG_VIEW_LOOKUPS: true
  });

  App.apiPath = "http://api.nytimes.com/svc/elections/us/v3/finances/2012/";
  App.apiKey = "a412c1034843bf43e161574404e09800%3A17%3A67432453";
  var stateData = [
    { name: "Alabama", id: "AL"},
    { name: "Colorado", id: "CO"},
    { name: "Washington", id: "WA"}
  ];


  // Router /////////////////////////////////

  App.Router.map(function(){
    this.resource('state', { path: '/:state_id' }, function(){
      this.resource('candidate', { path: '/:candidate_id'});
    });
  });


  // Routes /////////////////////////////////

  App.IndexRoute = Ember.Route.extend({
    setupController: function(controller) {
      var states = Ember.A(); // Creates an Ember.NativeArray from an Array like object
      stateData.forEach(function (item) {
        states.push(App.State.find(item.id));
      });
      controller.set('states', states);
    }
  });

  App.StateRoute = Ember.Route.extend({
    serialize: function(model){
      // only called when the linkTo helper needs paramaters for the URL
      return { state_id: model.get('id') }; 
    },

    model: function(params) {
      return App.State.find(params.state_id);
    },

    setupController: function(controller, model) {
      model.loadState();
    }
  });

  App.CandidateRoute = Ember.Route.extend({
    serialize: function(model){
      // only called when the linkTo helper needs paramaters for the URL
      return { candidate_id: model.get('id') }; 
    },
    model: function(params) {
      return App.Candidate.find(params.candidate_id);
    },
    setupController: function(controller, model) {
      model.loadCandidateDetails();
    }
  });

  // Controllers ////////////////////////////

  //App.StateController = Ember.ObjectController.extend({});

  // App.CandidateController = Ember.ObjectController.extend({
  //   needs: ['state']
  // });


  // Models ///////////////////////////

  App.State = Ember.Object.extend({
    loaded: false,

    loadState: function() {
      if (this.get('loaded')){ return; }

      var state = this;

      $.getJSON(App.apiPath + "seats/" + state.get('id') + "/house%7Csenate.json?api-key=" + App.apiKey + "&callback=?").then(function(response) {
        var candidates = Em.A();
        response.results.forEach(function (item) {
          candidates.push(App.Candidate.create(item.candidate));
        });
        state.setProperties({candidates: candidates, loaded: true});
      });
    }
  });

  App.State.reopenClass({
    store: {},

    find: function(id) {
      if (!this.store[id]) {
        var name = App.getStateNameById(id);
        this.store[id] = App.State.create({id: id, name: name});
      }
      return this.store[id];
    }
  });

  App.Candidate = Ember.Object.extend({
    loaded: false,

    loadCandidateDetails: function() {
      if (this.get('loaded')){ return; }

      var candidate = this;

      $.getJSON(App.apiPath + "candidates/" + candidate.get('id') + ".json?api-key=" + App.apiKey + "&callback=?").then(function(response) {
        //console.log("response.results[0]: ", response.results[0]);
        candidate.setProperties({details: response.results[0], loaded: true});
        //console.log("candidate: ", candidate);
      });
    }
  });

  App.Candidate.reopenClass({
    store: {},

    find: function(id) {
      if (!this.store[id]) {
        this.store[id] = App.Candidate.create({id: id});
      }
      return this.store[id];
    }
  });

  // Utils //////////////////////////////

  App.getStateNameById = function(id){
    var len = stateData.length;
    for (var i=0; i<len; i++) {
      if (stateData[i].id === id) { 
        return stateData[i].name; 
      }
    }
    return null;
  };

  return App;
});