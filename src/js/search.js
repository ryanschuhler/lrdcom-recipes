var search = (function() {

	var decodeHTML = function(html) {
	    var txt = document.createElement("textarea");
	    txt.innerHTML = html;
	    return txt.value;
	}

	var strip = function(html) {
	   var tmp = document.createElement("DIV");
	   tmp.innerHTML = html;
	   return tmp.textContent || tmp.innerText || "";
	}

	var nth_occurrence = function(string, char, nth) {
	    var first_index = string.indexOf(char);
	    var length_up_to_first_index = first_index + 1;

	    if (nth == 1) {
	        return first_index;
	    } else {
	        var string_after_first_occurrence = string.slice(length_up_to_first_index);
	        var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);

	        if (next_occurrence === -1) {
	            return -1;
	        } else {
	            return length_up_to_first_index + next_occurrence;  
	        }
	    }
	}

	var getTitle = function(string) {
		var beginning = nth_occurrence(string, '">', 1);
		var end = string.indexOf("</h1>");
		return string.slice(beginning + 2, end);
	}

	var getPage = function(string) {
		var beginning = nth_occurrence(string, '"', 1);
		var end = nth_occurrence(string, '"', 2);
		var page = string.slice(beginning + 1, end);
		return page;
	}

	var getBody = function(string) {
		var lookingFor = '</h1>'
		var beginning = nth_occurrence(string, lookingFor, 1);
		var body = string.slice(beginning + lookingFor.length, string.length);
		return strip(body);
	}

	var buildIndex = function() {
		$.ajax({
			url: 'src/searchIndex/searchindex.html',
			success: function(result) {
				result = result.split("h1 id=")
				// console.log(result);
				// console.log(result[0]);
				var decoded = decodeHTML(result[3]);
				var title = getTitle(decoded);
				var page = getPage(decoded);
				var body = getBody(decoded);
				console.log(title);
				console.log(page);
				console.log(body);
			}
		})
	}

	return {
		buildIndex: buildIndex
	}
})();