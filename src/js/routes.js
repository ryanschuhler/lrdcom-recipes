var routes = (function() {
	var $body = $('body');
	var section = $('#main .inner');

	var bodyClassChange = function(page) {
		$body.removeClass(function(index, css){
			return (css.match (/(^|\s)page-\S+/g) || []).join(' ');
		});

		$body.addClass('page-'+page);
	}
	
	var loadErrorPage = function() {
		bodyClassChange('404');
		section.load('src/pages/404.html');
	}

	var changePage = function(page, mode, alterHistory) {
		bodyClassChange(page);

		if (alterHistory === undefined) {
			alterHistory = true;
		}

		// if on initial page load, load content instantly
		if (mode == "init") {
			$body.hide();
			section.load(
				'src/pages/' + page + '.html', 
				function(response, status, xhr) {
					if (alterHistory) {
						history.pushState(page, null, page);	
					}

					if (status !== "success") {
						loadErrorPage();
					}

					$body.fadeIn(1000);	
					
				}
			);
			
		} 
		else {
			section.fadeOut(200, function() {
				setTimeout(function() {
					section.load('src/pages/' + page + '.html', 
						function(response, status, xhr) {
							if (alterHistory) {
								history.pushState(page, null, page);	
							}
							if (status !== "success") {
								loadErrorPage();
							}

							section.fadeIn(350);
						}
					)	
				}, 300)
			});
		}
	}

	// when users go back and forth
	window.addEventListener('popstate', function(e) {
		changePage(e.state, "normal", false)
		bodyClassChange(e.state);
	})

	// load page to correct routes on initial load
	var setInitialRoute = function() {
		if (!sessionStorage.redirect) {
			changePage('home', "init", false);
		} else {
			let url = sessionStorage.redirect;
			delete sessionStorage.redirect;
			let page = url.slice(url.lastIndexOf('/') + 1, url.length);
			changePage(page, "init");
		}
	};

	return {
		changePage: changePage,
		setInitialRoute: setInitialRoute
	}

})();