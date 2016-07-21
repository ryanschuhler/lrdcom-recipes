var background = (function() {
	var findNumOfImages = function() {
		return new Promise(function(resolve, reject) {
			var count = 0;

			$.ajax({
				url: 'src/images/',
				success: function(data) {
					$(data).find("li > a").each(function() {
						var pathname = $(this).context.pathname;

						if (pathname.indexOf("_bg") > -1) {
							count ++;
						}
					})
					resolve(count);
				}
			});
		}); 		
	}
	
	var getRandomInt = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var changeBackground = function(className, imagePreface) {
		var $sectionToChange = $('.' + className);
		findNumOfImages().then(function(data) {

			var backgroundNo = getRandomInt(1, data);
			var background = imagePreface + '-' + backgroundNo;
			
			$sectionToChange.css({
				'background': "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(src/images/" + background + '.jpg)',
				'background-size' : 'cover'
			})
			
		})
	}

	 $('.flexslider').flexslider({
	 	controlNav: false,
	 	directionNav: false,
	 	randomize: true
	 });



	// changeBackground('page-bg', 'home_bg');
})();