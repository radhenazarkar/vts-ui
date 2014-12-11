'use strict';

// Declare app level module which depends on filters, and services

var routes =  { // if u are adding new url here add new url in urls.py also
        'home': {
            url: "/",
            title: 'VTS UI | Map',
            //loginRequired: true,
            templateUrl: 'templates/vts_map'
        }
    };

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
        for(var state in routes){
            $stateProvider.state( state, routes[state] );  
        }
  }]);