/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main', ['truncate', 'ergocalc', 'ngTable'])
    .filter('html_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);