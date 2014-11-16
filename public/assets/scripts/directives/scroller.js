define(['./module', 'angular', 'jquery'], function (directives, ng, $) {
  'use strict';
  directives.directive('scroller', ['$rootScope', function($rootScope) {

    return {
      restrict: 'A',
      link: function($scope, $ele) {
        var killListener = $rootScope.$on('$stateChangeStart', function() {
          $(window).scrollTop(0);
        });

        $ele.on('$destroy', function () {
          killListener();
        });

      }
    };
  }]);
});
