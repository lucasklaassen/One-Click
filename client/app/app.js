'use strict';

angular.module('oneClickApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'LocalStorageModule'
])
    .config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        localStorageServiceProvider
                    .setPrefix('oneClickApp')
                    .setStorageType('sessionStorage');
    });
