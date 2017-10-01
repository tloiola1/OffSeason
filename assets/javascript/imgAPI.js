

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






$("#domestic").on("click", function(){

var $navigation = $('#navigation'),
    $navigationLinks = $navigation.find('a');

// Set the initial state on navigation links for future animation
$navigationLinks.css({
  opacity: 0,
  "margin-left":"0"
});

$navigationLinks.each(function (i, item) {
  var $item = $(item);
  
  // Add animations on each item to the fx queue on the navigation DOM element
  $.queue($navigation[0], 'fx', function () {
    var that = this;
    $item.animate({
      opacity:1,

      "margin-left":"0"

    }, {
      complete: function () {
        $.dequeue(that);
      }
    });
  });
});

// Start the navigation queue
$navigation.dequeue();
})
