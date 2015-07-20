'use strict';

angular.module('angularToolsUiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('todogridview', {
        url: '/todogridview',
        templateUrl: 'app/todogridview/todogridview.html',
        controller: 'TodogridviewCtrl'
      })
      .state('todogridview.viewgrid', {
        url: '/viewgrid',
        templateUrl: 'app/todogridview/grid/grid.html',
        controller: 'GridCtrl'
      });
    // $urlRouterProvider.otherwise('/todogridview');
  });
