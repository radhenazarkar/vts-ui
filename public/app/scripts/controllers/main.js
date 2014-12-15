'use strict';
angular.module('vtsUi')
	.controller('mainController', [
		'$scope',
		'vtsApi',
		'$browser', 
		function ($scope, vtsApi, $browser) { 
			$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
				var cookies = $browser.cookies(),
		        	isLogged = true;

		        if( (toState.loginRequired == true) && !isLogged){
		            event.preventDefault();
		            vtsApi.gotoLogin();
		        }
		        if( (toState.loginRequired == false) && isLogged){
		            event.preventDefault();
		            vtsApi.gotoHome();
		        }
		        document.title = toState.title || "VTS | Taxiforsure";
	    	});
		}
	]);