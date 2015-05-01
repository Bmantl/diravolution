'use strict';
var app = angular.module('com.module.landingScreen');

app.controller('LandingScreenCtrl', function($scope, $rootScope, $state, $stateParams) {
  $scope.setCity = function(lati,long) {
    $rootScope.savedCity = {lat : lati, lng:long }
  };

});
