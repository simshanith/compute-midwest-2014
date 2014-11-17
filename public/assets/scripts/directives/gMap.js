define(['./module'],
  function(directives){
    directives.directive('gMap', function() {
      return {
        restrict: 'A',
        link: function (scope, $ele, attrs) {

          console.log('test gmap');

          scope.$on('mapInitialized', function(event, map) {
            var google = window.google;
            console.log('map mapInitialized');
            var center;
          // calculate the center with getCenter
            function calculateCenter() {
              center = map.getCenter();
            }
          // Add an event listener that calculates center on idle  
            google.maps.event.addDomListener(map, 'idle', function() {
              calculateCenter();
            });
            // Add an event listener that calculates center on resize  

            google.maps.event.addDomListener(window, 'resize', function() {
              map.setCenter(center);
            });
          });
          

          // create a variable to hold center
            
        }
      }
    });
  }
);
