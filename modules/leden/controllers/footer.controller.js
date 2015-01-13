/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.leden')
    .controller('footer', ['$scope', '$http', function ($scope, $http) {
        $scope.items = [];
        $http({
            // get data
            method: 'GET',
            url: 'json/footer.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.items[key] = {};
                    $scope.items[key].id = item.pk;
                    $scope.items[key].footer_block = item.fields.footer_block;
                })
            });

        $scope.orderFooter = 'id';
    }]);
