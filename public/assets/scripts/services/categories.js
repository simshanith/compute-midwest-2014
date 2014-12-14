define(['./module'], function (services) {
  'use strict';

  services.service('categoriesService', function() {
    var categories = [
      {
        title: 'family fun',
        key: 'family-fun',
        backgroundImage: '/assets/images/categories/family-fun.jpg',
      },
      {
        title: 'date night',
        key: 'date-night',
        backgroundImage: '/assets/images/categories/date-night.jpg',
      },
      {
        title: '21 & up',
        key: '21-and-up',
        backgroundImage: '/assets/images/categories/21-and-up.jpg',
      },
      {
        title: 'foodie',
        key: 'fooide',
        backgroundImage: '/assets/images/categories/foodie.jpg',
      }
    ];

    this.getCategories = function() {
      return categories;
    };

  });
});
