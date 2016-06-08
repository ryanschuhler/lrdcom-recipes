var navigation = (function() {
	var $navListDropdown = $('header nav li.dropdown');
	var $navListUL = $('.dropdown ul')
	var $navListAnchor = $('nav a');
	
	var navigationUI = (function() {
		
		$navListDropdown.on("click", function() {
			var self = $(this);

			if (self.hasClass("active")) {
				$navListDropdown.removeClass("active");
			} else {
				$navListDropdown.removeClass("active");
				self.addClass("active");
			}
		});

		var findActiveNav = function(currentPage) {
			var $currentLink = $('a.' + currentPage);
			
			$currentLink.parent().parent().prev("li.dropdown").addClass("active");
			$currentLink.addClass("active");
		}

		return {
			findActiveNav: findActiveNav
		}
	})();

	var pagechange = (function() {
		var section = $('section');

		var changePage = function(page) {
			section.load('src/pages/' + page + '.html')
			history.pushState(page, null, '#/' + page);
		}

		$navListAnchor.on("click", function(e) {
			e.stopPropagation();
			var $section_name = $(this).attr('class');
			$navListAnchor.removeClass("active");
			$(this).addClass('active');

			changePage($section_name);
			e.preventDefault();

		})

		// when users go back and forth
		window.addEventListener('popstate', function(e) {
			section.load('src/pages/' + e.state + '.html')
			navigationUI.findActiveNav(e.state)
		})

		// when users load friendly url, got o that url
		var hash = window.location.hash;

		if (hash === "#/" || hash.length === 0) {
			changePage('home');	
		} else {
			hash = hash.replace("#/", "");
			changePage(hash);
			navigationUI.findActiveNav(hash);
		}
	})();

})();