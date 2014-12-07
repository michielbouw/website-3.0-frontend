/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta', ['truncate', 'ergocalc'])
    .config(function($httpProvider, $interpolateProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        // no interference with django symbols, so for angular use these:
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })

    .directive('navmenu', function() {return {templateUrl: 'partials/nav-menu.html'};})
    .directive('ergocalc', function() {return {templateUrl: 'partials/ergo-calc.html'};})
    .directive('headerlink', function() {return {templateUrl: 'partials/header-link.html'};})
    .directive('headerimages', function() {
        return {
            templateUrl: 'partials/header-images.html',
            link: function(scope, element, attrs) {
                angular.element(document).ready(function() {
                    /* SLIDER */
                    jQuery(function () {
                        jQuery("#header_image").responsiveSlides({
                            auto: true,
                            speed: 1000,
                            timeout: 8000,
                            nav: false,
                            random: true
                        });
                    });
                });
            }
        };
    })
    .directive('headerbox', function() {return {templateUrl: 'partials/header-box.html'};})
    .directive('newsindex', function() {
        return {
            templateUrl: 'partials/news-index.html',
            link: function(scope, element, attrs) {
                angular.element(document).ready(function() {
                    $('.expand_reacties').simpleexpand();
                    $('.expand_page').simpleexpand();

                    $('table').addClass('pure-table');
                });
            }
        };
    })
    .directive('newssingle', function() {
        return {
            templateUrl: 'partials/news-single.html',
            link: function(scope, element, attrs) {
                angular.element(document).ready(function() {
                    $('.expand_reacties').simpleexpand();
                    $('.expand_page').simpleexpand();

                    $('table').addClass('pure-table');
                });
            }
        };
    })
    .directive('page', function() {
        return {
            templateUrl: 'partials/page.html',
            link: function(scope, element, attrs) {
                angular.element(document).ready(function() {
                    $('table').addClass('pure-table');
                });
            }
        };
    })
    .directive('pageoverview', function() {
        return {
            templateUrl: 'partials/page-overview.html',
            link: function(scope, element, attrs) {
                angular.element(document).ready(function() {
                    $('.expand_reacties').simpleexpand();
                    $('.expand_page').simpleexpand();

                    $('table').addClass('pure-table');

                    $('.content .content-page .block_content_100 .featured_image').each(function() {
                        $(this).css('min-height', $(this).parents('.block_content_100').find('.block_text').height()+40);
                    });
                });
            }
        };
    })
    .directive('sidebar', function() {return {templateUrl: 'partials/sidebar.html'};})
    .directive('footer', function() {return {templateUrl: 'partials/footer.html'};})

    .controller('news', ['$scope', function($scope) {
        $scope.item = [{}];
        $scope.item.title = 'Voorbeschouwing Tromp Boat Races';

        $scope.newsitem_id = 1;
        $scope.datetime = new Date();
        $scope.user_id = '38001';
        $scope.user = 'Michiel Bouw';
        $scope._crfs_token = 'a280c45e822ece5cde1aa6a9146afed5';

        $scope.comments = [{newsitem_id: 1, text:'Dit is een test comment voor nu dan even.', user_id: '38001', user: 'Test User', datetime: angular.copy($scope.datetime), _crfs_token: 'a280c45e822ece5cde1aa6a9146afed5'},
            {newsitem_id: 2, text:'Dit is een tweede test comment voor nu dan even.', user_id: '38001', user: 'Test User 2', datetime: angular.copy($scope.datetime), _crfs_token: 'a280c45e822ece5cde1aa6a9146afed5'}];

        $scope.addcomment = function() {
            if($scope.text != '') {
                $scope.comments.push({
                    newsitem_id: $scope.newsitem_id,
                    text: $scope.text,
                    user_id: $scope.user_id,
                    user: $scope.user,
                    datetime: $scope.datetime,
                    _crfs_token: $scope._crfs_token
                });
                $scope.text = "";
            }
        };
        $scope.removecomment = function($index) {
            $scope.comments.splice($index, 1);
        };

        $scope.byNewsId = function(newsId) {
            return function(comment) {
                return comment.newsitem_id == newsId;
            }
        }
        $scope.orderComments = 'datetime';
    }]);
