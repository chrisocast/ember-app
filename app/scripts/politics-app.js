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


  // Router /////////////////////////////////

  App.Router.map(function(){
    this.resource('states', { path: '/' }, function(){
      this.resource('state', { path: '/:state_id' }, function(){
        this.resource('candidate', { path: '/:candidate_id'});
      });
    });
  });


  // Routes /////////////////////////////////

  App.StatesRoute = Ember.Route.extend({
    setupController: function(controller) {
      var states = Ember.A(); // Creates an Ember.NativeArray from an Array like object
      stateData.forEach(function (item) {
        states.push(App.State.find(item.id));
      });
      controller.set('states', states);
    },
    renderTemplate: function() {
      this.render({outlet: 'states'});
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
    },
    renderTemplate: function() {
      this.render({outlet: 'state'});
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
    },
    renderTemplate: function() {
      this.render({outlet: 'candidate'});
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


  // Static data ///////////////////////////
  var stateData = [
    { name: 'Alabama', id: 'AL'},
    { name: 'Alaska', id: 'AK'},
    { name: 'American Samoa', id: 'AS'},
    { name: 'Arizona', id: 'AZ'},
    { name: 'Arkansas', id: 'AR'},
    { name: 'California', id: 'CA'},
    { name: 'Colorado', id: 'CO'},
    { name: 'Connecticut', id: 'CT'},
    { name: 'Delaware', id: 'DE'},
    { name: 'District Of Columbia', id: 'DC'},
    { name: 'Florida', id: 'FL'},
    { name: 'Georgia', id: 'GA'},
    { name: 'Guam', id: 'GU'},
    { name: 'Hawaii', id: 'HI'},
    { name: 'Idaho', id: 'ID'},
    { name: 'Illinois', id: 'IL'},
    { name: 'Indiana', id: 'IN'},
    { name: 'Iowa', id: 'IA'},
    { name: 'Kansas', id: 'KS'},
    { name: 'Kentucky', id: 'KY'},
    { name: 'Louisiana', id: 'LA'},
    { name: 'Maine', id: 'ME'},
    { name: 'Marshall Islands', id: 'MH'},
    { name: 'Maryland', id: 'MD'},
    { name: 'Massachusetts', id: 'MA'},
    { name: 'Michigan', id: 'MI'},
    { name: 'Minnesota', id: 'MN'},
    { name: 'Mississippi', id: 'MS'},
    { name: 'Missouri', id: 'MO'},
    { name: 'Montana', id: 'MT'},
    { name: 'Nebraska', id: 'NE'},
    { name: 'Nevada', id: 'NV'},
    { name: 'New Hampshire', id: 'NH'},
    { name: 'New Jersey', id: 'NJ'},
    { name: 'New Mexico', id: 'NM'},
    { name: 'New York', id: 'NY'},
    { name: 'North Carolina', id: 'NC'},
    { name: 'North Dakota', id: 'ND'},
    { name: 'Northern Mariana Islands', id: 'MP'},
    { name: 'Ohio', id: 'OH'},
    { name: 'Oklahoma', id: 'OK'},
    { name: 'Oregon', id: 'OR'},
    { name: 'Palau', id: 'PW'},
    { name: 'Pennsylvania', id: 'PA'},
    { name: 'Puerto Rico', id: 'PR'},
    { name: 'Rhode Island', id: 'RI'},
    { name: 'South Carolina', id: 'SC'},
    { name: 'South Dakota', id: 'SD'},
    { name: 'Tennessee', id: 'TN'},
    { name: 'Texas', id: 'TX'},
    { name: 'Utah', id: 'UT'},
    { name: 'Vermont', id: 'VT'},
    { name: 'Virgin Islands', id: 'VI'},
    { name: 'Virginia', id: 'VA'},
    { name: 'Washington', id: 'WA'},
    { name: 'West Virginia', id: 'WV'},
    { name: 'Wisconsin', id: 'WI'},
    { name: 'Wyoming', id: 'WY' }
  ];

  return App;
});