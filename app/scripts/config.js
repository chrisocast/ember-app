require.config({

	deps: ['main'],

	shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	},

	paths: {
		jquery: '../../components/jquery/jquery',
		underscore: '../../components/underscore/underscore',
		backbone: '../../components/backbone/backbone',
    templates: '../build/templates',
    hogan: '../../components/hogan/dist/hogan.template-3.0.0.amd',
    coreframework: '../../components/core-framework/src',
    uiframework: '../../components/ui-framework/app'
	}

});