'use strict';
angular.module('com.module.map')
  .config(function($stateProvider) {
    $stateProvider.state('app.map', {
        abstract: true,
        url: '/map',
        templateUrl: 'modules/map/views/main.html'
      })
      .state('app.map.list', {
        url: '',
        templateUrl: 'modules/map/views/list.html',
        controller: 'MapCtrl'
      })
  });
