define(['angular', './module', 'underscore'], function(angular, controllers, _) {
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

      var geocoder = new google.maps.Geocoder();

      $scope.getLocationFromZipCode = function() {
        console.log('looking up %s', $scope.zipCode);
        geocoder.geocode({
          address: $scope.zipCode
        }, function(results, status){
          if (status === google.maps.GeocoderStatus.OK) {
            var result = _.first(results);
            var addressComponents = result.address_components;

            var locality = _.find(addressComponents, function(component) {
              return _.contains(component.types, 'locality');
            });

            locality = locality && locality.long_name;

            console.log(locality);

            $scope.$apply(function() {
              $scope.locationName = locality;
            });

            map.setCenter(result.geometry.location);
          } else{}
        });
      };

      $scope.showInput = function() {
        $scope.zipReady = true;
      };

      $scope.locationName = 'Overland Park';
    });
  }]);
});
