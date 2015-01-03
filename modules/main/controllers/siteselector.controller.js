/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main')
    .controller('siteselector', ['$scope', '$http', function ($scope, $http) {
        $scope.items = [];
        $http({
            // get data
            method: 'GET',
            url: 'json/siteselector.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.items[key] = {};
                    $scope.items[key].id = item.pk;
                    $scope.items[key].item_name = item.fields.item;
                    $scope.items[key].item_url = item.fields.item_url;
                    $scope.items[key].item_icon = item.fields.item_icon;
                    $scope.items[key].item_position = item.fields.item_position;
                })
            });

        $scope.orderSelector = 'item_position';

    }]);
