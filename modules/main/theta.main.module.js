/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */

// Add the main module to the theta app module
angular.module('theta', ['theta.main']);

// Add module "main"
angular.module('theta.main', ['truncate', 'ergocalc', 'ngTable'])
    .config(function($httpProvider, $interpolateProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        // no interference with django symbols, so for angular use these:
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    });