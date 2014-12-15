'use strict';
angular.module('vtsUi')
    .factory('vtsApi', function( $state ){
        var oThis = this,
            navFns = {};

         for(var state in Helper.routes){
              navFns[ "goto" + state.capitalize() ] = (function( st ){
                return function( ){
                  $state.go( st );
                }
              })(state)
          }

          return navFns;
    });