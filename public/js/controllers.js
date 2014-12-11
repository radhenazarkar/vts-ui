'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);

  app.controller('AppCtrl', function ($scope, $http) { });
  
  app.controller('MyCtrl1', function ($scope, $http) {
   $scope.markers = [];
   var mapOptions = {
       zoom: 8,
       center: new google.maps.LatLng(13.000544,77.600341),
       mapTypeId: google.maps.MapTypeId.ROADMAP//TERRAIN
   }   

   $scope.map          = new google.maps.Map(document.getElementById('mapId'), mapOptions);
   var trafficLayer    = new google.maps.TrafficLayer();
   trafficLayer.setMap($scope.map);
   
   var oThis  = this,
  			    i,
			  	clearMarkers = function() {
			       var markers = $scope.markers || [];
			       for(i = 0; i< markers.length; i++){
			           markers[ i ].setMap( null );
			       }
			       
			       $scope.markers = [];
			    },
			  	getMarkerImage = function(state){
				  	var img_url = "";
				  	switch( state ){
				  	case 1:
				  		img_url = "/images/tfs_device_@Pickup.png";
				  		break;
				  	case 2:
				  		img_url = "/images/tfs_device_bidded.png";
				  		break;
				  	}	
				  	return img_url;
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
			  	  request.success(function (data, status, headers, config) {
					  /*
			  		  if(data.status == "success"){
			  			  generateMarkers(data.locations);
			  		  }
					  */
			  		generateMarkers(data);
			  	  });
			  	  request.error(function (data, status, headers, config) {
			  	      $scope.name = 'Error!';
			  	  });
			  	  
			  	};
		  	
	  $scope.items = [{
		    name: "Free",
		    count: 20,
		    state: "Free"
	  	  }, {
		    name: "logout",
			count: 14,
			state: "logout"
		  }];
		  
	  getLocations("Free");
	  $scope.driverStateClick = function(item){
		  getLocations(item.state);
	  }
  });
  
app.controller('MyCtrl2', function ($scope) { });
