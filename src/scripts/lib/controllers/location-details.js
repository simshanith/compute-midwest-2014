define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('LocationDetailsCtrl', ['locationService', '$scope', function(locationService, $scope) {
    $scope.locationService = locationService;
    $scope.location = locationService.getCurrentLocation();
    $scope.className = 'ui-view-location-details';
  }]);
});
