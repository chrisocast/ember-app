define([
  'ember'
], function(Ember) {

  /*
    1) App starts with list of states
    2) Click a state to view all senate/house members: http://api.nytimes.com/svc/elections/us/v3/finances/2012/seats/CA/house%7Csenate.json
    3) Click a politician to view their contributions: http://api.nytimes.com/svc/elections/us/v3/finances/2012/contributions/candidate/P80003353.json
  */

  var App = Ember.Application.create({
    LOG_TRANSITIONS: true
  });


  App.Router.map(function(){
    this.resource('politicians');
  });






  return App;
});