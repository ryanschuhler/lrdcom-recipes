var section = $('section');

var changePage = function(page) {
	section.load('src/pages/' + page + '.html')
	history.pushState(page, null, '#/' + page);
}

$('nav a').on("click", function(e) {
	var $section_name = $(this).attr('class');

	changePage($section_name);
	e.preventDefault();
})

// when users go back and forth
window.addEventListener('popstate', function(e) {
	section.load('src/pages/' + e.state + '.html')
})

// when users load friendly url, got o that url
$(document).ready(function() {
	var hash = window.location.hash;
	hash = hash.replace("#/", "");
	changePage(hash);
});