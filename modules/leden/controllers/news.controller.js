/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.leden')
    .controller('news', ['$scope', '$http', '$filter', '$timeout', 'ngTableParams', function ($scope, $http, $filter, $timeout, ngTableParams) {
        $scope.item = [];
        $http({
            // get data from newsitem.json
            method: 'GET',
            url: 'json/newsitem.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.item[key] = {};
                    $scope.item[key].id = item.pk;
                    $scope.item[key].title = item.fields.title;
                    $scope.item[key].photo = item.fields.photo;
                    $scope.item[key].pub_date = item.fields.pub_date;
                    $scope.item[key].date_edited = item.fields.date_edited;
                    $scope.item[key].author_id = item.fields.author_id;
                    $scope.item[key].author = item.fields.author;
                    $scope.item[key].author_group = item.fields.author_group;
                    $scope.item[key].itemtext = item.fields.text;
                })
            });
        $scope.orderNews = '-pub_date';
    }]);
