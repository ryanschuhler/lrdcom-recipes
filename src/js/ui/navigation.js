var navigation = (function() {
	var $navListDropdown = $('nav#menu li.dropdown');
	var $navListUL = $('.dropdown ul');
	var $navListAnchor = $('nav#menu a');
	var $body = $('body');

	$navListAnchor.on("click", function(e) {
		var $section_name = $(this).attr('class');

		e.stopPropagation();
		e.preventDefault();
		$navListAnchor.removeClass('active');
		$(this).addClass('active');

		$('a.close').trigger('click');

		// change page
		routes.changePage($section_name);
	});

	$('a.logo').on('click', function(e) {
		e.preventDefault();
		routes.changePage('home');
	});

})(routes);