'use strict';

angular.module('oneClickApp')
    .controller('LoginCtrl', function ($scope, $location, localStorageService, LoginService) {

        $scope.formData = {};
        $scope.listOfWebsites = {};
        $scope.loading = false;

        $scope.loginValidation = function() {
            $scope.loading = true;
             LoginService.loginCheck.check({
                    "formData":$scope.formData
             }, function(res){
                var response = res;
                console.log(response);
                $scope.validateLogin();
            });
        };

        $scope.validateLogin = function() {
            var tests = LoginService.loginCheck.query(function(){
                var test = tests[0];
                if(test === 'true'){
                    localStorageService.set("isLoggedIn", true);
                    $location.path( "/" );
                    $scope.loading = false;
                    $scope.formData = {};
                } else {
                    $scope.loading = false;
                }
            });
        };
    });
