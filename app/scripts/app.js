'use strict';

angular.module('newTicApp', [])
  .config(function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .directive('changeBg', function () { 
    return {
      //replace: true,
      restrict: "A",
      link: function (scope, element, attr) {
        scope.$watch(attr.changeBg, function(value) {
          if (value == true) {
            element.css("backgroundColor", "#D1EEEE");
          }

        })
      }
    }
  

  });
