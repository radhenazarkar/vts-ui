'use strict';
angular.module('vtsUi')
	.controller('mapController', [
		'$scope',
		'$http',
		function ($scope, $http) { 
			var oThis  = this,
				i,	
				mapOptions = {
			       zoom: 12,
			       center: new google.maps.LatLng(13.000544,77.600341),
			       mapTypeId: google.maps.MapTypeId.ROADMAP//TERRAIN
			   },
			   driverStates = [{
				    name: "Free",
				    img_url: '/app/images/tfs_device_Free.png',
				    state: "Free"
		  		}, {
				    name: "Logout",
					img_url: '/app/images/tfs_device_logout.png',
					state: "logout"
			  	}, {
				    name: "@Pickup",
					img_url: '/app/images/tfs_device_@Pickup.png',
					state: "@Pickup"
			  	}, {
				    name: "Black Marked",
					img_url: '/app/images/tfs_device_Blackmarked.png',
					state: "Blackmarked"
			  	}, {
				    name: "Blocked",
					img_url: '/app/images/tfs_device_Blocked.png',
					state: "Blocked"
			  	}, {
				    name: "Meter Off",
					img_url: '/app/images/tfs_device_MeterOff.png',
					state: "MeterOff"
			  	}, {
				    name: "Meter On",
					img_url: '/app/images/tfs_device_MeterOn.png',
					state: "MeterOn"
			  	}, {
				    name: "On Duty",
					img_url: '/app/images/tfs_device_OnDuty.png',
					state: "OnDuty"
			  	}, {
				    name: "Reserved",
					img_url: '/app/images/tfs_device_Reserved.png',
					state: "Reserved"
			  	}, {
				    name: "Signal Loss",
					img_url: '/app/images/tfs_device_Signal Loss.png',
					state: "Signal Loss"
			  	}],
			  	driverStateObj = {},
			   trafficLayer;   


		for(i = 0; i<driverStates.length; i++){
			driverStateObj[ driverStates[i].state ] = driverStates[i];
		}

	   $scope.map = new google.maps.Map(document.getElementById('vtsMapId'), mapOptions);
	   trafficLayer    = new google.maps.TrafficLayer();
	   trafficLayer.setMap($scope.map);
	   
	   $scope.markers = [];

		var	clearMarkers = function() {
		       var markers = $scope.markers || [];
		       for(i = 0; i< markers.length; i++){
		           markers[ i ].setMap( null );
		       }
		       
		       $scope.markers = [];
		    },
		  	getMarkerImage = function(state){
		  		var st = driverStateObj[ state ] || {};
			  	return st.img_url;
		  	},
		  	generateMarkers = function(res){
			  	clearMarkers();
		  		for(var i=0; i< res.length; i++){
			  		createMarker(res[i]);
			  	}
		  	},
		  	createMarker = function (info){
		  		if(info.latitude && info.longitude) {
			  		var markerConfig =  {
		  				map: $scope.map,
		  				position: new google.maps.LatLng(info.latitude, info.longitude)
		            },
		            img_url = getMarkerImage( info.state );
			  		if(img_url){
			  			markerConfig.icon = new google.maps.MarkerImage(img_url, new google.maps.Size( 36, 60 ), new google.maps.Point( 0, 0 ), new google.maps.Point( 18, 0 ))
			  		}
		       
		            var marker = new google.maps.Marker(markerConfig);
		            $scope.markers.push(marker);
		  		}
		  	},
		  	getLocations = function(state){
		   		var request = $http.get('/api/get-drivers?state='+state, {});
		   		  clearMarkers();
			  	  request.success(function (data, status, headers, config) {
			  			generateMarkers(data);
			  	  });
		  	};
			  	
		  $scope.items = driverStates;
		  $scope.selectAll = true;

		  getLocations("Free");
		  $scope.onStateChnage = function(item){
		  	debugger;
			  getLocations(item.state);
		  }
	}]);