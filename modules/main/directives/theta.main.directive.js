/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.main')
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
    .directive('pagephotoalbum', function($timeout) {
        return {
            templateUrl: 'partials/page-photoalbum.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        var container = document.querySelector('.block_content_photo .photos');
                        var msnry = new Masonry( container, {
                            columnWidth: '#photo',
                            itemSelector: '#photo',
                            gutter: 0
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('pagephotoalbumsub', function($timeout) {
        return {
            templateUrl: 'partials/page-photoalbum-sub.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        var container = document.querySelector('.block_content_photo .photos');
                        var msnry = new Masonry( container, {
                            columnWidth: '#photo',
                            itemSelector: '#photo',
                            gutter: 0
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
    });