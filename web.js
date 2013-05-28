var express = require('express');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.use(express.logger('dev'));

});


app.get('/', function(req, res) {

    res.redirect('/app')
});


app.use(express.static(__dirname));
app.use(express.directory(__dirname));


app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
