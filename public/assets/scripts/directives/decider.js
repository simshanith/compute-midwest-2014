define(['./module', 'hammer'], function(directives, Hammer) {
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
        hammertime.on('panstart', function(ev){
          console.log(ev);

          var $option = $options.filter(ev.target);
          if( !$option.length ) {
            $option = $(ev.target).closest($options);
          }

          //console.log($option.get(0));

          if (ev.target === optionA ) {
            console.log('dragging a');
          } else if (ev.target === optionB ) {
            console.log('dragging b');
          }
        });

        hammertime.on('panmove', function(ev) {
          var $option = $options.filter(ev.target);
          if( !$option.length ) {
            $option = $(ev.target).closest($options);
          }

          var isFirst = $option.is(optionA);
          var direction = isFirst ? Hammer.DIRECTION_DOWN : Hammer.DIRECTION_UP;


          var initHeightPercent = 50;
          var maxHeightPercent = 100;

          var initTopPercent = isFirst ? 0 : 50;
          var minTopPercent = 0;

          console.log(ev);

          $option.css({
          });

        });
      }
    };
  });
});
