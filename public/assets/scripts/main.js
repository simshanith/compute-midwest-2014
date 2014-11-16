;(function(window){
  'use strict';
  // declare app to be global variable
  var app = window.app = window.app || {};

  // Detect which build mode we're in.
  app.builds = {};
  app.builds.isDev = ( window.build && window.build === 'dev' );

  app.builds.isProd = !window.build || ( window.build && window.build === 'prod' );

  // Set up requirejs.
  app.requirejs = {};

  // prod build paths.
  app.requirejs.paths = {
    // 3rd Party APIs
    facebook: '//connect.facebook.net/en_US/sdk',
    youtube: '//www.youtube.com/iframe_api?noext',
    angular: 'vendor/angular.min',
    'angular-ui-router': 'vendor/angular-ui-router.min',
    'angular-ui-bootstrap': 'vendor/ui-bootstrap-tpls.min',
    'angular-animate': 'vendor/angular-animate.min',
    'console-polyfill': 'vendor/console-polyfill',
    'es5': 'vendor/es5-shim.min',
    underscore: 'vendor/lodash.underscore.min',
    jquery: 'vendor/jquery.min',
    'jquery.easing': 'vendor/jquery.easing.min',
    'jquery.transit': 'vendor/jquery.transit',
    'jquery.mousewheel': 'vendor/jquery.mousewheel.min',
    'imagesloaded': 'vendor/imagesloaded.pkgd.min',
    'hammer': 'vendor/hammer.min',
    'ngmap': 'vendor/ng-map.min'
  };

  if ( app.builds.isDev ) {
    // dev build paths.
    app.requirejs.paths = {
      facebook: '//connect.facebook.com/en_US/sdk/debug',
      youtube: '//www.youtube.com/iframe_api?noext',
        googlemaps: "//maps.google.com/maps/api/js?noext",
      angular: 'vendor/angular',
      'angular-ui-router': 'vendor/angular-ui-router',
      'angular-ui-bootstrap': 'vendor/ui-bootstrap-tpls',
      'angular-animate': 'vendor/angular-animate',
      'console-polyfill': 'vendor/console-polyfill',
      'es5': 'vendor/es5-shim',
      underscore: 'vendor/lodash.underscore',
      jquery: 'vendor/jquery',
      'jquery.transit': 'vendor/jquery.transit',
      'jquery.easing': 'vendor/jquery.easing',
      'jquery.mousewheel': 'vendor/jquery.mousewheel',
      'imagesloaded': 'vendor/imagesloaded.pkgd',
      'hammer': 'vendor/hammer',
      'ngmap': 'vendor/ng-map'

    };
  }

  var appBase = window.appBase || '/';
  app.requirejs.baseUrl = appBase+'assets/scripts/';

  // Shim non-AMD libraries.
  app.requirejs.shim = {
    facebook: {
      exports: 'FB'
    },
    youtube: {
      exports: 'YT'
    },
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular'],
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular'],
      exports: 'angular'
    },
    'angular-ui-bootstrap': {
      deps: ['angular', 'jquery'],
      exports: 'angular'
    },
    'angular-animate': {
      deps: ['angular'],
      exports: 'angular'
    },
    'jquery.mousewheel': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'jquery.easing': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'imagesloaded': {
      deps: ['jquery'],
      exports: 'imagesLoaded'
    },
    ngmap: {
      deps: ['angular'],
      exports: 'angular'
    }

  };

  // Set enforceDefine to true
  // http://requirejs.org/docs/api.html#ieloadfail
  //app.requirejs.enforceDefine = true;


  require.config(app.requirejs);

  // Modernizr
  if ( window.Modernizr ) {
    define('modernizr', [], function() {
      return window.Modernizr;
    });
  }

  // Yepnope
  if ( window.yepnope ) {
    define('yepnope', [], function() {
      return window.yepnope;
    });
  }

  if ( window.jQuery ) {
    define('j'+'query', [], function() { // hack for loading 
      return window.jQuery;
    });
  }


  define(['app'], function(app) {
    console.log('App Loaded: ', app);
    console.log('Scripts loaded.');

  });
})(this);
