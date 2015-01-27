'use strict';

angular.module('oneClickApp')
    .controller('LoginCtrl', function ($rootScope, $scope, $location, localStorageService, LoginService) {

        $scope.formData = {};
        $scope.listOfWebsites = {};
        $scope.loading = false;
        $scope.masterAdminForm = false;
        $rootScope.website;
        $rootScope.backupOfWebsites = {};

        $rootScope.$on('loginNotice', function(event, data){
          $scope.loginNotice = {};
          $scope.loginNotice.active = true;
          $scope.loginNotice.alertMessage = data.alertMessage;
          $scope.loginNotice.alertLevel = data.alertLevel;
          $scope.loading= false;
        });

        $scope.init = function() {
            $scope.signedInCheck();
        };

        $scope.signedInCheck = function() {
            if(localStorageService.isSupported) {
                if(localStorageService.get("isLoggedIn") !== null || localStorageService.get("listOfWebsites") !== null){
                    $location.path( "/" );
                }
            }
        }

        $scope.loginValidation = function() {
            $scope.loading = true;
            localStorageService.set("username", $scope.formData.username);
            localStorageService.set("password", $scope.formData.password);
             LoginService.loginCheck.check({
                    "formData":$scope.formData
             }, function(res){
                var response = res;
                console.log(response);
                $scope.validateLogin();
            });
        };

        $scope.validateLogin = function() {
            var websites = LoginService.loginCheck.query(function(){
                var check = websites[0];
                if(check === 'true'){
                    websites.splice(0,1);
                    $scope.listOfWebsites = websites;
                    localStorageService.set("listOfWebsites", websites);
                    localStorageService.set("isLoggedIn", true);
                    $scope.loading = false;
                    $scope.masterAdminForm = true;
                    $scope.formData = {};
                } else {
                    $scope.loading = false;
                    $rootScope.$emit('loginNotice', {
                      alertLevel: "warning",
                      alertMessage: "Invalid Login"
                    });
                }
            });
        };

        $scope.selectWebsite = function() {
          localStorageService.set("website", $scope.formData.website);
          $location.path( "/" );
        };

        $scope.cancelLogin = function() {
          $scope.masterAdminForm = false;
          $scope.formData = {};
          localStorageService.clearAll();
        };

        $scope.init();
    });
