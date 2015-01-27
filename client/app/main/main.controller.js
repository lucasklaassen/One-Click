'use strict';

angular.module('oneClickApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, $location, localStorageService) {

        $scope.init = function() {
            $scope.signedInCheck("isLoggedIn");
        };

        $scope.signedInCheck = function() {
            if(localStorageService.isSupported) {
                if(localStorageService.get("isLoggedIn") === null){
                    $location.path( "/login" );
                }
            }
            if($rootScope.website) {
              $scope.loadWebsites();
            }
        }

        $scope.loadWebsites = function() {

        }

        $scope.init();

    });
