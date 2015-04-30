'use strict';
var app = angular.module('com.module.notes');

app.controller('NotesCtrl', function($scope, $state, $stateParams) {
  $scope.setCity = function(lati,long) {
    console.log('clicked' + lati+ ' '+ long);
    $scope.savedCity = {lat : lati, lng:long }
  };

});
