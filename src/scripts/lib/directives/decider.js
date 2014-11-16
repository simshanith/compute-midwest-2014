define(['./module', 'jquery', 'hammer', 'verge'], function(directives, $, Hammer, verge) {
  'use strict';
  directives.directive('decider', function() {
    return {
      restrict: 'A',
      link: function($scope, $ele, attrs) {
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

        hammertime.on('panstart', function(ev){
          var $option = getOption(ev.target);

          $options.removeClass(draggingClass);
          $option.addClass(draggingClass);

          if (ev.target === optionA ) {
            console.log('dragging a');
          } else if (ev.target === optionB ) {
            console.log('dragging b');
          }
        });

        hammertime.on('panend', function(ev) {
        });

        hammertime.on('panmove', function(ev) {
          var $option = getOption(ev.target);

          var optionHeight = verge.viewportH() / 2;
          var isFirst = $option.is(optionA);


          var initHeightPercent = 50;
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
            hammertime.destroy();
          }

        });
      }
    };
  });
});
