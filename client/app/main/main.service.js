'use strict';

angular.module('oneClickApp')
    .factory('SetupService', function ($resource) {
        // Public API here
        var setupCheck = $resource('http://localhost:9000/api/setup', null,
            {
                'check': { method:'POST' }
            });
        return{
            setupCheck:setupCheck
        };
    });
