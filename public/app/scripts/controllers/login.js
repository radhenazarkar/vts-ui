'use strict';
angular.module('vtsUi')
	.controller('loginController', [
		'$scope',
		'$http',
		'vtsApi',
		function ($scope, $http, vtsApi) { 
			var rules = {
				email: {
					email: true
				}
			},
			data,
			jForm = $("#signInFormID");

			Helper.requireRule(rules, ['email', 'password']);
			
			jForm.validate({rules: rules});

			$scope.onLoginClick = function(){
				data = jForm.serializeObject();
				if( jForm.valid() ){
					var request = $http.post('/api/login', data);
					request.success(function( res ){
						if( res.status == "success" ){
							vtsApi.gotoHome();
						}else {
							alert( res.error_desc || "Something went wrong" );
						}
					});
					request.error(function(){
						alert( "Something went wrong" );
					});
				}
			}
	}]);