  $( document ).ready(function(){
  	$(".button-collapse").sideNav();
  })

	document.onkeyup = function(event){
		var keypressed = event.keyCode;
		if(keypressed === 13 || keypressed ===27){
			alert("good");

		}

	};

$(document).ready(function(){
	$(".search").hover(function(){
	 	$("#search").show();
	});
 	$(".search").on("click", function(){
 		$("search").show();
 	});
});
	

// 	