/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main', ['truncate', 'ergocalc', 'ngTable'])
    .controller('headerlink', ['$scope', '$http', function ($scope, $http) {
        $scope.items = [];
        $http({
            // get data
            method: 'GET',
            url: 'json/headerlink.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.items[key] = {};
                    $scope.items[key].id = item.pk;
                    $scope.items[key].title = item.fields.title;
                    $scope.items[key].description = item.fields.description;
                    $scope.items[key].url = item.fields.url;
                    $scope.items[key].pub_date = item.fields.pub_date;
                    $scope.items[key].ended = item.fields.ended;
                })
            });

        $scope.orderHeaderLink = 'pub_date';

        $scope.notEnded = function() {
            return function(items) {
                return items.ended != true;
            }
        };
    }]);
