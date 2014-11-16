define(['angular', './module'], function(angular, controllers) {
  'use strict';
  controllers.controller('mapcontroller', ['$scope', function($scope) {
    $scope.$on('mapInitialized', function(event, map) {
      console.log('map mapInitialized');
      var center;
    // calculate the center with getCenter
      function calculateCenter() {
        center = map.getCenter();
      }
    // Add an event listener that calculates center on idle  
      google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
      });
      // Add an event listener that calculates center on resize  

      google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
      });
    });
  }]);
});