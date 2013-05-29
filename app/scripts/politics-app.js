define([
  'ember',
  'templates'
], function(Ember) {

  /*
    1) App starts with list of states
    2) Click a state to view all senate/house members: http://api.nytimes.com/svc/elections/us/v3/finances/2012/seats/CA/house%7Csenate.json
    3) Click a politician to view their contributions: http://api.nytimes.com/svc/elections/us/v3/finances/2012/contributions/candidate/P80003353.json
  */

  var App = Ember.Application.create({
    LOG_TRANSITIONS: true
  });

  App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
  });


  // Routes //
  App.Router.map(function(){
    this.resource('politicians');
  });



  // Models //

  App.Politician = DS.Model.extend({
    name: DS.attr('string'),
    party: DS.attr('string')
  });


  // Fixtures //

  App.Politician.FIXTURES = [{
    id: 1,
    name: "John Smith",
    party: "Dem"
  },
  {
    id: 2,
    name: "Sally Jones",
    party: "Rep"
  }];


  return App;
});