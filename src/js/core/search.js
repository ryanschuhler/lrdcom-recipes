var search = (function() {

	var model = (function() {
		var decodeHTML = function(html) {
			var txt = document.createElement('textarea');

			txt.innerHTML = html;
			return txt.value;
		};

		var strip = function(html) {
			var tmp = document.createElement('div');

			tmp.innerHTML = html;

			return tmp.textContent || tmp.innerText || '';
		};

		var nth_occurrence = function(string, char, nth) {
			var first_index = string.indexOf(char);
			var length_up_to_first_index = first_index + 1;

			if (nth == 1) {
				return first_index;
			}
			else {
				var string_after_first_occurrence = string.slice(length_up_to_first_index);
				var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);

				if (next_occurrence === -1) {
					return -1;
				} else {
					return length_up_to_first_index + next_occurrence;
				}
			}
		};

		var getTitle = function(string) {
			var beginning = nth_occurrence(string, '">', 1);
			var end = string.indexOf('</h1>');

			return string.slice(beginning + 2, end);
		};

		var getPage = function(string) {
			var beginning = nth_occurrence(string, '"', 1);
			var end = nth_occurrence(string, '"', 2);
			var page = string.slice(beginning + 1, end);

			return page;
		};

		var getBody = function(string) {
			var lookingFor = '</h1>';
			var beginning = nth_occurrence(string, lookingFor, 1);
			var body = string.slice(beginning + lookingFor.length, string.length);

			return strip(body);
		};

		var cutString = function(s, n) {
			var cut = s.indexOf(' ', n);
			if (cut == -1) {
				return s;
			}
			return s.substring(0, cut);
		};

		// initialize + build search index
		var searchIndex = lunr(function() {
			this.ref('page');
			this.field('title');
			this.field('body');
		});

		var store = {};

		var buildIndex = function(index) {
			$.ajax(
				{
					url: 'src/searchIndex/searchindex.html',
					success: function(result) {
						// get collection of text in array format
						resultsArray = result.split('h1 id=');

						for (var x = 0; x < resultsArray.length; x++) {
							// decode HTML
							var decoded = decodeHTML(resultsArray[x]);
							var currentTitle = getTitle(decoded);
							var currentPage = getPage(decoded);
							var currentBody = cutString(getBody(decoded), 300);
							currentBody += '...';

							// add each article to search index
							searchIndex.add({
								body: currentBody.slice(0, 5),
								page: currentPage,
								title: currentTitle
							});

							// add it to our data store
							store[currentPage] = {
								body: currentBody,
								title: currentTitle,
								urlTitle: currentPage
							};
						}
					}
				}
			);
		};

		var getSearchResults = function(term) {
			var resultsArray = searchIndex.search(term);

			return resultsArray.map(function(result) {
				return store[result.ref];
			});
		};

		return {
			buildIndex: buildIndex,
			getSearchResults: getSearchResults
		};
	})();

	var view = (function(getSearchResults, getBody) {
		var $searchContainer = $('.search-container');
		var $searchInput = $('.search-input');

		$('.open-search').on(
			'click',
			function(e) {
				e.preventDefault();
				toggleSearch('show');
			}
		);

		$searchInput.on(
			'keyup',
			function() {
				var currentSearch = $(this).val();
				var searchResults = getSearchResults(currentSearch);
				populateResults(searchResults);
			}
		);

		$('.search-results-container').on(
			'click',
			'article',
			function(e) {
				toggleSearch('hide');
				routes.changePage($(this).attr('class'));
			}
		);

		var toggleSearch = function(mode) {
			$searchContainer.removeClass('hide show');

			if (mode === 'hide') {
				$searchContainer.addClass('hide');
			}
			else if (mode === 'show') {
				$searchContainer.addClass('show');
				$('.search-input').focus();
			}
		};

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

		return {
			toggleSearch: toggleSearch
		};

	})(model.getSearchResults, model.getBody);

	return {
		buildIndex: model.buildIndex,
		toggleSearch: view.toggleSearch
	};
})();
