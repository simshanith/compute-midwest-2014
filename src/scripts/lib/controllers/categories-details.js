define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('CategoriesDetailsCtrl', ['$scope', function($scope){
    $scope.className = 'ui-view-categories-details';

    $scope.onComplete = function() {
        console.log('categories details complete:', $scope.model);
    };
  }]);
});