		
		var responseQuantity = 10;
		var hasInput = true;
		var array = [];
		var apikey = "cb22a3ba10b7457ba0fd5c446850c598";

	//Function
	function displayImg(){
		$("?").empty();

		var imgPlace = $(this).attr("Value");

		var queryURL = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=fuzzy%20monkey";

		$.ajax({
			//URL Is Sending The Request 
			url: queryURL,
			//Method Is Getting The Response
			method: "GET",
			//.done Executes When Get The Response From URL
		}).done(function(response){
			//This Loop Only Generates 10 Gifs To Be Display In The Browser
			for(var i = 0; i < responseQuantity; i++){
				gifImage = $("<img>");
				//This Variable Gets The origianl_still.url To Be Attributed To The src And Data-State
	        	var imageUrl_still = response.data[array[i]].images.original_still.url;
				//This Variable Gets The fixed_height.url To Be Attributed To The src And Data-State
	        	var imageUrl_animate = response.data[array[i]].images.fixed_height.url;
	        	//Giving Some Attributes To My Image
				gifImage.attr("src", imageUrl_still);
				gifImage.attr("data-still", imageUrl_still);
				gifImage.attr("data-animate", imageUrl_animate);
	        	gifImage.attr("alt", "Gif Image");
	        	gifImage.attr("data-state", "still");
	        	gifImage.attr("data-toggle","tooltip");
	        	gifImage.attr("title", "Play Me");
	        	gifImage.addClass("gifPlay");
	        	gifImage.addClass("well");
	        	//Appending Gifs To The Browser
				$("#gif").append(gifImage);
			}
		});
	};
	//Function
	//This Function Generate Buttons And New Buttons To The Browser
	function buttonGenerator(){
		//Next Line Empty The Div Where The Buttons Were Appended To Prevent Duplications
		$("#buttons").empty();
		//Creating Buttons
		for (var i = 0; i < arrayButtons.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("btn btn-success gifMovie");
			gifButton.attr("id","gifMovie"+i);
			gifButton.attr("data-name",arrayButtons[i]);
			gifButton.text(arrayButtons[i]);
			//Appending The Button To The Browser Into A Div With ID buttons
			$("#buttons").append(gifButton);
		}
	};
	//Event
	//This Method Is Collecting Info To Create A New Button
	$("#addButton").on("click", function(event){
		event.preventDefault();
		// This Variable Gets The Value From User
		var element = $("#newElement").val();
		//To Lower Case To Prevent Duplication
		element = element.toLowerCase();
		// This Variable Gets A Location From Array -1 Do Not Exist >-1 Exist
		var test = arrayButtons.indexOf(element);
		//This Condition Prevents Duplicated Buttons In The Browser >-1 
		if(test > -1){createButton = false;
			//Alert The User For Existing Button
			for(var i = 0; i < 4; i++){
				$("#gifMovie"+test).fadeOut(100);
				$("#gifMovie"+test).fadeIn(100);
			}
		}
		//This Condition Test For Empty Input Or A Button With Same Valeu
		if(element==="" || createButton === false){
			// Clear Input Box
			$("#newElement").val("");
			createButton = true;
		}
		// This Condition Will Create A New Button
		else{
		arrayButtons.push(element);
		buttonGenerator();
		// Empty Input Box
		$("#newElement").val("");
		}
	});
	//Event
	//This Click Event Calls displayGif Function After User Clicks On One Of My Gif Buttons
	$(document.body).on("click",".gifMovie", displayGif);
	//Event
	//This Event Plays And Stop Gif
	$(document.body).on("click",".gifPlay", function(){
		// Getting The State Of A gif When Clicked
		var state = $(this).attr("data-state");
		//Condition To Play A gif If Its States == still
		if(state === "still"){
			//Changing The src From A still gif To A animeted gif
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
			$(this).attr("title", "Pause Me");
		}
		//If The State Is animate Then Stop By Changing Its src To A still state
		else{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
			$(this).attr("title", "Play Me");
		}

	});
	//Starts By Calling Functions
	gifLocator();
	buttonGenerator();