define(['./module', 'jquery', 'hammer', 'verge'], function(directives, $, Hammer, verge) {
  'use strict';
  directives.directive('decider', ['locationService', '$timeout', function(locationService, $timeout) {
    return {
      restrict: 'A',
      link: function($scope, $ele, attrs) {

        $scope.dragging = '';

        $scope.bindHammer = _.once(function(){
          console.log('inside bindHammer');
          $timeout(function() {
            var $options = $ele.find('.decision__option');
            var optionA = $options.get(0);
            var optionB = $options.get(1);
            var hammertime = new Hammer.Manager($ele.get(0), {
              recognizers: [
                [Hammer.Pan, {
                  direction: Hammer.DIRECTION_VERTICAL
                }]
              ]
            });

            function getOption(target) {
              var $option = $options.filter(target);
              if( !$option.length ) {
                $option = $(target).closest($options);
              }

              return $option;
            }

            var draggingClass = 'decision__option--dragging';
            var releasedClass = 'decision__option--released';
            var chosenClass = 'decision__option--chosen';

            var optionHeight = verge.viewportH() / 2;


            hammertime.on('panstart', function(ev){
              var $option = getOption(ev.target);

              $options.not($option).css({height: '', top: ''});
              $options.removeClass(draggingClass);
              $options.removeClass(releasedClass);
              $option.addClass(draggingClass);
              $scope.$apply(function() {
                $scope.dragging = 'dragging';
              });

              if ( $option.is(optionA) ) {
                console.log('dragging a');
              } else if ( $option.is(optionB) ) {
                console.log('dragging b');
              }
            });

            hammertime.on('panend', function(ev) {
              //$options.removeClass(draggingClass);
              //*
              $options.css({
                height: '',
                top: ''
              });
              //*/
              var $option = getOption(ev.target);
              var styledHeight = $option.get(0) && $option.get(0).style.height;

              $option.addClass(releasedClass);

              if( styledHeight ) {
                $option.data('initialHeight', parseFloat(styledHeight, 10));
              }

              $scope.$apply(function() {
                $scope.dragging = '';
              });

            });

            function decide($option) {
              $option.addClass(chosenClass);
              hammertime.destroy();
              var location = $option.scope() && $option.scope().location;
              $option.find('a').click();

              locationService.setCurrentLocation(location.id);
            }

            var decideOnce = _.once(decide);

            hammertime.on('panmove', function(ev) {
              var $option = getOption(ev.target);

              var isFirst = $option.is(optionA);


              var initHeightPercent =  50;
              var storedInitHeight = $option.data('initialHeight');

              if( storedInitHeight ) {
                //initHeightPercent = storedInitHeight;
                console.log(storedInitHeight);
                $timeout(function(){$option.data('initialHeight', null);});
              }

              var maxHeightPercent = 100;
              var minHeightPercent = 50;

              var initTopPercent = isFirst ? 0 : 50;
              var minTopPercent = 0;
              var maxTopPercent = isFirst ? 0 : 50;

              var delta = ev.deltaY / optionHeight * 100 * (isFirst ? 1 : -1);

              var top = Math.max(initTopPercent - delta, minTopPercent);
              top = Math.min(top, maxTopPercent);
              var height = Math.min(initHeightPercent + delta, maxHeightPercent);
              height = Math.max(height, minHeightPercent);

              $option.css({
                top: top+'%',
                height: height+'%'
              });

              if( top === minTopPercent && height === maxHeightPercent) {
                decideOnce($option);
              }
            });
          });
        });

      }
    };
  }]);

  directives.directive('repeatDone', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        repeatDone: '='
      },
      link: function(scope, $ele, attrs) {
        var isLast = $ele.scope().$last;
        if(isLast) {
          console.log('inside repeat done');
          $timeout(function() {
            scope.$eval(attrs.repeatDone);
          });
        }
      }
    };
  }]);

});
