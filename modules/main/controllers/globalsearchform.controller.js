/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main', ['truncate', 'ergocalc', 'ngTable'])
    .controller('globalsearchform', ['$scope', function($scope) {
        $scope.globalsearchform = function() {
            void($('body').removeHighlight().highlight(this.globalsearch));
        };
    }]);
