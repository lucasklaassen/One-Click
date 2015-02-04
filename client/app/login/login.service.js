'use strict';

angular.module('oneClickApp')
    .factory('LoginService', function ($resource) {
        // Public API here
        var loginCheck = $resource('/api/login', null,
            {
                'check': { method:'POST' }
            });
        return{
            loginCheck:loginCheck
        };
    });
