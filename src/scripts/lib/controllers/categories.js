define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('CategoriesCtrl', [
    'categoriesService',
    '$scope',
    function(categoriesService, $scope){
        $scope.className = 'ui-view-categories';
        $scope.categories = categoriesService.getCategories();;

        $scope.onCategorySelected = function() {
            console.log('category selection complete:', this.category.key);
        };
  }]);
});