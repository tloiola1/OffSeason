
// AIzaSyC7PDKxOpzFQ5HWPGkKQBrFaIllhgACkmw
// https://maps.googleapis.com/maps/api/place/photo?parameters

function destinationImage(pCity){ //, pCountry
	// console.log(pCity);
  var pCountry = "usa";

  // var key = "6588765-767f2672757f4bf26b7229992";

  // var queryURL = "https://pixabay.com/api/?key=6588765-767f2672757f4bf26b7229992&q="+ pCity +"+"+ pCountry +"&image_type=photo";//+pCountry +
var queryURL = "https://maps.googleapis.com/maps/api/place/json?location=atlanta&maxwidth=5"+
  "&photoreference=atlanta"+
  "&key=AIzaSyAQzWTq3aMdAEHpUdJhk_e0cRqDJaTbO1w"
    $.ajax({
      //URL Is Sending The Request w
      url: queryURL,
      //Method Is Getting The Response
      method: "GET",
      //.done Executes When Get The Response From URL
    }).done(function(response){

      console.log(response);

      // var img = $("<img>");
      // img.addClass("activator cityImg");
      // img.attr("value", pCity);

      // img.attr("src", response.hits[Math.floor(Math.random()*20)].webformatURL);
      // $(".card-image").html(img);

    });
}

// var city = "atlanta";
// var region = "us";