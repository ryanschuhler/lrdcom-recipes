var navigation = (function() {
	var $navListDropdown = $('nav#menu li.dropdown');
	var $navListUL = $('.dropdown ul')
	var $navListAnchor = $('nav#menu a');
	var $body = $('body');
		
	$navListAnchor.on("click", function(e) {
		// stop default beahvior
		e.stopPropagation();

		// make active nav
		var $section_name = $(this).attr('class');
		$navListAnchor.removeClass("active");
		$(this).addClass('active');

		$("a.close").trigger("click");
		// change page
		routes.changePage($section_name);
		e.preventDefault();

	})

	$('a.logo').on("click", function(e) {
		e.preventDefault();
		routes.changePage('home')
	});

	var buildNavigation() {

	}

	return {
		buildNavigation: buildNavigation
	}

})(routes);