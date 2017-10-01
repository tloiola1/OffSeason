

function destination(pCity, pCountry){
	console.log(pCity);

  var key = "6588765-767f2672757f4bf26b7229992";

  var queryURL = "https://pixabay.com/api/?key=6588765-767f2672757f4bf26b7229992&q="+ pCity+"+"+pCountry +"&image_type=photo";

    $.ajax({
      //URL Is Sending The Request 
      url: queryURL,
      //Method Is Getting The Response
      method: "GET",
      //.done Executes When Get The Response From URL
    }).done(function(response){

      console.log(response);

      var img = $("<img>");

      img.attr("src", response.hits[Math.floor(Math.random()*20)].webformatURL);
      $("#image").html(img);

    });
}
