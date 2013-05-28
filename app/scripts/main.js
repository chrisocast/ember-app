require(['jquery', 'templates/templates'], function($, template){
  $(function(){
    $(template.hogantemplate({stuff:'Template content!'}))
      .appendTo($('.content'));
  });
});