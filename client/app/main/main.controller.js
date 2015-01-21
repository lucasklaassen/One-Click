'use strict';

angular.module('oneClickApp')
  .controller('MainCtrl', function ($scope, $http, $location, localStorageService) {

    $scope.init = function() {
      // Check if user is logged in
      $scope.signedInCheck("isLoggedIn");
    };

    $scope.signedInCheck = function() {
      if(localStorageService.isSupported) {
        if(localStorageService.get("isLoggedIn") === null){
          $location.path( "/login" );
        }
      }
    }

    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
    $scope.init();

  });
