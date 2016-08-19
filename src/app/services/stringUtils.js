lrdcom.factory('stringUtils', function() {
	var utils = {
		cutString: function(s, n) {
			var cut = s.indexOf(' ', n);
			if (cut == -1) {
				return s;
			}
			return s.substring(0, cut);
		},
		decodeHTML: function(html) {
			var txt = document.createElement('textarea');

			txt.innerHTML = html;
			return txt.value;
		},
		nth_occurrence: function(string, char, nth) {
			var first_index = string.indexOf(char);
			var length_up_to_first_index = first_index + 1;

			if (nth == 1) {
				return first_index;
			}
			else {
				var string_after_first_occurrence = string.slice(length_up_to_first_index);
				var next_occurrence = utils.nth_occurrence(string_after_first_occurrence, char, nth - 1);

				if (next_occurrence === -1) {
					return -1;
				} else {
					return length_up_to_first_index + next_occurrence;
				}
			}
		},
		replaceAll: function(string, search, replacement) {
		    return string.replace(new RegExp(search, 'g'), replacement);
		},
		removeFileName: function(fileString) {
			return fileString.slice(0, fileString.indexOf('.'));
		},
		stripHTML: function(html) {
			var tmp = document.createElement('div');

			tmp.innerHTML = html;

			return tmp.textContent || tmp.innerText || '';
		},
		toTitleCase: function (str) {
	    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	};

	return utils;
});