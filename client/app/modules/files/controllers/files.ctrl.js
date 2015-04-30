'use strict';
angular.module('com.module.files')
  .controller('FilesCtrl', function($scope, $http, CoreService, gettextCatalog) {
    $scope.map = {center: {latitude: 0, longitude: 0 }, zoom: 14 };
    $scope.options = {scrollwheel: false};

    var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(32.296139, 34.852219),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    var bounds = new google.maps.LatLngBounds();

    var markers = [];
    //$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
    //  mapTypeId: google.maps.MapTypeId.ROADMAP
    //});

    //var defaultBounds = new google.maps.LatLngBounds(
    //  new google.maps.LatLng(32.296139, 34.852219),
    //  new google.maps.LatLng(32.296139, 34.852219));
    ////$scope.map.fitBounds(defaultBounds);

    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
      /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var markerTemp= {
        city : 'Israel',
        desc : 'This is the best city in the world!',
        lat : 32.296139,
        long : 34.852219
      };

      markers.push(markerTemp);

      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      markers = [];

      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        bounds.extend(place.geometry.location);
      }

      $scope.map.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener($scope.map, 'bounds_changed', function() {
      var bounds = $scope.map.getBounds();
      searchBox.setBounds(bounds);
    });

  });
