$(document).ready(function() {

	var gifSelection = ["Puppy", "Kitten", "Bear", "Corgi", "Bird", "Boop", "NFL Touchdown", "NBA", "Breaking Bad", "Lord Of The Rings","Game Of Thrones"];
	
	function toggleGif(psp) {
		var newSrc = "";
		
		if (psp.indexOf('.gif') != -1) {
			newSrc = psp.replace("giphy.gif", "480w_s.jpg");
		}
		else {
			newSrc = psp.replace("480w_s.jpg", "giphy.gif");
		}
		
		return newSrc;
	}
	
	function addGIF(gifName) {
		// create button
		$gifNew = $('<button type="button" class="btn btn-danger gifBtn">' + gifName + '</button>');
		
		// add event handler
		$gifNew.on("click", function() {
			
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=e066f04af87a447daeddf7cb9fe46206&limit=12";
			$.ajax({
			  url: queryURL,
			  method: "GET"
			}).done(function(response) {
				
				//clears old gifs
				$(".gifPage").empty();
				
				//shows new gifs
				for (var i = 0; i < response.data.length; i++) {
					$(".gifPage").append('<div class="gif"><img src="' + response.data[i].images["480w_still"].url + '"/></div>');
				}
				
				//img to gif, use attr data-state still	
				$(".gif").on("click", function() {
					var src = $(this).children('img').attr('src');
					var res = toggleGif(src);
					$(this).html('<img src="' + res + '"/>');
				});
			});
		});
		
		$(".gifBar").append($gifNew);
	}

	//populate a list of gifs from array gifSelection
	for (var i = 0; i < gifSelection.length; i++) {
		addGIF(gifSelection[i]);	
	}

	//add gifs
	$(".addGIF").on("click", function() {
		var gifNew = $("input").val();
		
		if (gifNew) {
			addGIF(gifNew);
		}
		else {
			return;
		}
	});
	
	//prevent default
	$(".form").submit(function(event) {
		event.preventDefault();
	});
});