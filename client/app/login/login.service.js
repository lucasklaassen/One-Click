'use strict';

angular.module('oneClickApp')
  .factory('LoginService', function ($resource) {
    // Public API here
    var loginCheck = $resource('http://localhost:9000/api/login', null,
      {
        'check': { method:'POST' }
      });
    return{
      loginCheck:loginCheck
    };
  });
