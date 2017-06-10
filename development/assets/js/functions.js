'use strict'

$(function() {
	Menu.show()
})

const Menu = {
	toggle: $('#hamburger'),
	navbar: $('.navbar'),
	show: function(e) {
		console.log(e.target)
	}
}
