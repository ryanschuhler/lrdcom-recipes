search.controller("searchController", function($scope, searchData, $http, stringUtils, hotkeys) {
	$scope.searchTerm = "";
	$scope.store = {};
	$scope.searchResults = [];

	var getTitle = function(string) {
		var beginning = stringUtils.nth_occurrence(string, '">', 1);
		var end = string.indexOf('</h1>');

		return string.slice(beginning + 2, end);
	};

	var getPage = function(string) {
		var beginning = stringUtils.nth_occurrence(string, '"', 1);
		var end = stringUtils.nth_occurrence(string, '"', 2);
		var page = string.slice(beginning + 1, end);

		return page;
	};

	var getBody = function(string) {
		var lookingFor = '</h1>';
		var beginning = stringUtils.nth_occurrence(string, lookingFor, 1);
		var body = string.slice(beginning + lookingFor.length, string.length);

		return stringUtils.stripHTML(body);
	};

	$scope.toggleSearch = function(mode) {
        var $searchContainer = $('.search-container');
        var $searchInput = $('.search-input');

        $searchContainer.removeClass('hide show');

        if (mode === 'hide') {
            $searchContainer.addClass('hide');
            $('#search-input').blur();
        }

        else {
            $searchContainer.addClass('show');
            $('#search-input').focus();
        }
    };

	// initialize + build search index
	$scope.searchIndex = lunr(function() {
		this.ref('page');
		this.field('title');
		this.field('body');
	});

	hotkeys.add({
        combo: '/',
        callback: function() {
            $scope.toggleSearch('show');
        }
    });

    hotkeys
    	.bindTo($scope)
	    .add({
	        combo: 'esc',

	        callback: function() {
	            $scope.toggleSearch('hide');
	        }
	    });

	$scope.searchInputHandler = function(term, event) {
		if (event.key == "Escape") {
			$scope.toggleSearch('hide');
		} 
		else {
			$scope.getSearchResults(term);
		}
	};

	$scope.getSearchResults = function(term, event) {
		var resultsArray = $scope.searchIndex.search(term);
			$scope.searchResults = [];

		resultsArray.map(function(result) {
			$scope.searchResults.push($scope.store[result.ref]);	
		});		
	};

	$http(
		{
        	method: 'GET',
	    	url: 'src/app/modules/search/searchindex.html'
		})
		.then(function successCallback(response) {

		    let resultsArray = response.data.split('h1 id=');

			for (var x = 0; x < resultsArray.length; x++) {
				// decode HTML
				var decoded = stringUtils.decodeHTML(resultsArray[x]);
				var currentTitle = getTitle(decoded);
				var currentPage = getPage(decoded);
				var currentBody = stringUtils.cutString(getBody(decoded), 300);
				currentBody += '...';

				// add each article to search index
				$scope.searchIndex.add({
					body: currentBody.slice(0, 5),
					page: currentPage,
					title: currentTitle
				});

				// add it to our data store
				$scope.store[currentPage] = {
					body: currentBody,
					title: currentTitle,
					urlTitle: currentPage
				};
			}
		});
});