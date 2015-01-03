/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main')
    .controller('headerbox', ['$scope', '$http', function ($scope, $http) {
        $http({
            // get data
            method: 'GET',
            url: 'json/headerbox.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.content = item.fields.content;
                })
            });
    }]);
