// YouTube and image popup
$(document).ready(function() {
	$("a[rel^='prettyPhoto']").prettyPhoto();

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