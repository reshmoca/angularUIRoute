'use strict';

angular.module('angularToolsUiApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'todo',
      'link': '/todo'
    },
    {
      'title': 'todogrid',
      'link': '/todogrid'
    },
    {
      'title': 'todogridview',
      'link': '/todogridview'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
