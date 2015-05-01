'use strict';
var app = angular.module('com.module.landingScreen');

app.config(function($stateProvider) {
  $stateProvider.state('app.landingScreen', {
    abstract: true,
    url: '/landingScreen',
    templateUrl: 'modules/landingScreen/views/main.html'
  }).state('app.landingScreen.list', {
    url: '',
    templateUrl: 'modules/landingScreen/views/list.html',
    controller: 'LandingScreenCtrl'
  })
});
