'use strict'

$(function() {
	showMenu();
	menuResizeFix();
});

function showMenu() {
	$('.hamburger').on('click', () => {
		$('.navbar').slideToggle();
	})
}

function menuResizeFix() {
	$(window).on('resize', () => {
		if ($(window).width() > 768 && $('.navbar').is(':hidden')) {
			$('.navbar').attr('style', '');
		}
	})
}
