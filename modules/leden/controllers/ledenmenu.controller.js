/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.leden')
    .controller('ledenmenu', ['$scope', '$http', function ($scope, $http) {
        $scope.items = [];
        $http({
            // get data
            method: 'GET',
            url: 'json/ledenmenu.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.items[key] = {};
                    $scope.items[key].id = item.pk;
                    $scope.items[key].item_name = item.fields.item;
                    $scope.items[key].item_url = item.fields.item_url;
                    $scope.items[key].item_position = item.fields.item_position;
                })
            });

        $scope.orderLedenMenu = 'item_position';

        $scope.subitem = [];
        $http({
            method: 'GET',
            url: 'json/subledenmenu.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.subitem[key] = {};
                    $scope.subitem[key].id = item.pk;
                    $scope.subitem[key].parent_item = item.fields.parent_submenu;
                    $scope.subitem[key].item_name = item.fields.item;
                    $scope.subitem[key].item_url = item.fields.item_url;
                    $scope.subitem[key].item_position = item.fields.item_position;
                })
            });

        $scope.orderSubLedenMenu = 'item_position';

        $scope.byItemId = function(itemId) {
            return function(subitem) {
                return subitem.parent_item == itemId;
            }
        };

    }]);

