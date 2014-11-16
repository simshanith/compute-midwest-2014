define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('VictoryCtrl', ['locationService', '$scope', function(locationService, $scope){
    $scope.location = locationService.getCurrentLocation();
  }]);
});
