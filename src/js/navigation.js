var navigation = (function() {
	var $navListDropdown = $('nav#menu li.dropdown');
	var $navListUL = $('.dropdown ul')
	var $navListAnchor = $('nav#menu a');
	var $body = $('body');
	
	var navigationUI = (function() {
		
		var findActiveNav = function(currentPage) {
			var $currentLink = $('a.' + currentPage);
			
			$currentLink.parent().parent().prev("li.dropdown").addClass("active");
			$currentLink.addClass("active");
		}

		return {
			findActiveNav: findActiveNav
		}
	})();


	var viewController = (function() {
		var section = $('#main .inner');

		var bodyClassChange = function(page) {
			$body.removeClass(function(index, css){
				return (css.match (/(^|\s)page-\S+/g) || []).join(' ');
			});
			$body.addClass('page-'+page);
		}
		

		var changePage = function(page, mode, alterHistory) {
			bodyClassChange(page);

			if (alterHistory === undefined) {
				alterHistory = true;
			}

			// if on initial page load, load content instantly
			if (mode == "init") {
				$body.hide();
				section.load('src/pages/' + page + '.html', function() {
					$body.fadeIn(1000);	
				});
				
			} 
			else {
				console.log("running normal page")
				section.fadeOut(200, function() {
					setTimeout(function() {
						section.load('src/pages/' + page + '.html', function() {
							section.fadeIn(350);

							if (alterHistory) {
								history.pushState(page, null, '#/' + page);	
							}
							
						})	
					}, 300)
				});
			}
		}

		$navListAnchor.on("click", function(e) {
			// stop default beahvior
			e.stopPropagation();

			// make active nav
			var $section_name = $(this).attr('class');
			$navListAnchor.removeClass("active");
			$(this).addClass('active');

			$("a.close").trigger("click");
			// change page
			changePage($section_name);
			e.preventDefault();

		})

		// when users go back and forth
		window.addEventListener('popstate', function(e) {
			changePage(e.state, "normal", false)
			bodyClassChange(e.state);
			navigationUI.findActiveNav(e.state)
		})

		// when users load friendly url, got o that url
		var hash = window.location.hash;

		if (hash === "#/" || hash.length === 0) {
			changePage('home', "init");	
		} else {
			hash = hash.replace("#/", "");
			changePage(hash, "init");
			navigationUI.findActiveNav(hash);
		}

		return {
			changePage: changePage
		}
	})();

	$('a.logo').on("click", function(e) {
		e.preventDefault();
		viewController.changePage('home')
	});

})();