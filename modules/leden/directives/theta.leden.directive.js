/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.leden')
    .directive('navmenu', function() {return {templateUrl: 'partials/nav-menu.html'};})
    .directive('navmenuleden', function() {return {templateUrl: 'partials/nav-menu-leden.html'};})
    .directive('navmenumob', function() {return {templateUrl: 'partials/nav-menu-mobile.html'};})
    .directive('ergocalc', function() {return {templateUrl: 'partials/ergo-calc.html'};})
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
    .directive('page', function($timeout) {
        return {
            templateUrl: 'partials/page.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('table').addClass('table');
                    });
                }, 0);
            }
        };
    })
    .directive('pageleden', function($timeout) {
        return {
            templateUrl: 'partials/page-leden.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.expand_reacties').simpleexpand();
                        $('.expand_page').simpleexpand();
                        $('table').addClass('table');
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip()
                        });

                        $('.content .content-page .block_content_100 .featured_image').each(function () {
                            $(this).css('height', $(this).parents('.block_content_100').find('.block_text').height() + 30);
                        });
                        $('.content .content-page .block_content_50 #frust').each(function () {
                            if ($(this).parents('.content-page').find('#spam').height() >= $(this).height()) {
                                $(this).css('height', $(this).parents('.content-page').find('#spam').height());
                            }
                            else {
                                $(this).parents('.content-page').find('#spam').css('height', $(this).height());
                            }
                        });
                        $('.content .content-page .block_content_50 #hap').each(function () {
                            if ($(this).parents('.content-page').find('#activiteit').height() >= $(this).height()) {
                                $(this).css('height', $(this).parents('.content-page').find('#activiteit').height()+30);
                            }
                            else {
                                $(this).parents('.content-page').find('#activiteit').css('height', $(this).height()+30);
                            }
                        });
                    });
                }, 0);
            }
        };
    })
   .directive('sidebar', function($timeout) {
        return {
            templateUrl: 'partials/sidebar-leden.html',
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