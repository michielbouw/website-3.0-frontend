/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main', ['truncate', 'ergocalc', 'ngTable'])
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
        $scope.orderNews = 'pub_date';

        $scope.comment = [];
        $http({
            method: 'GET',
            url: 'json/comment.json'
        })
            .success(function (data, status, headers, config) {
                angular.forEach(data, function(item, key) {
                    $scope.comment[key] = {};
                    $scope.comment[key].id = item.pk;
                    $scope.comment[key].newsitem = item.fields.newsitem;
                    $scope.comment[key].comment_text = item.fields.comment;
                    $scope.comment[key].user_id = item.fields.user_id;
                    $scope.comment[key].user = item.fields.user;
                    $scope.comment[key].date_created = item.fields.date_created;
                })
            });

        $scope.datetime = new Date();
        $scope.user_id = '38108';
        $scope.user = 'Michiel Bouw';

        $scope.addcomment = function(item_id) {
            if(this.addcomment_text != '') {
                $scope.comment.push({
                    id: $scope.comment.length+1,
                    newsitem: item_id,
                    comment_text: this.addcomment_text,
                    user_id: $scope.user_id,
                    user: $scope.user,
                    date_created: $scope.datetime
                });
                this.addcomment_text = '';
            }
        };
        $scope.removecomment = function($index) {
            $scope.comment.splice($index, 1);
        };
        $scope.byNewsId = function(newsId) {
            return function(comment) {
                return comment.newsitem == newsId;
            }
        };

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            filter: {
                title: '',      // initial filter
                author: '',
                pub_date: ''
            },
            sorting: {
                pub_date: 'desc'    // initial sorting
            }
        }, {
            total: $scope.item.length, // length of data
            getData: function($defer, params) {
                $timeout(function() {
                    var filteredData = params.filter() ?
                        $filter('filter')($scope.item, params
                            .filter()) :
                        $scope.item;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.item;
                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }, 100);
            }
        });
    }]);
