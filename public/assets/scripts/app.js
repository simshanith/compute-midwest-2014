define([
  'base',
  'require',
  'underscore',
  'jquery',
  'angular',
  'imagesloaded',
  'controllers',
  'directives',
  'services',
  'angular-ui-router',
  'angular-ui-bootstrap',
  'angular-animate',
  'ngmap',
  'async'
  ], function(app, require, _, $, ng, imagesLoaded, controllers, directives, services) {
  'use strict';

  var ngApp = app.ngApp = ng.module('app', [
    'app.services',
    'app.controllers',
    'app.directives',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngMap'
  ]);

  ngApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider.state('landing', {
        url: '/',
        templateUrl: '/views/splash.html'
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
        templateUrl: '/views/distance.html',
        resolve: {
          googlemaps: ['$q', function($q){
            return $q(function(resolve, reject) {
              require(['async!//maps.google.com/maps/api/js?noext'], function() {
                console.log('yep maps is definitely loaded');
                resolve();
              });
            });
          }]
        }
      });

      $stateProvider.state('categories', {
        url: '/categories',
        templateUrl: '/views/categories.html'
      });

      $stateProvider.state('categories-details', {
        url: '/categories-details',
        templateUrl: '/views/categories-details.html'
      });

      $stateProvider.state('decision', {
        url: '/decision',
        controller: 'DecisionCtrl',
        templateUrl: '/views/decision.html'
      });

      $stateProvider.state('location-details', {
        //url: '/location-details',
        controller: 'LocationDetailsCtrl',
        templateUrl: '/views/location-details.html'
      });

      $stateProvider.state('victory', {
        controller: 'VictoryCtrl',
        url: '/victory',
        templateUrl: '/views/victory.html'
      });

      $stateProvider.state('adventure-finish', {
        url: '/victory',
        templateUrl: '/views/adventure-finish.html'
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
