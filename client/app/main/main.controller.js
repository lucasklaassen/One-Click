'use strict';

angular.module('oneClickApp')
    .controller('MainCtrl', function ($scope, $http, $location, localStorageService) {

        $scope.init = function() {
            $scope.signedInCheck("isLoggedIn");
        };

        $scope.signedInCheck = function() {
            if(localStorageService.isSupported) {
                if(localStorageService.get("isLoggedIn") === null){
                    $location.path( "/login" );
                }
            }
        }

        $scope.init();

    });
