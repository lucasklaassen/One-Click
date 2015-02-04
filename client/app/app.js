'use strict';

var app = angular.module('oneClickApp', [
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

        $locationProvider.html5Mode(false);

        localStorageServiceProvider
                    .setPrefix('oneClickApp')
                    .setStorageType('sessionStorage');
    });

    app.run(function($rootScope) {
    });
