var routes = (function() {
	var $body = $('body');
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
				if (alterHistory) {
					history.pushState(page, null, page);	
				}
			});
			
		} 
		else {
			section.fadeOut(200, function() {
				setTimeout(function() {
					section.load('src/pages/' + page + '.html', function() {
						section.fadeIn(350);
						if (alterHistory) {
							history.pushState(page, null, page);	
						}
					})	
				}, 300)
			});
		}
	}

	// when users go back and forth
	window.addEventListener('popstate', function(e) {
		changePage(e.state, "normal", false)
		bodyClassChange(e.state);
		navigationUI.findActiveNav(e.state)
	})


	// load page to correct routes on initial load
	var setInitialRoute = function() {
		if (!sessionStorage.redirect) {
			changePage('home', "init");
		} else {
			let url = sessionStorage.redirect;
			let page = url.slice(url.lastIndexOf('/') + 1, url.length);
			changePage(page, "init");
		}
	};

	return {
		changePage: changePage,
		setInitialRoute: setInitialRoute
	}

})();