var section = $('section');

var changePage = function(page) {
	section.load('src/pages/' + page + '.html')
}

$('nav a').on("click", function(e) {
	e.preventDefault();
	var $section_name = $(this).attr('class');

	changePage($section_name);
})

$(document).ready(function() {
	changePage('home');
})

