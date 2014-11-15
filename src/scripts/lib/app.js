define([
  'base',
  'underscore',
  'jquery',
  'angular',
  'imagesloaded',
  'controllers',
  'directives',
  'services',
  'angular-ui-router',
  'angular-animate'
  ], function(app, _, $, ng, imagesLoaded, controllers, directives, services) {
  'use strict';

  var ngApp = app.ngApp = ng.module('app', [
    'app.controllers',
    'app.directives',
    'ui.router',
    'ngAnimate'
  ]);

  ngApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider.state('landing', {
        url: '/',
        templateUrl: '/views/login.html'
      });

      $stateProvider.state('map', {
        url: '/map',
        templateUrl: '/views/map.html'
      });

      $stateProvider.state('splash', {
        url: '/splash',
        templateUrl: '/views/splash.html'
      });

      $stateProvider.state('distance', {
        url: '/distance',
        templateUrl: '/views/distance.html'
      });

    }
  ]);

  var $document = ng.injector(['ng']).get('$document');
  $document.ready(function() {
    console.log('document ready');

    function ngBootstrap() {
      ng.bootstrap($document.get(0), ['app']);
    }

    ngBootstrap = _.once(ngBootstrap);
    ng.element('.splash').one('mousedown touchstart', ngBootstrap);
    
  });

  return app;
});
