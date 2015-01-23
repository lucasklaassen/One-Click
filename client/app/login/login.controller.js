'use strict';

angular.module('oneClickApp')
  .controller('LoginCtrl', function ($scope, $location, localStorageService, LoginService) {

    $scope.formData = {};
    $scope.loading = false;

    $scope.loginValidation = function() {
      $scope.loading = true;
      // Run creditials through casperjs

     LoginService.check({
        "formData":$scope.formData
     }, function(res){
      var response = res;
      console.log(response);
     });

      $scope.formData = {};
    }

  });
