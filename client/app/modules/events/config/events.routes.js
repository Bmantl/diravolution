'use strict';
angular.module('com.module.events')
  .config(function($stateProvider) {
    $stateProvider.state('app.events', {
      abstract: true,
      url: '/events',
      templateUrl: 'modules/events/views/main.html'
    }).state('app.events.list', {
      url: '',
      templateUrl: 'modules/events/views/list.html',
      controller: 'CommentsCtrl'
    }).state('app.events.add', {
      url: '/add',
      templateUrl: 'modules/events/views/form.html',
      controller: 'CommentsCtrl'
    }).state('app.events.edit', {
      url: '/:id/edit',
      templateUrl: 'modules/events/views/form.html',
      controller: 'CommentsCtrl'
    }).state('app.events.view', {
      url: '/:apartid',
      templateUrl: 'modules/events/views/list.html',
      controller: 'CommentsCtrl'
    });
  });
