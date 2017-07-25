'use strict'

$(function() {
	showMenu();
	menuResizeFix();
	progressBarAnim();

	$('.project-grid').masonry({
  	itemSelector: '.project',
  	columnWidth: 224,
	});
});

function showMenu() {
	$('.toggle-container').on('click', () => {
		$('.toggle-container').toggleClass('active');
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

function progressBarAnim() {
	$('.skill-progress-bar').each(function(i) {
		setTimeout(() => {
			$('.skill-progress-bar').eq(i).css('width', '100%');
		}, 400 * i)
	})
}
