search.controller("searchController", function($scope, searchData, $http) {
	$scope.searchTerm = "";

	var getTitle = function(string) {
		var beginning = stringUtil.nth_occurrence(string, '">', 1);
		var end = string.indexOf('</h1>');

		return string.slice(beginning + 2, end);
	};

	var getPage = function(string) {
		var beginning = stringUtil.nth_occurrence(string, '"', 1);
		var end = stringUtil.nth_occurrence(string, '"', 2);
		var page = string.slice(beginning + 1, end);

		return page;
	};

	var getBody = function(string) {
		var lookingFor = '</h1>';
		var beginning = stringUtil.nth_occurrence(string, lookingFor, 1);
		var body = string.slice(beginning + lookingFor.length, string.length);

		return stringUtil.stripHTML(body);
	};

	// initialize + build search index
	$scope.searchIndex = lunr(function() {
		this.ref('page');
		this.field('title');
		this.field('body');
	});

	var populateResults = function(seachResultsArray) {
		var $resultsContainer = $('.search-results-container');
		var html = '';

		for (var x = 0; x < seachResultsArray.length; x++) {
			html += '<article class="' + seachResultsArray[x].urlTitle + '"">';
			html += '<h2>';
			html += seachResultsArray[x].title;
			html += '</h2>';
			html += '<p>';
			html += seachResultsArray[x].body;
			html += '</p>';
			html += '</article>';
		}

		$resultsContainer.html(html);
	};

	$scope.getSearchResults = function(term) {
		var resultsArray = $scope.searchIndex.search(term);

		console.log(resultsArray);

		return resultsArray.map(function(result) {
			return store[result.ref];
		});
	};

	$scope.store = {};

	$http(
		{
        	method: 'GET',
	    	url: 'src/js/core/search/searchindex.html'
		}
	).then(function successCallback(response) {

	    let resultsArray = response.data.split('h1 id=');

		for (var x = 0; x < resultsArray.length; x++) {
			// decode HTML
			var decoded = stringUtil.decodeHTML(resultsArray[x]);
			var currentTitle = getTitle(decoded);
			var currentPage = getPage(decoded);
			var currentBody = stringUtil.cutString(getBody(decoded), 300);
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
		console.log($scope.store);
	}, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
});