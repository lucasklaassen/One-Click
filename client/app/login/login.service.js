'use strict';

angular.module('oneClickApp')
  .factory('loginService', function ($resource) {
    // Public API here
    return $resource('/api/login', null,
      {
        'check': { method:'POST' }
      });
  });
