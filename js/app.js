/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta', ['truncate', 'ergocalc', 'ngTable'])
    .config(function($httpProvider, $interpolateProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        // no interference with django symbols, so for angular use these:
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .directive('wrapper', function() {
        return {
            templateUrl: function(elem, attr) {
                return 'page/page-' + attr.type + '.html';
            }
        }
    })
    .directive('navmenu', function() {return {templateUrl: 'partials/nav-menu.html'};})
    .directive('navmenuleden', function() {return {templateUrl: 'partials/nav-menu-leden.html'};})
    .directive('navmenumob', function() {return {templateUrl: 'partials/nav-menu-mobile.html'};})
    .directive('ergocalc', function() {return {templateUrl: 'partials/ergo-calc.html'};})
    .directive('headerlink', function() {return {templateUrl: 'partials/header-link.html'};})
    .directive('headerimages', function($timeout) {
        return {
            templateUrl: 'partials/header-images.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        /* SLIDER */
                        jQuery(function () {
                            jQuery("#header_image").responsiveSlides({
                                auto: true,
                                speed: 1000,
                                timeout: 10000,
                                nav: false,
                                random: true
                            });
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('headerbox', function() {return {templateUrl: 'partials/header-box.html'};})
    .directive('newsindex', function($timeout) {
        return {
            templateUrl: 'partials/news-index.html',
            link: function postLink(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.expand_reacties').simpleexpand();
                        $('.expand_page').simpleexpand();
                        $('table').addClass('pure-table');
                    });
                }, 0);
            }
        };
    })
    .directive('newssingle', function($timeout) {
        return {
            templateUrl: 'partials/news-single.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.expand_reacties').simpleexpand();
                        $('.expand_page').simpleexpand();
                        $('table').addClass('pure-table');
                    });
                }, 0);
            }
        };
    })
    .directive('newsarchief', function($timeout) {
        return {
            templateUrl: 'partials/news-archief.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('table').addClass('pure-table');
                    });
                }, 0);
            }
        };
    })
    .directive('page', function($timeout) {
        return {
            templateUrl: 'partials/page.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('table').addClass('pure-table');
                    });
                }, 0);
            }
        };
    })
    .directive('pagelogin', function() {return {templateUrl: 'partials/page-login.html'};})
    .directive('pageoverview', function($timeout) {
        return {
            templateUrl: 'partials/page-overview.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.expand_reacties').simpleexpand();
                        $('.expand_page').simpleexpand();

                        $('table').addClass('pure-table');

                        $('.content .content-page .block_content_100 .featured_image').each(function () {
                            $(this).css('min-height', $(this).parents('.block_content_100').find('.block_text').height() + 40);
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('sidebar', function($timeout) {
        return {
            templateUrl: 'partials/sidebar.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        jQuery(function () {
                            jQuery(".sidebar_content #side_partner").responsiveSlides({ auto: true, speed: 1000, timeout: 10000, nav: false, random: true });
                            jQuery(".sidebar_content #side_gold").responsiveSlides({ auto: true, speed: 1000, timeout: 10000, nav: false, random: true });
                            jQuery(".sidebar_content #side_silver").responsiveSlides({ auto: true, speed: 1000, timeout: 10000, nav: false, random: true });
                            jQuery(".sidebar_content #side_bronze").responsiveSlides({ auto: true, speed: 1000, timeout: 10000, nav: false, random: true });
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('footer', function() {return {templateUrl: 'partials/footer.html'};})
    .directive('chatmodule', function($timeout) {
        return {
            templateUrl: 'partials/chat.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        var objDiv = document.getElementById('discussionspam');
                        objDiv.scrollTop = objDiv.scrollHeight;
                        var objDiv1 = document.getElementById('discussionfrust');
                        objDiv1.scrollTop = objDiv.scrollHeight;
                    });
                }, 0);
            }
        };
    })
    .filter('html_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }])
    .controller('globalsearchform', ['$scope', function($scope) {
        $scope.globalsearchform = function() {
            void($('body').removeHighlight().highlight(this.globalsearch));
        };
    }])
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
