define(['./module', 'underscore'], function (services, _) {
  'use strict';

  services.service('locationService', function() {
    //console.log('omg my first service');

    var locations = [
      {
        name: 'Ça Va',
        color: 'orangered',
        id: 'a',
        image: 'https://trello-attachments.s3.amazonaws.com/54685ab4cd2520bf7604ed1f/640x1146/24b03548b457375a1b50dc1613b01f13/CaVa-image.jpg',
        peeps: 22
      },
      {
        name: 'Beer Kitchen',
        color: 'aqua',
        id: 'b',
        image: 'https://trello-attachments.s3.amazonaws.com/54685ab4cd2520bf7604ed1f/640x1146/51886d7326db79140640eeeffd2b5250/BeerKitchen-image.jpg',
        peeps: 12
      },
      {
        name: 'Thai Place',
        color: 'orangered',
        id: 'c',
        image: 'https://trello-attachments.s3.amazonaws.com/54685ab4cd2520bf7604ed1f/640x1146/47e52d1d672eecfa537664e4360cd6b9/ThaiPlace-image.jpg',
        peeps: 6
      },
      {
        name: 'Port Fonda',
        color: 'aqua',
        id: 'd',
        image: 'https://trello-attachments.s3.amazonaws.com/54685ab4cd2520bf7604ed1f/640x1146/a8725dd30f772c7eea9d4ac922aa00d6/PortFonda-image.jpg',
        peeps: 33
      },
      
      {
        name: 'Bluestem',
        color: 'aqua',
        id: 'e',
        image: 'https://trello-attachments.s3.amazonaws.com/54685ab4cd2520bf7604ed1f/640x1146/e41e4d385f4d1f43dd707ce05eea2371/BlueStem-Image.jpg',
        peeps: 13
      },
      {
        name: 'Westport Cafe',
        color: 'orangered',
        id: 'f',
        image: 'https://trello-attachments.s3.amazonaws.com/54685ab4cd2520bf7604ed1f/640x1146/0eec642238dc07a48713137c7a1bc16f/WestportCafe-image.jpg',
        peeps: 9
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
