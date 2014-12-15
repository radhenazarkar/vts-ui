'use strict';

angular.module('vtsUi', [
    'ui.router',
    'ngResource',
])

angular.module('vtsUi')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
        $urlRouterProvider.otherwise('/');

        if(window.history && window.history.pushState){
            $locationProvider.html5Mode(true);
        }
        for(var state in Helper.routes){
            $stateProvider.state( state, Helper.routes[state] );  
        }
  }]);