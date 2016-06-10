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
			});
			
		} 
		else {
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
	}

	return {
		changePage: changePage
	}

})();