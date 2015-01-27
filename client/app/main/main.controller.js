'use strict';

angular.module('oneClickApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, $location, localStorageService, SetupService) {

        $scope.formData = {};
        $scope.listOfWebsites = {};
        $scope.website;
        $scope.loading = false;
        $scope.masterAdminForm = false;
        $scope.listOfCountries = ["US", "CAN", "AUS"];

        $scope.init = function() {
            $scope.signedInCheck("isLoggedIn");
        };

        $scope.setupValidation = function() {
            $scope.loading = true;
            console.log($scope.formData);
             SetupService.setupCheck.check({
                    "formData":$scope.formData,
                    "username":localStorageService.get("username"),
                    "password":localStorageService.get("password")
             }, function(res){
                var response = res;
                console.log(response);
                $location.path( "/login" );
            });
        };

        $scope.signedInCheck = function() {
            if(localStorageService.isSupported) {
                if(localStorageService.get("isLoggedIn") === null || localStorageService.get("listOfWebsites") === null){
                    $location.path( "/login" );
                } else {
                    $scope.loadWebsites();
                    $scope.formData.website = localStorageService.get("website");
                }
            }
        }

        $scope.loadWebsites = function() {
            $scope.listOfWebsites = localStorageService.get("listOfWebsites");
        }

        $scope.init();

    });
