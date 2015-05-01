'use strict';
angular.module('com.module.map')
  .controller('MapCtrl', function($scope, $rootScope, $http, CoreService, gettextCatalog, Apartment) {
    $scope.map = {center: {latitude: 0, longitude: 0 }, zoom: 14 };
    $scope.options = {scrollwheel: false};

    $scope.show = true;
    //focus on israel
    var initialZoom = 6;
    var centeredArea = new google.maps.LatLng(32.296139, 34.852219);

    if($rootScope.savedCity){
      initialZoom = 15;
      centeredArea = new google.maps.LatLng($rootScope.savedCity.lat, $rootScope.savedCity.lng);
    }
    var mapOptions = {
      zoom: initialZoom,
      center: centeredArea,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };



    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    var markers = [];

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

    $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    };


    var infoWindow = new google.maps.InfoWindow();

    /**
     *
     * @param info
     */
    var createMarker = function (info){
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.location.lat, info.location.lng),
        title: info.address,
        icon: '../../images/Home-icon.png'
      });
      marker.content = '<div class="infoWindowContent">' + info.entrance + '</div><a href="#/app/aptPage/' + info.id +'"'+'>Apartment Page </a>';

      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);
    };

      Apartment.find({filter: {include:"tickets"}},function(apartments){
        $scope.apartments = apartments;
        for (var i = 0; i < apartments.length; i++) {
          createMarker(apartments [i]);
        }
      });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener($scope.map, 'bounds_changed', function() {
      var bounds = $scope.map.getBounds();
      searchBox.setBounds(bounds);
    });

    $scope.priceLimit = 2000;
    $scope.sizeLimit = 55;

    $scope.formFields = [{
      key: 'value',
      type: 'date',
      templateOptions: {
        label: gettextCatalog.getString('Choose Date')
      }
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.updateMap = function(){
      for (var i = 0; i < $scope.markers.length; i++) {
        $scope.markers[i].setMap(null);
      }
      for (var i = 0; i < $scope.apartments.length; i++) {
        if($scope.apartments[i].tickets[0].price <= $scope.priceLimit && $scope.apartments[i].tickets[0].area <= $scope.sizeLimit)
          createMarker($scope.apartments[i]);
      }
    }
  });
