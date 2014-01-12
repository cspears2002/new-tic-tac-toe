'use strict';

angular.module('newTicApp')
  .controller('AboutCtrl', function ($scope, $location) {
  	$scope.blog = 'http://chrisspearswebdev.blogspot.com/';
	  $scope.twitterHandle = '@cspears2002';
	  $scope.linkedIn = 'http://www.linkedin.com/pub/christopher-spears/6/580/945'
  });