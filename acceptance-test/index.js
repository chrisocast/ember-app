var casper = require('casper').create();

// Load the index page
casper.start('http://localhost:9001/app/');

// Then make assertions
casper.then(function(){
	this.test.assertExists('h1', 'The index has an h1');
});

// Always end the test and exit
casper.run(function(){
	casper.test.done();
	casper.exit();
});
