'use strict';
angular.module('com.module.map')
  .run(function($rootScope, $http, CoreService, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Map'), 'app.map.list',
      'fa-file');
  });
