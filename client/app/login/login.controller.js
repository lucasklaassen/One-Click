'use strict';

angular.module('oneClickApp')
  .controller('LoginCtrl', function ($scope, $location, localStorageService, loginService) {

    $scope.loginValidation = function() {
      // Run creditials through casperjs
      loginService.check({
        "username":$scope.user.username,
        "password":$scope.user.password
      });
    }

  });
