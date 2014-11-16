define(['./module'],
  function(directives){
    directives.directive('distance', function() {
      return {
        restrict: 'A',
        link: function (scope, $ele, attrs) {
           console.log('here');
           var el, newPoint, newPlace, offset;
           
           // Select all range inputs, watch for change
           $("input[type='range']").change(function() {
             // Cache this for efficiency
             el = $(this);

             var minValue, maxValue;
             if (!el.attr("min")) { minValue = 0; } else { minValue = el.attr("min"); }
             
             // Measure width of range input
             width = el.width();
             
             // Figure out placement percentage between left and right of input
             newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
             
             // Janky value to get pointer to line up better
             offset = -1.3;
             
             // Prevent bubble from going beyond left or right (unsupported browsers)
             if (newPoint < 0) { newPlace = 0; }
             else if (newPoint > 1) { newPlace = width; }
             else { newPlace = width * newPoint + offset; offset -= newPoint; }
             
             // Move bubble
             el
               .next("output")
               .css({
                 left: newPlace,
                 marginLeft: offset + "%"
               })
               .text(el.val());
           })
           // Fake a change to position bubble at page load
           .trigger('change');
        }
      }
    });
  }
);