'use strict';
angular.module('com.module.aptPage')
  .config(function($stateProvider) {
    $stateProvider.state('app.aptPage', {
      abstract: true,
      url: '/aptPage',
      templateUrl: 'modules/aptPage/views/main.html'
    }).state('app.aptPage.list', {
      url: '',
      templateUrl: 'modules/aptPage/views/list.html',
      controller: 'AptCtrl'
    }).state('app.aptPage.view', {
      url: '/:apartid',
      templateUrl: 'modules/aptPage/views/list.html',
      controller: 'AptCtrl'
    });
  });
