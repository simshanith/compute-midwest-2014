define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('DecisionCtrl', ['locationService', '$scope', function(locationService, $scope){
    $scope.locations = locationService.getTwoLocations();
    $scope.className = 'ui-view-decision';
  }]);
});
