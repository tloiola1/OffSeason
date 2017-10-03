
function destinationImage(pCity){

  var key = "6588765-767f2672757f4bf26b7229992";

  var queryURL = "https://pixabay.com/api/?key="+key+"&q="+ pCity +"&image_type=photo";
// var queryURL = "https://maps.googleapis.com/maps/api/place/photo?&key=AIzaSyAQzWTq3aMdAEHpUdJhk_e0cRqDJaTbO1w";

    $.ajax({
      //URL Is Sending The Request w
      url: queryURL,
      //Method Is Getting The Response
      method: "GET",
      //.done Executes When Get The Response From URL
    }).done(function(response){

      console.log(response);

      var imgURL = response.hits[0].webformatURL;

      return imgURL;
      // var img = $("<img>");
      // img.addClass("activator cityImg");
      // img.attr("value", pCity);

      // img.attr("src", response.hits[0].webformatURL);
      // $(".card-image").html(img);
      // $(".card-title").html(pCity);

    });
}