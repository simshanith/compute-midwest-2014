define(['angular', './module', 'underscore'], function(angular, controllers, _) {
  'use strict';
  controllers.controller('mapcontroller', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.$on('mapInitialized', function(event, map) {
      var google = window.google;
      //console.log('map mapInitialized');
      var center;
      var geocoder = new google.maps.Geocoder();
      // calculate the center with getCenter
      function calculateCenter() {
        center = map.getCenter();
      }

      var centerChangedListener;
      var initializeLocation = _.once(function() {
        $scope.getLocationFromLatLang(map.getCenter());
        google.maps.event.removeListener(centerChangedListener);
      });
      // Add an event listener that calculates center on idle  
      google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
      });
      // Add an event listener that calculates center on resize  

      google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
      });

      centerChangedListener = google.maps.event.addListener(map, 'center_changed', function() {
        initializeLocation();
      });

      function getLocationName(addressComponents) {
        var locality = _.find(addressComponents, function(component) {
          return _.contains(component.types, 'locality');
        });

        locality = locality && locality.long_name;

        if( !locality ) {
          //console.log(result);
          locality = _.find(addressComponents, function(component) {
            return _.contains(component.types, 'sublocality');
          });
          locality = locality && locality.long_name;
        }
        return locality;
      }

      $scope.getLocationFromZipCode = function() {
        console.log('looking up %s', $scope.zipCode);
        geocoder.geocode({
          address: $scope.zipCode
        }, function(results, status){
          if (status === google.maps.GeocoderStatus.OK) {
            var result = _.first(results);
            var addressComponents = result.address_components;

            var locality = getLocationName(addressComponents);

            $scope.$apply(function() {
              $scope.locationName = locality;
            });

            map.setCenter(result.geometry.location);
          } else{}
        });
      };

      $scope.getLocationFromLatLang = function(latlng) {
        geocoder.geocode({
          location: latlng
        }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var result = _.first(results);
            var addressComponents = result.address_components;

            var locality = getLocationName(addressComponents);

            $scope.$apply(function() {
              $scope.locationName = locality;
            });
          } else{}
        });
      };

      $scope.showInput = function() {
        $scope.zipReady = true;
      };

      $scope.locationName = '…';
    });
  }]);
});
