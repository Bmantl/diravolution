'use strict';
var app = angular.module('com.module.notes');

app.controller('NotesCtrl', function($scope, $rootScope, $state, $stateParams) {
  $scope.setCity = function(lati,long) {
    $rootScope.savedCity = {lat : lati, lng:long }
  };

});
