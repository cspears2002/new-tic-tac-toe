'use strict';

angular.module('newTicApp', ["firebase"])
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

  .directive('cellBg', function () { 
    return {
      //replace: true,
      restrict: "A",
      link: function (scope, element, attr) {
        scope.$watch(attr.cellBg, function(value) {
          switch (value) 
          {
            case 'X':
              element.css("backgroundColor", "#D1EEEE");
              break;
            case 'O':
              element.css("backgroundColor", "#DB2929");
              break;
            default:
              element.css("backgroundColor", "#FFFFFF");
          }
        })
      }
    }
  

  });
