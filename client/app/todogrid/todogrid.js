'use strict';

angular.module('angularToolsUiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todogrid', {
        url: '/todogrid',
        templateUrl: 'app/todogrid/todogrid.html',
        controller: 'TodogridCtrl'
      });
  });
