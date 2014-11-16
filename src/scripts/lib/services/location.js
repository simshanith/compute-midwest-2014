define(['./module', 'underscore'], function (services, _) {
  'use strict';

  services.service('locationService', function() {
    //console.log('omg my first service');

    var locations = [
      {
        name: 'Beer Kitchen',
        color: 'aqua',
        id: 'a'
      },
      {
        name: 'Ce Va',
        color: 'orangered',
        id: 'b'
      },
      {
        name: 'Port Fonda',
        color: 'aqua',
        id: 'c'
      },
      {
        name: 'Thai Place',
        color: 'orangered',
        id: 'd'
      },
      {
        name: 'Blue Stem',
        color: 'aqua',
        id: 'e'
      },
      {
        name: 'Westport Cafe',
        color: 'orangered',
        id: 'f'
      }
    ];

    this.currentLocation = null;



    this.setCurrentLocation = function(locationId) {
      this.currentLocation = locationId;
    };

    this.getCurrentLocation = function() {
      if( this.currentLocation ) {
        return _.findWhere(locations, {id: this.currentLocation});
      }
    };

    this.getTwoLocations = function() {
      var max = locations.length - 1;
      var random = Math.floor(Math.random() * max);

      if ( random % 2 !== 0) {
        random--;
      }

      return locations.slice(random, random+2);
    };

  });
});
