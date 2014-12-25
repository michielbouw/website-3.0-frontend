/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main', ['truncate', 'ergocalc', 'ngTable'])
    .controller('headerimages', ['$scope', '$http', function ($scope, $http) {
        $scope.items = [];
        $http({
            // get data
            method: 'GET',
            url: 'json/headerimages.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.items[key] = {};
                    $scope.items[key].id = item.pk;
                    $scope.items[key].image = item.fields.image;
                    $scope.items[key].position = item.fields.position;
                })
            });
    }]);
