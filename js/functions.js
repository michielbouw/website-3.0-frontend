$(window).load(function() {
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

	$('.expand_reacties').simpleexpand();
	$('.expand_page').simpleexpand();

	$('table').addClass('pure-table');

	$('.content .content-page .block_content_100 .featured_image').each(function() {
		$(this).css('min-height', $(this).parents('.block_content_100').find('.block_text').height()+40);
	});
});

(function(angular) {
	var origMethod = angular.module;
	var alreadyRegistered = {};
	angular.appModule = null;

	angular.module = function(name, reqs, configFn) {
		reqs = reqs || [];
		var module = null;

		if (alreadyRegistered[name]) {
			module = origMethod(name);
			module.requires.push.apply(module.requires, reqs);
		} else {
			module = origMethod(name, reqs, configFn);
			alreadyRegistered[name] = module;

			// If not app name, inject module as app dependency
			if(angular.rootModule && name != angular.appModule){
				root = origMethod(angular.appModule);
				// Dont double inject existing dependencies
				if(root.requires.indexOf(name) < 0){
					root.requires.push.apply(root.requires, [name]);
				}
			}
		}
		return module;
	};
})(angular);