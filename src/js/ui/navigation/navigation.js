var navigation = (function() {

	var model = (function() {
		var getNavigationStructure = function() {
			return new Promise(function(resolve, reject) {
				$.ajax(
					{
						url: 'src/js/ui/navigation/navigation.json',
						success: function(result) {
							resolve(result);
						},
						error: function(err) {
							console.error(err);
						}
					}
				);
			});
		};

		return {
			getNavigationStructure: getNavigationStructure
		};
	})();

	var controller = (function(model) {
		var formatFileName = function(file) {
			var formattedName = file;

			// remove file name
			formattedName = stringUtil.removeFileName(formattedName);

			// make title case
			formattedName = stringUtil.toTitleCase(formattedName);

			// // remove "-"
			formattedName = stringUtil.replaceAll(formattedName, "-", " ");

			return formattedName;
		};

		var buildNavigation = function(navSelector) {
			model.getNavigationStructure()
				.then(function(navigationStructureJSON) {
					var topNav = '<ul>';
					var bottomNav = '<ul>';

					for (var property in navigationStructureJSON) {
						if (navigationStructureJSON.hasOwnProperty(property)) {

							// if this has object within it, build out a subnav
							if (typeof navigationStructureJSON[property] === "object") {
								var subNavObject = navigationStructureJSON[property];
								var categoryName = property;

								topNav += '<li class="category">' + property;
								topNav += '<ul>';

								for (var subNavProperty in subNavObject) {
									if (subNavObject.hasOwnProperty(subNavProperty)) {
										topNav += '<li>';
										topNav += '<a class="' + encodeURI(property) + '/' + stringUtil.removeFileName(subNavProperty) + '" href="#">' + formatFileName(subNavProperty) + '</a>';
										topNav += '</li>';
									}
								}

								topNav += '</ul></li>';
							}

							// otherwise, just list out the links on the main nav at the bottom
							else {
								bottomNav += '<li>';
								bottomNav += '<a href="#" class="' + property + '">' + formatFileName(property) + '</a>';
								bottomNav += '</li>';
							}
						}
					}

					topNav += '</ul>';
					bottomNav += '</ul>';

					return topNav + bottomNav;
				})
				.then(function(navigationHTML) {
					$(navSelector).html(navigationHTML);
				});
		};

		return {
			buildNavigation: buildNavigation
		};
	})(model);

	var view = (function(){
		var $navMenu = $('nav#menu');
        var $body = $('body');

		$navMenu.on("click", 'a', function(e) {
	        var $section_name = $(this).attr('class');

	        e.stopPropagation();
	        e.preventDefault();
	        $('nav#menu a').removeClass('active');
	        $(this).addClass('active');
	        $('a.close').trigger('click');
	        routes.changePage($section_name);
	    });

	    $('a.logo').on('click', function(e) {
	        e.preventDefault();
	        routes.changePage('home');
	    });

	})();

	return {
		buildNavigation: controller.buildNavigation
	};

})(routes);
