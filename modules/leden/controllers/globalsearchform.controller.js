/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.leden')
    .controller('globalsearchform', ['$scope', function($scope) {
        $scope.globalsearchform = function() {
            void($('body').removeHighlight().highlight(this.globalsearch));
        };
    }]);
