'use strict'

$(function() {
	showMenu();
	menuResizeFix();
});

function showMenu() {
	$('.toggle-container').on('click', () => {
		$('.toggle-container').toggleClass('active')
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
